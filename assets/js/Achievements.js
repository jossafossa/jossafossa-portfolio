/**
 * The main achievement class
 */
class AchievementSystem {

	/**
	 * Create a new AchievementSystem
	 * @param  {AchievementDisplay} achievementDisplay Handles the rendering of the list of achievements
	 * @param  {Array}              achievements       Optional initial achievements to add to the display
	 */
	constructor(achievementDisplay, achievements = []) {
		this.notification = new Notification();
		this.achievementDisplay = achievementDisplay;
		this.achievements = achievements; 
		this.onUpdate = function(){};
	}

	/**
	 * Register an Achievement
	 * @param {Achievement} achievement The Achievement
	 */
	register(achievement) {
		achievement.setRoot(this);
		this.achievements.push(achievement);
		this.achievementDisplay.add(achievement);
	}

	/**
	 * Get all Achievements
	 * @return {Array.<Achievement>} An array containing all registered Achievements
	 */
	getAll() {
		return this.achievements;
	}

	/**
	 * Get all achieved achievements
	 * @return {Array.<Achievement>} A list of all the achieved achievements
	 */
	getAchieved() {
		return this.getAchievementsByState(true);
	}

	/**
	 * Get all the unachieved achievements
	 * @return {Array.<Achievement>} A list of all the unachieved achievements
	 */
	getUnachieved() {
		return this.getAchievementsByState(false);
	}

	/**
	 * Get all the registered achievements with a specific state
	 * @param  {boolean} state 				The state of the achievements
	 * @return {Array.<Achievement>}	A list of all the achievement with the specific state
	 */
	getAchievementsByState(state) {
		let found = [];
		for (let i = 0; i < this.achievements.length; i++) {
			let achievement = this.achievements[i];
			if (achievement.achieved === state) {
				found.push(achievement);
			} 
		}
		return found;
	}

	/**
	 * Removes the progress of all achievements
	 */
	resetAchievements() {
		for (let i = this.achievements.length - 1; i >= 0; i--) {
			this.achievements[i].removeCookie();
			this.achievements[i].reset();
			this.update(this.achievements[i]);
		}
	}

	/**
	 * Updates the achievement display
	 */
	update(achievement) {
		this.achievementDisplay.update(achievement);
		this.onUpdate(achievement);
	}


	/**
	 * 
	 */
	notify(string) {
		this.notification.showText(string);
	}


	praise(string, image) {		
		this.notification.showText(string, image, ["is-large"]);
	}


}


//------------------------------------------------------------------------------------//


/**
 * Takes care of the rendering of the Achievements
 */
class AchievementDisplay {

	/**
	 * Create a new achievement display
	 * @param {string} element Query selector for the element where the achievements are placed in.
	 */
	constructor(element) {
		this.element = document.querySelector(element);
		this.achievements = [];
	}

	/**
	 * add an achievement to the display
	 * @param {Achievement} achievement The achievement to add to the display
	 */
	add(achievement) {
		this.achievements.push(achievement);
		this.element.insertBefore(achievement.rowElement, this.element.firstChild);
		achievement.rowElement.classList.add("achievements_row");

		this.drawRow(achievement);

	}


	drawRow(achievement) {
		achievement.rowElement.innerHTML = "";
		this.updateState(achievement);

		let image = document.createElement("img");
		image.classList.add("achievement-image");
		image.setAttribute("src", achievement.image);
		image.setAttribute("alt", achievement.name);
		achievement.rowElement.appendChild(image);

		let title = document.createElement("div");
		title.classList.add("achievement-title");
		title.innerHTML = achievement.name;
		achievement.rowElement.appendChild(title);

		let progress = document.createElement("div");
		progress.classList.add("achievement-progress");
		progress.innerHTML = achievement.getProgress();
		achievement.rowElement.appendChild(progress);

		// let points = document.createElement("div");
		// points.innerHTML = achievement.points;
		// achievement.rowElement.appendChild(points);
	}

	updateState(achievement) {		
		if (achievement.achieved) {
			achievement.rowElement.classList.add("achieved");
		} else {			
			achievement.rowElement.classList.remove("achieved");
		}
	}

	updateProgress(achievement) {
		let progress = achievement.rowElement.querySelector(".achievement-progress");
		progress.innerHTML = achievement.getProgress();
	}

	/**
	 * Update an achievement which is already registered in the display
	 * @param  {Achievement} achievement The registered achievement
	 */
	update(achievement) {		
		this.updateProgress(achievement);
		this.updateState(achievement);
	}
}


//------------------------------------------------------------------------------------//


/**
 * The simplest form of achievement
 */
class Achievement {

	/**
	 * create an Achievement
	 * @param {Object} 	settings 					An object containing all the settings for the achievements
	 * @param {string} 	settings.name 		The display name of the achievement
	 * @param {number} 	settings.points 	The number of points the achievement is worth
	 * @param {string} 	settings.image 		A display image for the achievement
	 * @param {boolean} settings.achieved An optional state for the achievement (true = achieved; false = unachieved)
	 */
	constructor(settings) {
		this.rowElement = document.createElement("div");
		this.settings = settings;
		this.name 		= settings.name;
		this.slug 		= this.getSlug(this.name);
		this.cookie 	= this.getCookie();
		this.points 	= settings.points;
		this.image 		= settings.image;
		this.achieved = this.hasCookieField("achieved") ? this.cookie.achieved : false;
		this.ready 		= false;

		this.setCookieField("achieved", this.achieved);

		this.onReady = () => {};
		this.onAchieved = () => {};
		this.onUnachieved = () => {};

		if (this.achieved) {
			this.onAchieved();
		}
	}


	addEventListener(type, callback) {
		switch (type) {
			case "ready":
				this.onReady = callback;
				break;
			case "achieved":
				this.onAchieved = callback;
				if (this.achieved) callback();
				break;
			case "unachieved":
				this.onUnachieved = callback;
				if (!this.achieved) callback();
				break;
		}


	}

	reset() {		
		this.removeCookie();
		this.achieved = false;
	}
	

	/**
	 * Set the AchievementSystem of the achievement. Usually gets triggered by an AchievementSystem object itself when registering an achievement
	 * @param {AchievementSystem} root The root AchievementSystem object
	 */
	setRoot(root) {
		this.root = root;
		this.activate();
	}

	/**
	 * Activates the achievement 
	 */
	activate() {
		this.ready = true;
		this.onReady();
	}


	update() {
		this.root.update(this);
	}

	/**
	 * Sets the status of the achievement to achieved
	 */
	achieve() {
		if (!this.achieved) {
			this.achieved = true;
			this.setCookieField("achieved", true);
			this.onAchieved();
			this.update();
			this.root.praise("new achievement: " + this.name, this.image);
		}		
	}

	/**
	 * Sets the status of the achievement to unachieved
	 */
	unachieve() {
		this.achieved = false;
		this.onUnachieved();
		this.update();
	}

	/**
	 * Return the achievement to its orginal state
	 */
	reset() {
		this.unachieve();
		this.setCookie({achieved: false});
	}

	/**
	 * Get a string that represents the state of the achievement
	 * @return {String} The state of the achievement
	 */
	getProgress() {
		return this.achieved ? "achieved" : "unachieved";
	}

	/**
	 * Gets the state of the achievement
	 * @return {boolean} Achievement state
	 */
	getState() {
		return this.achieved;
	}

	/**
	 * Generates a slug based on a string
	 * @param  {string} str The input string
	 * @return {string}     The input string without spaces and illegal characters
	 */
	getSlug(str) {
	  str = str.replace(/^\s+|\s+$/g, ""); // trim
	  str = str.toLowerCase();

	  // remove accents, swap ñ for n, etc
	  let from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
	  let to = "aaaaaaeeeeiiiioooouuuunc------";

	  for (let i = 0, l = from.length; i < l; i++) {
	    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
	  }

	  str = str
	    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
	    .replace(/\s+/g, "-") // collapse whitespace and replace by -
	    .replace(/-+/g, "-") // collapse dashes
	    .replace(/^-+/, "") // trim - from start of text
	    .replace(/-+$/, ""); // trim - from end of text

	  return str;
	}

	/**
	 * Save the progress in a cookie
	 * @param {Object} data The progress data
	 */	
	setCookie(data) {
		// console.log("setting " + JSON.stringify(data), data);
		localStorage.setItem(this.slug, JSON.stringify(data));
	}


	setCookieField(key, value) {
		let cookie = this.getCookie() != undefined ? this.getCookie() : {};	
		cookie[key] = value;
		// console.log(cookie);
		this.setCookie(cookie);
	}

	/**
	 * Remove a cookie
	 */	
	removeCookie(data) {
		localStorage.removeItem(this.slug);
	}

	/**
	 * Get the value of the registered cookie
	 * @return {Object} The content of the cookie
	 */
	getCookie() {		
		return JSON.parse(localStorage.getItem(this.slug));
	}

	/**
	 * Check if there is a cookie registered for this achievement
	 * @return {Boolean} If the cookie is present
	 */
	hasCookie() {
		if (this.getCookie() != undefined) {
			return true;
		} else {
			return false;
		} 	
	}


	hasCookieField(field) {
		if (this.hasCookie() ) {
			return (field in this.getCookie());
		}
		return false;
	}
}


//------------------------------------------------------------------------------------//


/**
 * An Achievement whit a counter and a goal to reach
 */
class ProgressAchievement extends Achievement {

	/**
	 * create an Achievement
	 * @param {Object} 	settings 					An object containing all the settings for the achievements
	 * @param {string} 	settings.name 		The display name of the achievement
	 * @param {number} 	settings.points 	The number of points the achievement is worth
	 * @param {string} 	settings.image 		A display image for the achievement
	 * @param {boolean} settings.achieved An optional state for the achievement (true = achieved; false = unachieved)
	 * @param {number} 	settings.value 		Starting value
	 * @param {number} 	settings.target 	Target value
	 */
	constructor(settings) {
		super(settings);
		this.cookie = this.getCookie();
		this.value = (this.hasCookieField("value") ? this.cookie.value : settings.value);
		this.target = (this.hasCookieField("target") ? this.cookie.target : settings.target);
		this.notification = settings.notification;

		// console.log(this.hasCookieField("value"));

		this.setCookieField("value", this.value);		
		this.setCookieField("target", this.target);
	}


	/**
	 * resets the target and 
	 * @return {[type]} [description]
	 */
	reset() {		
		this.unachieve();
		this.value = this.settings.value;
		this.target = this.settings.target;

		this.setCookie({achieved: false, value: this.value, target: this.target});
	}


	/**
	 * @override
	 */
	activate() {		
		// this.checkValue();
	}

	/**
	 * Update the value of the achievement
	 * @param {number} value The value
	 */
	setValue(value) {
		if (!this.getState()) {	
			this.setCookieField("value", this.value);		
			this.value = value;
			this.checkValue();
		}
	}

	/**
	 * Increment the value of the achievement by one
	 */
	incrementValue() {
		if (!this.getState()) {			
			this.value++;
			this.checkValue();
		}
	}

	/**
	 * Check and update the state of the achievement
	 */
	checkValue() {
		console.log(this.notification);
		if (this.notification) {			
			this.root.notify(this.name + ": " + this.getProgress());
		}
		if (this.value >= this.target && !this.getState()) {
			this.achieve();
		} 
		// console.log("setting wrong cookie :((");
		this.setCookieField("value", this.value );
		
		this.update();
	}

	/**
	 * @override
	 */
	getProgress() {
		return this.value + " out of " + this.target;
	}
}


class ElementClickTargetAchievement extends ProgressAchievement {
	constructor(settings) {		
		super(settings);
		this.elements = document.querySelectorAll(settings.element);

		for (let element of this.elements) {
			element.addEventListener("click", () => this.incrementValue());
		}
	}
}

class ClickAllElementsAchievement extends ProgressAchievement {
	constructor(settings) {		
		super(settings);
		this.cookie = this.getCookie();
		this.elements = document.querySelectorAll(settings.element);
		this.target = this.elements.length;
		this.clicked = (this.hasCookieField("clicked") ? this.cookie.clicked : []);
		this.elements.forEach(
			(element, index) => element.addEventListener("click", (e) => this.saveElement(e, index))
		)
	}

	reset() {		
		this.unachieve();
		this.clicked = [];
		this.value = this.settings.value;
		this.target = this.elements.length;

		this.setCookie({achieved: false, value: this.value, target: this.target, clicked: this.clicked});
	}

	saveElement(event, index) {
		if (!this.clicked.includes(index)) {
			this.clicked.push(index);
			this.setValue(this.clicked.length);
			this.setCookieField("clicked", this.clicked);
		}
	}

	/**
	 * Check and update the state of the achievement
	 */
	checkValue() {
		if (this.notification) {			
			this.root.notify(this.getProgress());
		}
		if (this.value >= this.target && !this.achieved) {
			this.achieve();
		} 
		// console.log("settings cookie");
		this.setCookieField("value", this.value);
		
		this.update();
	}
}


////////////////////////////////////////////////
// test setup

// setInterval(() => achievement2.incrementValue(), 100);