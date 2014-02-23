#!/bin/bash
script_dir=$(dirname $0)
k=${1-1}
target="tweets_per_candidate_per_${k}_minutes.csv"
echo "key,date,value" > $target
for i in tweets-*.json
do 
  candidate=$(echo $i | sed 's/tweets-\(.*\).json/\1/')
  ruby $script_dir/tweets_per_minute.rb $i $k | sed "s/.*/$candidate,&/"
done >> $target
