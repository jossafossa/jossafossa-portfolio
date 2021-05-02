

// import { AchievementSystem, Achievement, AchievementDisplay, ElementClickTargetAchievement, ClickAllElementsAchievement, ProgressAchievement } from "./Achievements2.js";
// import "./secretCode";
// import "./headerAnimator";
// import "./modeSwitcher"
// import "./textTyper";
// import "./toolTips";
// import "./Achievements";
// import "./achievementSetup";



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

	let headerBackgroundsLoop = setInterval(function() {headerBackgrounds.loadRandomHeader()}, 10000);

	spaceAchievement.addEventListener("achieved", function() {
		headerBackgrounds.chaos()
	} );


	var aboutPhotos = [
		"JoostHobma.jpg",
		"JoostHobma2.jpg",
		"JoostHobma3.jpg"
	];
	console.log(allAboutPhotos);
	if (allAboutPhotos !== undefined) {
		aboutPhotos = allAboutPhotos;
	} 
		
	var aboutPhoto = new ImageAnimator(".about_photo", aboutPhotos, "./assets/img/ik/");

	aboutPhoto.loadRandomHeader();

	let aboutPhotoLoop = setInterval(function() {aboutPhoto.loadRandomHeader()}, 10000);


	/* RIPPLE */
	var ripple = new Ripple(".menu_item, p > i, .button, button");
	new Bulge(".menu_item, p > i, .button, button, .header, .projects_item > header");

	let timeout;
	let menuItems = document.querySelectorAll(".menu_item");
	for(let item of menuItems) {
		item.addEventListener("click", e => {
			let container = item.closest(".menu");
			let containerContainer = item.closest(".menu-container");
			containerContainer.style.transitionDuration = "0s";
			containerContainer.style.transitionDelay = "1.9s";
			let color = item.dataset.color;
			document.body.style.setProperty("--primary", color);
			let parentBox = container.getBoundingClientRect();
			let relX, relY;
			if (parentBox.top == 0) {
				relX = e.clientX - container.offsetLeft;
				relY = e.clientY - container.offsetTop;
			} else {
				relX = e.pageX - container.offsetLeft;
				relY = e.pageY - container.offsetTop;
			}
			ripple.ripples(container, relX, relY, 1, color, true);
			console.log(e, container.offsetTop);

			clearTimeout(timeout);
			timeout = setTimeout(() => {
				containerContainer.style.transitionDelay = null;
				containerContainer.style.transitionDuration = null;
			}, 1500);
		})
	}


	/* NAV */ 

	// sticky menu
	let menu = document.querySelector(".menu");
	let menuContainer = document.querySelector(".menu-container");
	let box = menuContainer.getBoundingClientRect();
	menu.dataset.width = box.width + "px";

	document.addEventListener("scroll", stick);
	stick();
	function stick (){
		let scrollY = window.scrollY;
		let box = menuContainer.getBoundingClientRect();

		// console.log(box, scrollY);
		if (box.y <= 0) {
			menu.classList.add("sticky");
			menu.style.width = menu.dataset.width;
		} else {
			menu.classList.remove("sticky"); 
			menu.style.width = undefined;
		}
	}


		// menu
		var pages = document.querySelectorAll("[page-id]");

		var items = document.querySelectorAll("[page]");

		for (var i = 0; i < pages.length; i++) {
			if (i > 0) {
				pages[i].classList.remove("active");
			}
		}


		for(let item of items) {
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
	var mode_switcher = new modeSwitcher("#darkModeSwitch", "lightmode", false);
	var toolTips = new toolTipController("tooltip");


	/* TEXTTYPER */
	var typer = new TextTyper({typeSpeed:20, minTypeSpeed:20, removeSpeed: 100, removeSpeedMax:20});
	var headLines = [
		/* Welcome to my portfolio */
		"Welcome people of this world",
		"This is my portfolio",
		"This is the place to find most of my (personal) accomplishments",
		"This website is made by me and uses no libraries",
		"Even this type text thingy is made by me",
		"Try clicking the header 50 times...",
		"Try typing the konami code... (↑ ↑ ↓ ↓ ← → ← → B A)",
		"Usefull isn't it! (more under Achievements :P)",
		"I started working on small projects at home during my study (Media studies).",
		"Thats what most of the projects on my portfolio are.",
		"During my study I came across WordPress.",
		"Didn't like WordPress at first, but when I learnt how to use it without thems that all changed.",
		"Now I have worked with WordPress for 6+ years",
		"And made 18+ custom WordPress sites already.",
		"After my first study I started studying IT",
		"While I still focused on web development, I also discovered a lot of other languages and methods",
		"Now a few projects I'm proud of:",
		"Favisnake, FaviBomber & FaviTetris!",
		"I came across a small game made for the Favicon and got inspired",
		"Then I decided to make my own!",
		"the personal project that I'm most proud of is Spotidash",
		"This website shows me the song I'm currently playing on spotify and has some media controls",
		"I use Wallpaper Engine to use it as desktop background",
		"There are also some WordPress websites on here:",
		"gea-fairplay.nl, the-big-five.nl and themainevent.nl. Sadly thebigfive and themainevent are offline :(.",
		"But I had fun creating them tho",
		"This is all the rambling I wanted to do",
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



	allAchievement.addEventListener("achieved", function() {
		document.body.classList.add("party-mode");
		clearInterval(headerBackgroundsLoop);
		clearInterval(aboutPhotoLoop);
		setInterval(e => {
			headerBackgrounds.loadRandomHeader();
			aboutPhoto.loadRandomHeader();
		}, 1000);
		var audio = new Audio('assets/mp3/victory.mp3');
		audio.play();
	} );