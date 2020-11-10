<?php 
class Project {
	
	function __construct($title = "", $description = "", $url = "", $background = "" )
	{
		$this->title = $title;
		$this->description = $description;
		$this->url = $url;
		if ($background == "") {
			$this->background = "img/default-background.jpg";
		} else {
			$this->background = $background;
		}
	}
} ?>