<?php 
	include_once "data.php";

	function the_menu($menu) {
		$current_page = $_SERVER['REQUEST_URI'];
		foreach ($menu as $item) {
			$extraClass = "";
			if ($item["slug"] == $_SERVER['REQUEST_URI']) {
				$extraClass = "active";
			}
			$color = $item["color"];
			$slug = $item["slug"];
			$title = $item["title"];
			echo "<span class='menu_item $extraClass' data-color='$color' page='$slug'>$title</span>"; 
		}
	}

	function if_echo($format, $content, $item) {		
			return (array_key_exists($item, $content)) ? sprintf($format, $content[$item]) : "";
	}

	function load_content($content) {
		foreach($content as $section) {
			echo if_echo("<h1>%s</h1>", $section, "title");
			echo if_echo("<p>%s</p>", $section, "description");

			if (array_key_exists("content", $section)) {
				foreach ($section["content"] as $item) {					
					echo if_echo("<img src='%s'>", $item, "image");
					echo if_echo('<p class="caption">%s</p>', $item, "description");
				}
			}
		}
	}
?>