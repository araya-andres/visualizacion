<?php
$data_dir = 'data/';
$candidate = 'all';
$interval = 5;
$layers = 75;
$step = 10;

$york = "['#656e3f', '#cfdb9d', '#c8aee5', '#48276d', '#1e0a34']"; // http://www.colourlovers.com/palette/3264234/York
$crystal = "['#097d8d', '#b4e2e8', '#010e10', '#1d3538', '#526c70']"; // http://www.colourlovers.com/palette/3264234/Crystal
$creme = "['#e3dd7a', '#c5bf69', '#a4a05e', '#6b6b3b', '#403e21']"; // http://www.colourlovers.com/palette/3264234/Creme
$blush = "['#982e2e', '#c49292', '#efdcd2', '#d2bbaf', '#b48989']"; // http://www.colourlovers.com/palette/3264234/Blush
$green_quite = "['#aae694', '#cfe5c7', '#c1cdc0', '#86a294', '#708e80']"; // http://www.colourlovers.com/palette/3264234/Green_quite
$frozen = "['#1c5193', '#307cb0', '#3e84c9', '#a8c5d5', '#afe6ff']"; // http://www.colourlovers.com/palette/3264234/Frozen

$redirect = 'true';
$back_button_visibility = "hidden";
$chart_title = "Tweets por candidato por tiempo";

if ($_GET['candidate']) {
  $candidate = $_GET['candidate'];
  $chart_title = "Hashtags para " . ucfirst($candidate) . " por tiempo";
  $back_button_visibility = "visible";
  $redirect = 'false';
}
$args = "'$data_dir$candidate$interval.csv', {" . 
  "color_range: $frozen, " .
  "interval: $interval, " .
  "back_button_visibility: '$back_button_visibility', " .
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
  <h1>siguiendo el #debateTN7 en @twitter</h1>
  <h2>@andres_araya, @rodrigo_hernandez</h2>
  <h3>$chart_title</h3>
  <div class="chart"></div>
</body>
</html>
EOF;
