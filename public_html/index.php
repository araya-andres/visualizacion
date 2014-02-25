<?php
$data_dir = 'data/';
$data = 'data5.csv';
$interval = '5';
$color_range = "['#c7d436', '#36d441', '#333333', '#d44136', '#4136d4']";
$redirect = 'true';

if ($_GET['candidate']) {
  $data = $_GET['candidate'] . '5.csv';
  $redirect = 'false';
}
$args = "'$data_dir$data', {" . 
  "interval: $interval, " .
  "color_range: $color_range, " .
  "redirect: $redirect" .
  "}";

print <<<EOF
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <link rel="stylesheet" href='http://fonts.googleapis.com/css?family=Open+Sans'/>
  <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Ubuntu"/>
  <link rel="stylesheet" href="css/style.css"/>
  <script src="js/d3/d3.min.js"></script>
  <script src="js/streamgraph.js"></script>
</head>
<body onload="chart($args)">
  <h1>siguiendo el <span class="hashtag">#debateTN7</span> en <span class="user_mention">@twitter</span></h1>
  <h2>@AndresAraya, @RodrigoHernandez</h2>
  <div class="chart"></div>
</body>
</html>
EOF;
