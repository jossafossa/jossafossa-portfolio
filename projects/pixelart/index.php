<?php include_once "../../functions.php"; ?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Joost Hobma - Pixelart</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700" rel="stylesheet">
	<link rel="stylesheet" href="../../assets/build/design.css">
</head>
<body>
	<?php $projects = array(
		array(
			"title" => "Pixelart",
			"description" => "Some pixelart I did for a few game project with my friends. We all did some programming & I made the textures.",
			"content" => array(
				array(
					"image" => "werewolf.png",
					"description" => "Textures for an unfinished top down puzzle game",
				),
				array(
					"image" => "descended.png",
					"description" => "Cave textures for another unfinished game",
				),
				array(
					"image" => "descended2.png",
					"description" => "And another one",
				)
			)
		)
	) ?>

	<?php load_content($projects); ?>
</body>
</html>