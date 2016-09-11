# Trip Stats

## Feature List
- Required
  - [x] Show a map of relevant data
  - [x] Be able to draw an arbitrary shape or geofence on the map, and be able to filter data that is fully ­contained ​(begins and ends) within the shape
  - [x] Be able to answer where the top pickups are for a given shape
  - [x] Be hosted on Heroku, EC2, or somewhere we can access it by visiting a URL.
- Extra credit
  - [x] Create a heatmap showing trip density for any shape
  - [ ] Filters for time of day, or day/night
  - [x] A page of interesting statistics about the current shape
  - [x] Show popular routes
  - [ ] Show areas of high and low speeds

## Approach
1. Transform raw pickup data into pickup + drop-off data and load into Postgres (~1.5 hrs)
3. Create Flask app to serve rows based on geo query (~1 hour)
4. Create React + Google Maps app to display trip data and stats (~3 hours)
  1. make xhr to get trips grouped by lat/lng; show as "total trips" and as heatmap
  1. for top 10 trips, make parallel calls to reverse geocode lat/lng (if same address1 combine); show in list and on map
  1. make xhr to get trips grouped by hour of day; day of week; month show in histogram
5. Tidy things up (~1 hour)

## Design decisions and tradeoffs
*Database:* The key feature of this app is to be able to filter trip data using a Region of Interest (ROI). I used a `LINESTRING` geometry to represent the pickup and drop-off lat/lngs so that I could use `ST_CONTAINS` for filtering. Several features I wanted to build required the ability to `group` pickups by location and time of day. I created a hash index to try to speed up the group by (although for large ROIs, there's still a delay).

*Server:* A flask app was a good fit. The app returns json that is consumed by the js client via a very liberal CORS policy.

*Client:* React app with lots of Google Maps APIs. I used a package that wraps most of the google maps functionality in React components but I had to break out of the abstraction to render the heatmap.

## Next steps (given more time and resources)
1. Improve the performance of `group by` queries. It might be possible to use a materialized view but I sort of think that the `ST_CONTAINS` in combination with the `group by` is the biggest issue.
2. Create a react native app if mobile device support needed. The Google Maps javascript api doesn't support native clients well. It would be ~easy to replicate the ROI drawing functionality on a native maps stack.

## Running the code

### Database (assumes postgres.app installed & on path)
    $ cd data
    $ ./import_data.sh # or run the commmands one by one :)

### Server (assumes python3 installed)
    $ pip3 install -r requirements.txt
    $ python3 app.py

### Client (assumes node + npm installed)
    $ cd client
    $ npm install
    $ npm start
