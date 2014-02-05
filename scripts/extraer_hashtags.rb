require 'json'

SEPARATOR = ";"

file_name = ARGV[0]
s = IO.read(file_name)
tweets = JSON.parse(s)

hashtags = {}
tweets["statuses"].each do |t|
  t["new_hashtags"].each do |h|
		if hashtags[h]
			hashtags[h] += 1
		else
			hashtags[h]  = 1
		end
  end
end

hashtags.each { |h,val| puts "#{h}#{SEPARATOR}#{val}" }
