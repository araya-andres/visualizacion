require 'json'

file_name = ARGV[0]
s = IO.read(file_name)
tweets = JSON.parse(s)

hashtags = tweets["statuses"].inject({}) { |ans, t|
  t["new_hashtags"].each { |h| ans[h] = ans[h] ? ans[h] + 1 : 1 }
  ans
}.sort_by { |h, count| -count }.
  collect { |h, count| { hashtag: h, count: count } }

puts JSON.pretty_generate(hashtags)
