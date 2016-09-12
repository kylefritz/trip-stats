CREATE EXTENSION postgis;

DROP TABLE IF EXISTS trips;
CREATE TABLE trips (
  pickup_hour integer,
  pickup_dow integer,
  pickup geometry(POINT),
  trip_line geometry(LINESTRING)
);

with row_pairs as (
  select *, ceiling(1.0 * row_number() over(order by id) / 2) as rn from raw_trips
)
INSERT into trips (
  pickup_hour,
  pickup_dow,
  pickup,
  trip_line
) (
  select
    date_part('hour', ((pickup.date at time zone 'UTC') at time zone 'America/New_York')),
    date_part('dow', ((pickup.date at time zone 'UTC') at time zone 'America/New_York')),
    ST_POINT(pickup.lat, pickup.lng),
    ST_MAKELINE(ST_POINT(pickup.lat, pickup.lng), ST_POINT(dropoff.lat,dropoff.lng))
  from row_pairs pickup
  join row_pairs dropoff on pickup.rn = dropoff.rn and dropoff.id > pickup.id
);

-- makes ST_CONTAINS for ROI fast
CREATE INDEX CONCURRENTLY trips_trip_line_gix ON trips USING GIST (trip_line);

-- makes group by lat/lng fast
CREATE INDEX CONCURRENTLY trips_pickup_gix ON trips USING GIST (pickup);

-- makes filtering and group by hour/dow ~fast
CREATE INDEX CONCURRENTLY trips_pickup_at_hour_idx ON trips USING BTREE (pickup_hour);
CREATE INDEX CONCURRENTLY trips_pickup_at_dow_idx ON trips USING BTREE (pickup_dow);
