require 'json'

file_name = ARGV[0]
s = IO.read(file_name)
tweets = JSON.parse(s)

statuses = tweets["statuses"].inject([]) { |ans, t|
  t["new_hashtags"].each { |h|
		if h =~ /johnny/ ||
			 h =~ /araya/
			 ans << t
		end
	}
  ans
}
tweets["statuses"] = statuses

puts JSON.pretty_generate(tweets)
