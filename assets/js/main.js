

// import { AchievementSystem, Achievement, AchievementDisplay, ElementClickTargetAchievement, ClickAllElementsAchievement, ProgressAchievement } from "./Achievements2.js";

/* ACHIEVEMENTS */
// var achievementDisplay = new AchievementDisplay(".achievements");
// var achievementSystem = new AchievementSystem(achievementDisplay);

// elementsClicked = new ClickAllElementsAchievement(achievementSystem, "Click all marked elements", 100, "img/default-achievement.svg", ".about p > i");
// headerClicker = new ClickElementAchievement(achievementSystem, "click header 100 times", 100, "img/default-achievement.svg", ".header", 100 );
// konamiAchievement = new Achievement(achievementSystem, "use the konamicode", 200, "img/default-achievement.svg");
// scrollAchievement = new ProgressAchievement(achievementSystem, "scroll 1km", 200, "img/default-achievement.svg", 1, 1000);
// viewAllProjects = new ClickAllElementsAchievement(achievementSystem, "view all projects", 200, "img/default-achievement.svg", ".projects_item > a");

// achievementSystem.update();  
 
 


	var reset = document.querySelectorAll(".reset-achievements");

	for (var i = reset.length - 1; i >= 0; i--) {
		reset[i].addEventListener("click", function() {achievementSystem.resetAchievements()});
	}


	/* ANIMATING IMAGES */
	var backgroundImages = [ 
		"abstract.jpg",  
		"code.jpg", 
		"connectwork.jpg",
		"geometric.svg",
		"gold.jpg",
		"header.svg",
		"hex.svg",
		"machine.jpg",
		"round.jpg",
		"wall.jpg",
		"wheat.jpg",
		"fruit.jpg",  
		"leaves.jpg", 
		"leaves2.jpg",
		"mosaic.jpg",
		"shapes.jpg",
		"symbols.jpg",
	];

	var headerBackgrounds = new ImageAnimator(".header", backgroundImages, "assets/img/bg/compressed/");

	headerBackgrounds.loadRandomHeader();

	setInterval(function() {headerBackgrounds.loadRandomHeader()}, 10000);

	spaceAchievement.addEventListener("achieved", function() {
		headerBackgrounds.chaos()
	} );

	var aboutPhotos = [
		"JoostHobma.jpg",
		"JoostHobma2.jpg",
		"JoostHobma3.jpg"
	];
	var aboutPhoto = new ImageAnimator(".about_photo", aboutPhotos, "assets/img/");

	aboutPhoto.loadRandomHeader();

	setInterval(function() {aboutPhoto.loadRandomHeader()}, 10000);


	/* RIPPLE */
	var ripple = new Ripple(".menu_item, p > i, .button, button");


	/* NAV */ 



		// menu
		var pages = document.querySelectorAll("[page-id]");

		var items = document.querySelectorAll("[page]");

		for (var i = 0; i < pages.length; i++) {
			if (i > 0) {
				pages[i].classList.remove("active");
			}
		}


		for(item of items) {
			item.addEventListener("click", (e) => {
				var elem = e.target;
				for (var i = 0; i < pages.length; i++) {
					pages[i].classList.remove("active");
				}
				var id = elem.getAttribute("page");
				console.log("[page-id=" + id + "]");
				document.querySelector("[page-id=" + id + "]").classList.add("active");
			})
		}

	/* MODE SWITCHER */
	var mode_switcher = new modeSwitcher(".modeSwitcher", "lightmode", false);
	var toolTips = new toolTipController("tooltip");


	/* TEXTTYPER */
	var typer = new TextTyper({typeSpeed:20, minTypeSpeed:20, removeSpeed: 100, removeSpeedMax:20});
	var headLines = [
		/* Welcome to my portfolio */
		"Welcome people of this world",
		"This is my portfolio",
		"This is the place to find all of my accomplishments",
		"This website is made by me and uses no libraries",
		"All that you see on this page is all mine",
		"I did this on purpose to test my skills and learn vanilla JavaScript",
		"Even this type text thingy is made by me",
		"btw, it determines the time interval between letters depending on the distance between the keys on the keyboard :P",
		"A bit over complicated, I know. But I had fun creating it",
		"I also built in an achievements. Try for example typing in the konami code (↑ ↑ ↓ ↓ ← → ← → B A)",
		"Or clicking the header 50 times...",
		"Okay, enough about this site. Something about me...",
		"I have four 4 years of experience in web development and design",
		"I started with web development and design during my media study",
		"During that time I learnt the basics and also started to fool around at home with stuff.",
		"One of the first things I made was a drawing app. Check it out down below ↓↓↓↓",
		"I also started working with Wordpress during this period. Mainly during my internship.",
		"during my internship I made several custom WordPress templates from scratch.",
		"That was also my full-time job after my study for about a year",
		"Then I started my new study HBO-ICT in Groningen at Hanze",
		"While I still focused on web development, I also discovered a lot of other aspects of development",
		"such as: Learning new programming languages, learning about coding practices & getting to know several design patterns",
		"A few small projects I'm quite proud of are my Favi\<Insert game name here\> games, which are playable in the favicon :P",
		"I think It's quite a neat but useless idea",
		"The thing I'm probably most proud of is my Spotify background.",
		"It shows, the current playing song on Spotify. I use a program to use it as my desktop background. I use it every day",
		"Another thing is gea-fairplay.nl. This was my first wordpress website I created outside of school.",
		"My focus when making this website was to make it as user friendly and easy to manage in the back-end as I could",
		"This is all I wanted to say...",
		"Thanks for listening to my ted talk",
		"Bye :waving:",
		"...",
	];

	var index = (localStorage.getItem("slogan") != null) ? localStorage.getItem("slogan") : 0;


	if (index >= headLines.length) {		
		index = 0;
	}

	setTimeout(showNextSlogan, 2000);

	function showNextSlogan() {
		typer.setText(headLines[index], removeTimeout);
		localStorage.setItem("slogan", index);

		index++;
		index = index % headLines.length; 

	}

	function removeTimeout() {
		setTimeout(removeSlogan, 1000);
	}
 
	function removeSlogan() {
		console.log("removing slogan");
		typer.removeText(showNextSlogan);
	}


	/* SCROLL ACHIEVEMENT */

	// test





	/* PROJECTS ANIMATION */


	new Dir(".projects_item", ".projects_item_summary");

