from flask import Flask, Response, request, jsonify
from flask_cors import CORS
import records

app = Flask(__name__)
CORS(app)
db = records.Database('postgres://localhost/trip_stats')

@app.route("/", methods=['GET', 'POST'])
def trips():
    if request.is_json and "points" in request.get_json():
        points = request.get_json()["points"]
    else:
        points = []

    if len(points) < 3:
        points = [
            {"lat": 40.7, "lng": -74.05}, {"lat": 40.7, "lng": -74.1}, {"lat": 40.8, "lng": -74.1}, {"lat": 40.8, "lng": -74.05}]

    query = """
    with filtered_trips as (select pickup_lat, pickup_lng from trips where
      ST_Contains(
        ST_MakePolygon(ST_GeomFromText('%(linestring)s')),
        trips.trip_line
      )
    )
    select cast(pickup_lat as double precision) lat, cast(pickup_lng as double precision) lng, count(*) count
    from filtered_trips
    group by pickup_lat, pickup_lng
    order by count(*) desc
    """ % {"linestring": format_linestring(points)}
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
