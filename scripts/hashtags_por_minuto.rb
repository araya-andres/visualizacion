require 'json'
require 'pp'

T0 = 1390176000 #  6:00 PM
T1 = 1390197600 # 12:00 AM
UN_MINUTO = 60

def read_tweets(file_name)
  s = IO.read(file_name)
  JSON.parse(s)
end

def indice(t, t0, intervalo)
  (t - t0) / intervalo
end

def timestamp_en_ms(i, t0, intervalo)
  (i * intervalo + t0) * 1000
end

tweets = read_tweets(ARGV[0])

intervalo = UN_MINUTO
n = indice(T1, T0, intervalo)
tweets["statuses"].inject(Array.new(n, nil)) { |ans, t|
  i = indice(t["created_at"], T0, intervalo)
  ans[i] ||= {}
  t["new_hashtags"].each { |h| ans[i][h] = 1 + (ans[i][h] || 0) }
  ans
}.each_with_index.collect { |hashtags, i|
  next unless hashtags
  timestamp = timestamp_en_ms(i, T0, intervalo)
  hashtags.each { |h, val| puts "#{timestamp};#{h};#{val}" }
}
