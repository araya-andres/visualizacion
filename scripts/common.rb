require 'csv'
require 'json'

T0 = 1390176000 #  6:00 PM
T1 = 1390197600 # 12:00 AM
ONE_MINUTE = 60

def read_tweets(file_name)
  s = IO.read(file_name)
  JSON.parse(s)
end

def index(t, t0, interval)
  (t - t0) / interval
end

def timestamp_in_ms(i, t0, interval)
  (i * interval + t0) * 1000
end

def print_header
  puts %w(key date value).to_csv
end
