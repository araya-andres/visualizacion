load File.expand_path('common.rb', File.dirname(__FILE__))

tweets = read_tweets(ARGV[0])
hashtags = tweets["statuses"].inject({}) { |ans, t|
  t["new_hashtags"].each { |h| ans[h] = 1 + (ans[h] || 0) }
  ans
}.sort_by { |h, count| -count }.
  collect { |h, count| { hashtag: h, count: count } }

puts JSON.pretty_generate(hashtags)
