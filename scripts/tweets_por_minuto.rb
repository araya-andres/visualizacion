require 'json'

T0 = 1390176000 #  6:00 PM
T1 = 1390197600 # 12:00 AM
UN_MINUTO = 60

def indice(t, t0, intervalo)
  (t - t0) / intervalo
end

def timestamp_en_ms(i, t0, intervalo)
  (i * intervalo + t0) * 1000
end

file_name = ARGV[0]
s = IO.read(file_name)
tweets = JSON.parse(s)

intervalo = UN_MINUTO
n = indice(T1, T0, intervalo)
hashtags = tweets["statuses"].inject(Array.new(n, 0)) { |ans, t|
  i = indice(t["created_at"], T0, intervalo)
  ans[i] += 1
  ans
}.each_with_index.collect { |count, i|
  { timestamp: timestamp_en_ms(i, T0, intervalo), count: count }
}

puts JSON.pretty_generate(hashtags)
