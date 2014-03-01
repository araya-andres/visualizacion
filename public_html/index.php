<?php
$data_dir = 'data/';
$candidate = 'all';
$interval = 5;
$layers = 75;
$step = 10;
#$color_range = "['#d78a29', '#799a33', '#fffc00', '#d44136', '#1671ac']";
$redirect = 'true';
$y_axis_title = "Tweets";
$back_button_visibility = "hidden";
$chart_title = "Tweets por candidato por tiempo";

if ($_GET['candidate']) {
  $candidate = $_GET['candidate'];
  $y_axis_title = "Hashtags";
  $chart_title = "Hashtags para " . ucfirst($candidate) . " por tiempo";
  $back_button_visibility = "visible";
  $redirect = 'false';
}
$args = "'$data_dir$candidate$interval.csv', {" . 
  "interval: $interval, " .
  "layers: $layers, " .
  "step: $step, " .
  "y_axis_title: '$y_axis_title', " .
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
  <h1>siguiendo el <span class="hashtag">#debateTN7</span> en <span class="user_mention">@twitter</span></h1>
  <h2>@andres_araya, @rodrigo_hernandez</h2>
  <h3>$chart_title</h3>
  <div class="chart"></div>
</body>
</html>
EOF;
