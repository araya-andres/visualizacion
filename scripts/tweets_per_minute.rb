load File.expand_path('common.rb', File.dirname(__FILE__))

tweets = read_tweets(ARGV[0])
interval = ONE_MINUTE
n = index(T1, T0, interval)
tweets["statuses"].inject(Array.new(n, 0)) { |tweets_per_minute, tweet|
  i = index(tweet["created_at"], T0, interval)
  tweets_per_minute[i] += 1
  tweets_per_minute
}.each_with_index { |count, i|
  puts [timestamp_in_ms(i, T0, interval), count].to_csv
}
