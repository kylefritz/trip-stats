DROP TABLE IF EXISTS raw_trips;
CREATE TABLE raw_trips (
  id    SERIAL PRIMARY KEY,
  date timestamp without time zone,
  lat double precision,
  lng double precision,
  base varchar
);

-- import 4.5MM trips!
-- need to update this lines for your own absolute path
COPY raw_trips (date, lat, lng, base) FROM '/Users/kylefritz/Desktop/trip-stats/data/uber-raw-data.csv' DELIMITER ',' CSV;

DROP TABLE IF EXISTS trips;
CREATE TABLE trips (
  pickup_at timestamp without time zone,
  pickup_lat double precision,
  pickup_lng double precision,
  dropoff_at timestamp without time zone,
  dropoff_lat double precision,
  dropoff_lng double precision
);

with row_pairs as (
  select *, ceiling(1.0 * row_number() over(order by id) / 2) as rn from raw_trips
)
INSERT into trips (
  pickup_at,
  pickup_lat,
  pickup_lng,
  dropoff_at,
  dropoff_lat,
  dropoff_lng
) (
  select
    pickup.date,
    pickup.lat,
    pickup.lng,
    dropoff.date,
    dropoff.lat,
    dropoff.lng
  from row_pairs pickup
  join row_pairs dropoff on pickup.rn = dropoff.rn and dropoff.id > pickup.id
);

select * from trips limit 10;
