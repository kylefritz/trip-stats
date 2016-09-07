# Trip Stats

## Feature List
- Required
  - [ ] Show a map of relevant data
  - [ ] Be able to draw an arbitrary shape or geofence on the map, and be able to filter data that is fully ­contained ​(begins and ends) within the shape
  - [ ] Be able to answer where the top pickups are for a given shape
  - [ ] Be hosted on Heroku, EC2, or somewhere we can access it by visiting a URL.
- Extra credit
  - [ ] Create a heatmap showing trip density for any shape
  - [ ] Filters for time of day, or day/night
  - [ ] A page of interesting statistics about the current shape
  - [ ] Show popular routes
  - [ ] Show areas of high and low speeds
  - [ ] Any other features you think would be useful/interesting.

# Approach
1. Transform raw pickup data into pickup + drop-off data with python (~45 min)
2. Load data into Postgres (~45 min)
3. Create Flask app to serve rows based on geo query (~1 hour)
4. Create React + Google Maps app to display trip data and stats (~3 hours)
5. Tidy things up (~1 hour)

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
