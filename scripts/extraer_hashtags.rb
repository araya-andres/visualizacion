require 'json'

file_name = ARGV[0]
s = IO.read(file_name)
tweets = JSON.parse(s)

tmp = {}
tweets["statuses"].each do |t|
  t["new_hashtags"].each do |h|
		tmp[h] = tmp[h] ? tmp[h] + 1 : 1
  end
end

hashtags = tmp.sort_by { |h, count| -count }.
               collect { |h, count| { hashtag: h, count: count } }

puts JSON.pretty_generate(hashtags)
