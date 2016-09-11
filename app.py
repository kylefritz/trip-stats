from flask import Flask, Response, request, jsonify
from flask_cors import CORS
import records
import os

app = Flask(__name__)
CORS(app)
if 'DATABASE_URL' in os.environ:
    db_url = os.environ['DATABASE_URL']
else:
    db_url = 'postgres://localhost/trip_stats'
db = records.Database(db_url)

@app.route("/group_by_location", methods=['GET', 'POST'])
def group_by_location():
    return return_query(request, """
        select split_part(pickup_str,',',1)::float lat, split_part(pickup_str,',',2)::float lng, count(*) count
        FROM TABLE
        group by pickup_str
        order by count(*) desc
    """)

@app.route("/group_by_day", methods=['GET', 'POST'])
def group_by_day():
    return return_query(request, """
        select date_part('dow', (pickup_at at time zone 'America/New_York')), count(*) count
        FROM TABLE
        group by 1
        order by 1
    """)

@app.route("/group_by_hour", methods=['GET', 'POST'])
def group_by_hour():
    return return_query(request, """
        select width_bucket(date_part('hour', ((pickup_at at time zone 'UTC') at time zone 'America/New_York')), 0, 24, 12) date_part, count(*) count
        FROM TABLE
        group by 1
        order by 1
    """)

def return_query(request, query):
    if request.is_json and "points" in request.get_json():
        points = request.get_json()["points"]
    else:
        points = []

    if len(points) < 3:
        points = [
            {"lat": 40.7, "lng": -74.05}, {"lat": 40.7, "lng": -74.1}, {"lat": 40.8, "lng": -74.1}, {"lat": 40.8, "lng": -74.05}]

    query = query.replace("TABLE", """
    trips where
      ST_Contains(
        ST_MakePolygon(ST_GeomFromText('%(linestring)s')),
        trips.trip_line
      )
    """ % {"linestring": format_linestring(points)})
    rows = db.query(query)

    if len(rows.all()) is 0:
        return jsonify([])
    else:
        # key_format is not camelCase :(
        return Response(rows.export('json'), mimetype='application/json')

def format_linestring(points):
    point_lines = ["%(lat)f %(lng)f" % point for point in points]
    point_lines.append(point_lines[0])
    return "LINESTRING(%(points)s)" % {"points": ", ".join(point_lines)}

if __name__ == "__main__":
    app.run(debug = True)
