require 'json'

T0 = 1390176000 # 6:00 PM
UN_MINUTO = 60

file_name = ARGV[0]
s = IO.read(file_name)
tweets = JSON.parse(s)

intervalo = UN_MINUTO

hashtags = tweets["statuses"].inject({}) { |ans, t|
  i = ((t["created_at"] - T0) / intervalo) * intervalo + T0
	ans[i] = 1 + (ans[i] || 0)
  ans
}.collect { |timestamp, count| { timestamp: timestamp, count: count } }

puts JSON.pretty_generate(hashtags)
