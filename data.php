<?php 

$menu = array(
		'<i class="fas fa-project-diagram"></i> Projects' 	=> "projects", 
		'<i class="fas fa-user"></i> About'	=> "about",
		'<i class="fas fa-trophy marked"></i> Achievements'	=> "achievements",
);

$spotidash = new Project(
	$title = "Spotify background",
	$description = "Connect your spotify & get a cool background",
	$url = "https://www.jossafossa.nl/projects/spotidash/",
	$background = "assets/img/thumbnails/spotifybackground.jpg",
	$color = "#009688",
	$favorite = true
);
$favisnake = new Project(
	$title = "FaviSnake",
	$description = "Play snake in your favicon! :D",
	$url = "https://www.jossafossa.nl/projects/faviSnake/",
	$background = "assets/img/thumbnails/favisnake.jpg",
	$color = "#eb381a",
	$favorite = true
);
$favibomber = new Project(
	$title = "FaviBomber",
	$description = "Play bomberman in your favicon! :P",
	$url = "https://www.jossafossa.nl/projects/faviBomber2/",
	$background = "assets/img/thumbnails/favibomber.jpg",
	$color = "#42382e",
	$favorite = true
);
$favitetris = new Project(
	$title = "FaviTetris",
	$description = "Play tetris in your favicon! :)",
	$url = "https://www.jossafossa.nl/projects/faviTetris/",
	$background = "assets/img/thumbnails/tetris.jpg",
	$color = "#15346a",
	$favorite = true
);
$chess = new Project(
	$title = "(WIP) Chess game",			
	$description = "A customizable game of chess",
	$url = "https://www.jossafossa.nl/projects/chess_v5/",
	$background = "assets/img/thumbnails/chess.jpg",
	$color = "#be7f49",
	$favorite = true
);
$fairplay = new Project(
	$title = "www.gea-fairplay.nl",
	$description = "Custom wordpress website, design & logo",
	$url = "http://gea-fairplay.nl",
	$background = "assets/img/thumbnails/fairplay.jpg",
	$color = "#cd1f3e",
	$favorite = true
);
$tme = new Project(
	$title = "www.themainevent.nl",
	$description = "(Offline) Custom wordpress website, design & logo",
	$url = "http://themainevent.nl",
	$background = "assets/img/thumbnails/mainevent.jpg",
	$color = "#dc5121"
);
$draw = new Project(
	$title = "(WIP) drawing app",
	$description = "Quite an old project. You can draw stuff",
	$url = "https://www.jossafossa.nl/projects/draw/",
	$background = "assets/img/thumbnails/draw.jpg",
	$color = "#0778fa"
);
$fancymenu = new Project(
	$title = "Fancy menu idea",
	$description = "A fancy menu with a preview",
	$url = "https://codepen.io/Jossafossa/pen/GbOzgq",
	$background = "assets/img/thumbnails/menu.jpg",
	$color = "#1b799b"
);
$logos = new Project(
	$title = "Logo's",
	$description = "Just a list logo's I made",
	$url = "https://www.jossafossa.nl/projects/logos/",
	$background = "assets/img/thumbnails/logos.jpg",
	$color = "#36336d"
);
$design = new Project(
	$title = "Other design stuff",
	$description = "Illustrations, flyers etc.",
	$url = "https://www.jossafossa.nl/projects/design/",
	$background = "assets/img/thumbnails/print.jpg",
	$color = "#d87f04"
);
$pixelart = new Project(
	$title = "Pixel art",
	$description = "Some custom pixel art I made for some unfinished games",
	$url = "https://www.jossafossa.nl/projects/pixelart/",
	$background = "assets/img/thumbnails/pixelart.jpg",
	$color = "#733f53"
);
$wheel = new Project(
	$title = "Wheel of Fortune",
	$description = "Manage lists and spin the wheel!",
	$url = "https://www.jossafossa.nl/projects/wheel/",
	$background = "assets/img/thumbnails/wheel.jpg",
	$color = "#ff7044"
);
$tbf = new Project(
	$title = "www.the-big-five.nl",
	$description = "Design + Website for fictional communication agency",
	$url = "https://www.the-big-five.nl",
	$background = "assets/img/thumbnails/thebigfive.jpg",
	$color = "#ea8b2d"
);

$projects = array(
	$fairplay,
	$tbf,
	$tme,
	$spotidash,
	$chess,
	$favisnake,
	$favitetris,
	$favibomber,
	$draw,
	$fancymenu,
	$wheel,
	$pixelart,
	$design,
	$logos


		// new Project(
		// 	$title = "(WIP) Carcassonne",
		// 	$description = "I tried to recreate carcassonne. This is still WIP",
		// 	$url = "https://www.jossafossa.nl/projects/carcassonne_game/",
		// 	$background = "",
		// 	$color = "#d87f04"
		// ),

	);

// shuffle($projects);

class Project {
	
	function __construct($title = "", $description = "", $url = "", $background = "", $color = "", $favorite = false )
	{
		$this->title = $title;
		$this->description = $description;
		$this->url = $url;
		$this->color = $color;
		$this->background = ($background == "") ? "assets/img/thumbnails/default_background.jpg" : $background;
		$this->favorite = $favorite;
	}
}
?>
