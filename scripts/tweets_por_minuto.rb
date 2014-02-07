require 'json'

T0 = 1390176000 #  6:00 PM
T1 = 1390197600 # 12:00 AM
UN_MINUTO = 60

file_name = ARGV[0]
s = IO.read(file_name)
tweets = JSON.parse(s)

intervalo = UN_MINUTO
hashtags = tweets["statuses"].inject(Array.new((T1 - T0) / intervalo, 0)) { |ans, t|
  i = (t["created_at"] - T0) / intervalo
	ans[i] += 1
  ans
}.each_with_index.collect { |count, i|
  timestamp = i * intervalo + T0
  { timestamp: timestamp, count: count }
}

puts JSON.pretty_generate(hashtags)
