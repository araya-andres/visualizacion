<?php
$data_dir = 'data/';
$candidate = 'all';
$interval = 5;
$full_name = array(
  "araya" => "Johnny Araya",
  "guevara" => "Otto Guevara",
  "piza" => "Rodolfo Piza",
  "solis" => "Luis Guillermo Solís",
  "villalta" => "José María Villalta"
);

$palette = array(
  "york" => "['#656e3f', '#cfdb9d', '#c8aee5', '#48276d', '#1e0a34']", // http://www.colourlovers.com/palette_name_name/3264234/York
  "crystal" => "['#097d8d', '#b4e2e8', '#010e10', '#1d3538', '#526c70']", // http://www.colourlovers.com/palette_name/3264234/Crystal
  "creme" => "['#e3dd7a', '#c5bf69', '#a4a05e', '#6b6b3b', '#403e21']", // http://www.colourlovers.com/palette_name_name/3264234/Creme
  "blush" => "['#982e2e', '#c49292', '#efdcd2', '#d2bbaf', '#b48989']", // http://www.colourlovers.com/palette_name_name/3264234/Blush
  "green_quite" => "['#aae694', '#cfe5c7', '#c1cdc0', '#86a294', '#708e80']", // http://www.colourlovers.com/palette_name/3264234/Green_quite
  "frozen" => "['#1c5193', '#307cb0', '#3e84c9', '#a8c5d5', '#afe6ff']", // http://www.colourlovers.com/palette/3264234/Frozen
);

$palette_name = "frozen";
$redirect = 'true';
$back_button = "";
$chart_title = "tweets por candidato por tiempo";

if ($_GET['candidate']) {
  $candidate = $_GET['candidate'];
  $chart_title = "hashtags para " . $full_name[$candidate] . " por tiempo";
  $back_button = "<br/><a href='index.php'>< atrás</a>";
  $redirect = 'false';
}

if ($_GET['interval']) {
  $interval = $_GET['interval'];
}

if ($_GET['palette']) {
  $palette_name = $_GET['palette'];
}

$args = "'$data_dir$candidate$interval.csv', {" . 
  "color_range: $palette[$palette_name], " .
  "interval: $interval, " .
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
  <div class="left">
    <h1>$chart_title</h1>
    <h2>siguiendo el #debate en @twitter</h2>
  </div>
  <div class="right">
    <p>
      andrés araya, rodrigo hernández</br>
      mc-8832 visualización de información</br>
      ph.d. franklin hernández-castro</br>
      $back_button
    </p>
  </div>
  <div class="chart">
  </div>
</body>
</html>
EOF;
