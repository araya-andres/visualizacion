load File.expand_path('common.rb', File.dirname(__FILE__))

tweets = read_tweets(ARGV[0])
interval = ONE_MINUTE
n = index(T1, T0, interval)
print_header
tweets["statuses"].inject({}) { |hash, tweet|
  i = index(tweet["created_at"], T0, interval)
  tweet["new_hashtags"].each { |hashtag|
    arr = hash[hashtag] ||= Array.new(n, 0)
    arr[i] += 1
  }
  hash
}.sort_by { |hash, arr|
  arr.inject(0) { |sum, count| sum -= count }
}.each { |hashtag, arr|
  arr.each_with_index { |count, i|
    puts [hashtag, timestamp_in_ms(i, T0, interval), count].to_csv
  }
}
