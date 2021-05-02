// import SecretCode from "./secretCode";

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
let header1000 = new ElementClickTargetAchievement({
	name: "click the header 1000 times",
	notification: false,
	points: 1000,
	image: "assets/img/icons/compressed/pray.svg",
	value: 0,
	target: 1000,
	element: ".header",
})
achievementSystem.register(header1000);

let header400 = new ElementClickTargetAchievement({
	name: "click the header 400 times",
	notification: false,
	points: 400,
	image: "assets/img/icons/compressed/hands.svg",
	value: 0,
	target: 400,
	element: ".header",
})
achievementSystem.register(header400);

let header200 = new ElementClickTargetAchievement({
	name: "click the header 200 times",
	notification: false,
	points: 200,
	image: "assets/img/icons/compressed/brotherhood.svg",
	value: 0,
	target: 200,
	element: ".header",
});
achievementSystem.register(header200);
let header100 = new ElementClickTargetAchievement({
	name: "click the header 100 times",
	notification: false,
	points: 100,
	image: "assets/img/icons/compressed/win.svg",
	value: 0,
	target: 100,
	element: ".header",
})
achievementSystem.register(header100);
let header50 = new ElementClickTargetAchievement({
	name: "click the header 50 times",
	notification: true,
	points: 50,
	image: "assets/img/icons/compressed/touch.svg",
	value: 0,
	target: 50,
	element: ".header",
});
achievementSystem.register(header50);

header50.addEventListener("achieved", () => {header100.notification = true});
header100.addEventListener("achieved", () => {header200.notification = true});
header200.addEventListener("achieved", () => {header400.notification = true});
header400.addEventListener("achieved", () => {header1000.notification = true});




// SCROLL ACHIEVEMENTS
let scrollAchievements = [];

let scroll5 = new ProgressAchievement({
	name: "The Scrollmaster",
	description: "Scroll 200 m",
	notification: false,
	points: 1000,
	image: "assets/img/icons/compressed/rocket.svg",
	value: 0,
	target: 200,
})
scrollAchievements.push(scroll5);
let scroll4 = new ProgressAchievement({
	name:"Scroll Wizard",
	description: "Scroll 80 m",
	notification: false,
	points: 400,
	image: "assets/img/icons/compressed/airplane.svg",
	value: 0,
	target: 80,
})
scrollAchievements.push(scroll4)
let scroll3 = new ProgressAchievement({
	name:"Active Scroller",
	description: "Scroll 40m",
	notification: false,
	points: 200,
	image: "assets/img/icons/compressed/cab.svg",
	value: 0,
	target: 40,
})
scrollAchievements.push(scroll3)
let scroll2 = new ProgressAchievement({
	name: "Casual Scroller",
	description: "Scroll 20 m",
	notification: false,
	points: 100,
	image: "assets/img/icons/compressed/bicycle.svg",
	value: 0,
	target: 20,
})
scrollAchievements.push(scroll2)


let scroll1 = new ProgressAchievement({
	name: "Wannabe Scroller",
	description: "Scroll 10 m",
	notification: true,
	points: 50,
	image: "assets/img/icons/compressed/roller.svg",
	value: 0,
	target: 10,
})
scrollAchievements.push(scroll1);

for(let achievement of scrollAchievements) {
	achievementSystem.register(achievement);
}

scroll4.addEventListener("achieved", () => scroll5.notification = true);
scroll3.addEventListener("achieved", () => scroll4.notification = true);
scroll2.addEventListener("achieved", () => scroll3.notification = true);
scroll1.addEventListener("achieved", () => scroll2.notification = true);


let scrollIndex = 0;
let prevScroll = 0;
window.addEventListener("scroll", e => scroll(e));

function scroll(e) {
	let amount = Math.abs(prevScroll - window.scrollY);
	scrollIndex += amount;
	prevScroll = window.scrollY;
	console.log(scrollIndex);
	if (scrollIndex > 3000) {
		scrollIndex = 0;
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

// CLICK ALL MARKED ELEMENTS ON ABOUT
	let bugAchievement = new Achievement({
		name: "Find a bug",
		points: 200,
		image: "assets/img/icons/compressed/mouse.svg",
	})
	let bug = document.querySelector(".easter-egg");
	if (bug) {
		bug.addEventListener("click", () => bugAchievement.achieve());
	} else {
		bugAchievement.achieve();
	}
	achievementSystem.register(bugAchievement);


// Achieve all achievements
let allAchievement = new Achievement({
	name: "Achieve all achievements",
	points: 200,
	image: "assets/img/icons/compressed/mouse.svg",
})
achievementSystem.register(allAchievement);

achievementSystem.onUpdate = e => {
	if (achievementSystem.getAchieved().length >= achievementSystem.achievements.length -1) {
		allAchievement.achieve();
	}
};