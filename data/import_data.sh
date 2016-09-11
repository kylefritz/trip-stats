#!/usr/bin/env bash
#
# download data files and write them to table in postgres
set -e
set -v

# download all the files
wget -i data_urls.txt

# concatinate them together leaving off the header
cat uber-raw-data-apr14.csv | tail -n +2 > uber-raw-data.csv
cat uber-raw-data-may14.csv | tail -n +2 >> uber-raw-data.csv
cat uber-raw-data-jun14.csv | tail -n +2 >> uber-raw-data.csv
cat uber-raw-data-jul14.csv | tail -n +2 >> uber-raw-data.csv
cat uber-raw-data-aug14.csv | tail -n +2 >> uber-raw-data.csv
cat uber-raw-data-sep14.csv | tail -n +2 >> uber-raw-data.csv

# create database
dropdb --if-exists trip_stats
createdb trip_stats

# import 4.5MM raw trips
psql -d trip_stats -e << EOF

  DROP TABLE IF EXISTS raw_trips;
  CREATE TABLE raw_trips (
    id    SERIAL PRIMARY KEY,
    date timestamp without time zone,
    lat numeric(7,4),
    lng numeric(7,4),
    base varchar
  );

  COPY raw_trips (date, lat, lng, base) FROM '$(pwd)/uber-raw-data.csv' DELIMITER ',' CSV;

EOF


# create trips
psql -d trip_stats -e -f create_trips.sql
