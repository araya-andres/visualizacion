load File.expand_path('common.rb', File.dirname(__FILE__))

tweets = read_tweets(ARGV[0])
interval = ONE_MINUTE
n = index(T1, T0, interval)
tweets_per_minute = tweets["statuses"].inject(Array.new(n, 0)) { |tpm, t|
  i = index(t["created_at"], T0, interval)
  tpm[i] += 1
  tpm
}.each_with_index { |count, i|
  { timestamp: timestamp_in_ms(i, T0, interval), count: count }
}

puts JSON.pretty_generate(tweets_per_minute)
