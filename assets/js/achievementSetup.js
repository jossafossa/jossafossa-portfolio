var achievementSystem = new AchievementSystem(new AchievementDisplay(".achievements"));

// HACK THIS ACHIEVEMENT
var hackAchievement = new Achievement({
	name: "Hack this achievement",
	points: 100,
	image: "assets/img/icons/compressed/treasure-chest.svg",
})
achievementSystem.register(hackAchievement);

// KONAMI
var konamiAchievement = new Achievement({
	name: "Use the konami code",
	points: 100,
	image: "assets/img/icons/compressed/treasure-chest.svg",
})
achievementSystem.register(konamiAchievement);


var code = new SecretCode({
	code: [38,38,40,40,37,39,37,39, "b", "a"],
	callback: showUnicorns,
});

function showUnicorns() {
	var bouncer = new Bouncer({element: ".header_logo", parent: ".header"});
	bouncer.start();
	konamiAchievement.achieve();
}


// KONAMI
var jossafossaAchievement = new Achievement({
	name: "Type 3X Jossafossa",
	points: 50,
	image: "assets/img/icons/compressed/computer.svg",
})
achievementSystem.register(jossafossaAchievement);


var code2 = new SecretCode({
	code: "jossafossajossafossajossafossa",
	callback: () => jossafossaAchievement.achieve(),
});


// SPACE
var spaceAchievement = new ProgressAchievement({
	name: "Tap space 100 times",
	points: 200,
	notification:true,
	value:0,
	target:100,
	image: "assets/img/icons/compressed/planets.svg",
});
achievementSystem.register(spaceAchievement);

let down = false;
document.addEventListener("keydown", function(e) {
	if (!down) {
		if (e.key === ' ' || e.key === 'Spacebar') {
			down = true;
		}		
	}
});
document.addEventListener("keyup", function(e) {
	if (down) {	
		if (e.key === ' ' || e.key === 'Spacebar') {
			down = false;
			spaceAchievement.incrementValue();
		}
	}	
});

spaceAchievement.onAchieved = function() {
	headerBackgrounds.chaos();
}





// HEADER CLICKER
achievementSystem.register(
	new ElementClickTargetAchievement({
		name: "click the header 1000 times",
		notification: true,
		points: 1000,
		image: "assets/img/icons/compressed/pray.svg",
		value: 0,
		target: 1000,
		element: ".header",
	})
)
achievementSystem.register(
	new ElementClickTargetAchievement({
		name: "click the header 400 times",
		notification: true,
		points: 400,
		image: "assets/img/icons/compressed/hands.svg",
		value: 0,
		target: 400,
		element: ".header",
	})
)
achievementSystem.register(
	new ElementClickTargetAchievement({
		name: "click the header 200 times",
		notification: true,
		points: 200,
		image: "assets/img/icons/compressed/brotherhood.svg",
		value: 0,
		target: 200,
		element: ".header",
	})
)
achievementSystem.register(
	new ElementClickTargetAchievement({
		name: "click the header 100 times",
		notification: true,
		points: 100,
		image: "assets/img/icons/compressed/win.svg",
		value: 0,
		target: 100,
		element: ".header",
	})
)
achievementSystem.register(
	new ElementClickTargetAchievement({
		name: "click the header 50 times",
		notification: true,
		points: 50,
		image: "assets/img/icons/compressed/touch.svg",
		value: 0,
		target: 50,
		element: ".header",
	})
)





// SCROLL ACHIEVEMENTS
var scrollAchievements = [];
scrollAchievements.push(
	new ProgressAchievement({
		name: "The Scrollmaster",
		description: "Scroll 2 km",
		notification: false,
		points: 1000,
		image: "assets/img/icons/compressed/rocket.svg",
		value: 0,
		target: 1000,
	})
)
scrollAchievements.push(
	new ProgressAchievement({
		name:"Scroll Wizard",
		description: "Scroll 800 m",
		notification: false,
		points: 400,
		image: "assets/img/icons/compressed/airplane.svg",
		value: 0,
		target: 400,
	})
)
scrollAchievements.push(
	new ProgressAchievement({
		name:"Active Scroller",
		description: "Scroll 400m",
		notification: false,
		points: 200,
		image: "assets/img/icons/compressed/cab.svg",
		value: 0,
		target: 200,
	})
)
scrollAchievements.push(
	new ProgressAchievement({
		name: "Casual Scroller",
		description: "Scroll 200 m",
		notification: false,
		points: 100,
		image: "assets/img/icons/compressed/bicycle.svg",
		value: 0,
		target: 100,
	})
)

scrollAchievements.push(
	new ProgressAchievement({
		name: "Wannabe Scroller",
		description: "Scroll 100 m",
		notification: false,
		points: 50,
		image: "assets/img/icons/compressed/roller.svg",
		value: 0,
		target: 50,
	})
)
for (let achievement of scrollAchievements) {
	achievementSystem.register(achievement);
}
var scrollElem = document.querySelectorAll(".content, body");

let scrollIndex = 0;

for (elem of scrollElem) {
	console.log(elem);	
	elem.addEventListener("scroll", e => {scroll(e)}, {passive: true});
}

function scroll(e) {
	scrollIndex++;
	if (scrollIndex % 10 === 0) {
		for (let achievement of scrollAchievements) {
			achievement.incrementValue();
		}			
	}
}



// VIEW ALL PROJECTS
achievementSystem.register(
	new ClickAllElementsAchievement({
		name: "view every project",
		notification: true,
		points: 300,
		image: "assets/img/icons/compressed/eye.svg",
		value: 0,
		target: 100,
		element: ".projects_item > a",
	})
)

// CLICK ALL MARKED ELEMENTS ON ABOUT
achievementSystem.register(
	new ClickAllElementsAchievement({
		name: "Click all marked elements in about",
		notification: true,
		points: 200,
		image: "assets/img/icons/compressed/mouse.svg",
		value: 0,
		target: 100,
		element: ".about p > i",
	})
)

achievementSystem.onUpdate = e => {
	console.log("wOW ACVHIEVEMENTS UPDATEDED", e);
};