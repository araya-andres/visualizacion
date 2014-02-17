#!/bin/bash
tweets=${1-debate.json}
script_dir=$(dirname $0)
for i in hashtags-*.txt
do 
  target=$(echo $i | sed 's/hashtags-\(.*\).txt/tweets-\1.json/')
  ruby $script_dir/tweets_per_candidate.rb $tweets $i > $target
done
