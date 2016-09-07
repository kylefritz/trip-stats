from flask import Flask, Response
import records

app = Flask(__name__)
db = records.Database('postgres://localhost/trip_stats')

@app.route("/")
def trips():
    query = """
    select pickup_at, dropoff_at, ST_AsText(trip_line) from trips where
      ST_Contains(
        ST_MakePolygon(ST_GeomFromText('LINESTRING(40.7 -73.9, 40.7 -74.1, 40.8 -74.1, 40.7 -73.9)')),
        trips.trip_line
      );
    """
    rows = db.query(query)

    # key_format is not camelCase :(
    return Response(rows.export('json'), mimetype='application/json')

if __name__ == "__main__":
    app.run(debug = True)
