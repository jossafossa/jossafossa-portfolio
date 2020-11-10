<?php include_once "../../functions.php"; ?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Joost Hobma - Design Stuff</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700" rel="stylesheet">
	<link rel="stylesheet" href="../../assets/build/design.css">
</head>
<body>
	<?php $projects = array(
		array(
			"title" => "Posters",
			"description" => "Some posters I made",
			"content" => array(
				array(
					"image" => "aclo-poster-v2.png",
					"description" => "An advertising poster for Fairplay",
				),
				array(
					"image" => "metamorph-POSTER.jpg",
					"description" => "An advertising poster for an event for Fairplay. I did not make the logo",
				),
				array(
					"image" => "maineventposter.png",
					"description" => "A poster I did for Themainevent.nl",
				)
			)
		),
		array(
			"title" => "Vector",
			"description" => "These are some vectors I made for an internship",
			"content" => array(
				array(
					"image" => "sudokids1.png",
					"description" => "Roadmap for the game",
				),
				array(
					"image" => "sudokids2.png",
					"description" => "These are some of the headers",
				),
			)
		)
	) ?>

	<?php load_content($projects); ?>
</body>
</html>