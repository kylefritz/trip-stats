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
    return json_for_query(request, """
        select ST_X(pickup) lat, ST_Y(pickup) lng, count(*) count
        FROM TABLE
        group by pickup
        order by count(*) desc
    """)

@app.route("/group_by_day", methods=['GET', 'POST'])
def group_by_day():
    return json_for_query(request, """
        select pickup_dow dow, count(*) count
        FROM TABLE
        group by 1
        order by 1
    """)

@app.route("/group_by_hour", methods=['GET', 'POST'])
def group_by_hour():
    return json_for_query(request, """
        select width_bucket(pickup_hour, 0, 24, 12) as hour, count(*) count
        FROM TABLE
        group by 1
        order by 1
    """)

@app.route("/")
def index():
    return """
    <h1>Trip Stats API</h1>
    <h4>Routes</h4>
    <ul>
        <li><a href="/group_by_location">/group_by_location</a></li>
        <li><a href="/group_by_day">/group_by_day</a></li>
        <li><a href="/group_by_hour">/group_by_hour</a></li>
    </ul>
    """

def json_for_query(request, query):
    if request.is_json and "points" in request.get_json():
        points = request.get_json()["points"]
    else:
        points = []

    time_query = None
    if request.is_json and "time" in request.get_json():
        time_query = format_time_query(request.get_json()["time"])

    if len(points) < 3:
        points = [
            {"lat": 40.7, "lng": -74.05}, {"lat": 40.7, "lng": -74.1}, {"lat": 40.8, "lng": -74.1}, {"lat": 40.8, "lng": -74.05}]

    query = query.replace("TABLE", """
    trips where
      ST_Contains(
        ST_MakePolygon(ST_GeomFromText('%(linestring)s')),
        trips.trip_line
      )
      %(time_query)s
    """ % {"linestring": format_linestring(points), "time_query": time_query or ''})
    print(query)
    rows = db.query(query)

    if len(rows.all()) is 0:
        return jsonify([])
    else:
        return Response(rows.export('json'), mimetype='application/json')

def format_linestring(points):
    point_lines = ["%(lat)f %(lng)f" % point for point in points]
    point_lines.append(point_lines[0])
    return "LINESTRING(%(points)s)" % {"points": ", ".join(point_lines)}

def format_time_query(time):
    if time == 'all':
        return None
    if time == 'day':
        return "AND %s" % time_range(6, 17)
    if time == 'night':
        return "AND (%s)" % " OR ".join([time_range(0,5), time_range(18,23)])
    parts = time.split(':')
    if len(parts) is 2:
        return "AND %s" % time_range(int(parts[0]), int(parts[1]))

def time_range(t0, tf):
    return "pickup_hour between %(t0)s and %(tf)s" % locals()

if __name__ == "__main__":
    app.run(debug = True)
