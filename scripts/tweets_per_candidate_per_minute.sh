#!/bin/bash
script_dir=$(dirname $0)
target="tweets_per_candidate_per_minute.csv"
echo "key,date,value" > $target
for i in tweets-*.json
do 
  candidate=$(echo $i | sed 's/tweets-\(.*\).json/\1/')
  ruby $script_dir/tweets_per_minute.rb $i | sed "s/.*/$candidate,&/"
done >> $target
