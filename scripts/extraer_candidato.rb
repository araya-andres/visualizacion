require 'json'

def read_tweets(file_name)
  s = IO.read(file_name)
  JSON.parse(s)
end

def match?(hashtags, re)
  hashtags.each do |h|
    re.each { |r| return true if r.match(h) }
  end
  return false
end

tweets = read_tweets(ARGV[0])
keywords = IO.readlines(ARGV[1])
re = keywords.map { |k| Regexp.new(k.chomp) }
statuses = tweets["statuses"].inject([]) { |ans, t|
  ans << t if match?(t["new_hashtags"], re)
  ans
}
tweets["statuses"] = statuses

puts JSON.pretty_generate(tweets)
