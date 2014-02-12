require 'json'

def read_tweets(file_name)
  s = IO.read(file_name)
  JSON.parse(s)
end

def read_keywords(file_name)
  IO.readlines(file_name).map { |k| Regexp.new(k.chomp) }
end

def match?(hashtags, re)
  hashtags.each do |h|
    re.each { |r| return true if r.match(h) }
  end
  false
end

tweets = read_tweets(ARGV[0])
keywords = read_keywords(ARGV[1])
statuses = tweets["statuses"].inject([]) { |ans, t|
  ans << t if match?(t["new_hashtags"], keywords)
  ans
}
tweets["statuses"] = statuses

puts JSON.pretty_generate(tweets)
