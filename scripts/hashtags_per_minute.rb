load File.expand_path('common.rb', File.dirname(__FILE__))

tweets = read_tweets(ARGV[0])
interval = ONE_MINUTE
n = index(T1, T0, interval)
print_header
tweets["statuses"].inject(Array.new(n, nil)) { |ans, t|
  i = index(t["created_at"], T0, interval)
  ans[i] ||= {}
  t["new_hashtags"].each { |h| ans[i][h] = 1 + (ans[i][h] || 0) }
  ans
}.each_with_index { |hashtags, i|
  next unless hashtags
  timestamp = timestamp_in_ms(i, T0, interval)
  hashtags.each { |h, count| puts [timestamp, h, count].to_csv }
}
