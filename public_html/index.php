<?php
$data_dir = 'data/';
$candidate = 'all';
$interval = 5;
$layers = 75;
$step = 10;
#$color_range = "['#d78a29', '#799a33', '#fffc00', '#d44136', '#1671ac']";
$redirect = 'true';

if ($_GET['candidate']) {
  $candidate = $_GET['candidate'];
  $redirect = 'false';
}
$args = "'$data_dir$candidate$interval.csv', {" . 
  "interval: $interval, " .
  "layers: $layers, " .
  "step: $step, " .
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
  <script src="js/scripts.js"></script>
</head>
<body onload="chart($args)">
  <h1>siguiendo el <span class="hashtag">#debateTN7</span> en <span class="user_mention">@twitter</span></h1>
  <h2>@AndresAraya, @RodrigoHernandez</h2>
  <div class="chart"></div>
</body>
</html>
EOF;
