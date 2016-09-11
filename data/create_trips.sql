CREATE EXTENSION postgis;

DROP TABLE IF EXISTS trips;
CREATE TABLE trips (
  pickup_at timestamp without time zone,
  pickup_lat numeric(7,4),
  pickup_lng numeric(7,4),
  pickup_str varchar(20), -- concatinate lat/lng to make group by fast
  dropoff_at timestamp without time zone,
  dropoff_lat numeric(7,4),
  dropoff_lng numeric(7,4),
  trip_line geometry(LINESTRING)
);

with row_pairs as (
  select *, ceiling(1.0 * row_number() over(order by id) / 2) as rn from raw_trips
)
INSERT into trips (
  pickup_at,
  pickup_lat,
  pickup_lng,
  pickup_str,
  dropoff_at,
  dropoff_lat,
  dropoff_lng,
  dropoff,
  trip_line
) (
  select
    pickup.date,
    pickup.lat,
    pickup.lng,
    (pickup.lat::text || ',' || pickup.lng::text),
    dropoff.date,
    dropoff.lat,
    dropoff.lng,
    ST_MAKELINE(ST_POINT(pickup.lat, pickup.lng), ST_POINT(dropoff.lat,dropoff.lng))
  from row_pairs pickup
  join row_pairs dropoff on pickup.rn = dropoff.rn and dropoff.id > pickup.id
);

-- makes ST_CONTAINS for ROI fast
CREATE INDEX CONCURRENTLY trips_trip_line_gix ON trips USING GIST (trip_line);

-- makes group by lat/lng fast
CREATE INDEX CONCURRENTLY trips_pickup_str_hash ON trips USING HASH (pickup_str);

-- makes group by hour/dow fast
CREATE INDEX CONCURRENTLY trips_pickup_at_hour_hash ON trips USING HASH (date_part('hour', pickup_at));
CREATE INDEX CONCURRENTLY trips_pickup_at_dow_hash ON trips USING HASH (date_part('dow', pickup_at));
