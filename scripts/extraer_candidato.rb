require 'json'

file_name = ARGV[0]
s = IO.read(file_name)
tweets = JSON.parse(s)

keywords=%w(john araya pln liberacion cambio responsable tiempo construir yoni jhon)

def match?(hashtags, re)
  hashtags.each do |h|
    re.each { |r| return true if r.match(h) }
  end
  return false
end

re = keywords.map { |k| Regexp.new(k) }
statuses = tweets["statuses"].inject([]) { |ans, t|
  ans << t if match?(t["new_hashtags"], re)
  ans
}
tweets["statuses"] = statuses

puts JSON.pretty_generate(tweets)
