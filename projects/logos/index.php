<?php include_once "../../functions.php"; ?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Joost Hobma - Logo's</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700" rel="stylesheet">
	<link rel="stylesheet" href="../../assets/build/design.css">
</head>
<body>
	<?php $projects = array(
		array(
			// "title" => "Logo's",
			"description" => "Some logo's I made for a few people over the years",
			"content" => array(
				array(
					"image" => "mainevent.jpg",
				),
				array(
					"image" => "fairplay.png",
				),
				array(
					"image" => "thunderbeatz.png",
				),
				array(
					"image" => "concept.png",
					"description" => "I made this logo for myself. But I ended up using the JossaFossa Logo :/",
				)
			)
		)
	) ?>

	<?php load_content($projects); ?>
</body>