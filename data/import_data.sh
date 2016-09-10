#
# you could run this as a script or just call the commands 1 by 1 to munge the
# data on your own system
#

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
createdb trip_stats

# load into psql
psql -d trip_stats -f import_data.sql
