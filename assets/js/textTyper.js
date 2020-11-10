
/**
 * merges 2 multidimensional arrays
 * @return {array} 
 * @src https://stackoverflow.com/questions/11197247/javascript-equivalent-of-jquerys-extend-method
 */
function extend(){
  for(var i=1; i<arguments.length; i++)
    for(var key in arguments[i])
      if(arguments[i].hasOwnProperty(key))
        arguments[0][key] = arguments[i][key];
  return arguments[0];
}

class TextTyper {
	constructor(settings = {}) {
		var default_settings = {
			element: ".textTyper",
			typeSpeed:50,
			minTypeSpeed: 100, 
			removeSpeed: 200,
			removeSpeedMult:20,
			removeSpeedMax: 40,
		}
		this.settings = extend(default_settings, settings);

		this.elementQuery = this.settings["element"];
		this.elements = document.querySelectorAll(this.elementQuery);
		this.typeSpeed = this.settings["typeSpeed"];
		this.minTypeSpeed = this.settings["minTypeSpeed"];
		this.removeSpeed = this.settings["removeSpeed"];
		this.removeSpeedMult = this.settings["removeSpeedMult"];
		this.removeSpeedMax = this.settings["removeSpeedMax"];
		// console.log(this.elements);

		this.text = "";

	}
 
	getDistance(a, b) {
		var keyboard = [
			["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"],
			["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"],
			["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"]
		]
		var char = "";
		var aPos = [0, 0];
		var bPos = [0, 0];
		for (var row in keyboard) {
			for(var column in keyboard[row]) {
				var char = keyboard[row][column];
				if (char == a) {
					aPos = [row, column];
				}
				if (char == b) {
					bPos = [row, column];
				}
			}
		}
		var dist = 0;
		for (var i = 0; i < 2; i++) {
			dist += Math.abs(aPos[i] - bPos[i]);
		}

		return dist;
	}

	updateText() {
		for (var i = 0; i < this.elements.length; i++) {
			var element = this.elements[i];
			var displayText = this.text;
			if (displayText[displayText.length - 1] == " ") {
				displayText = displayText.substring(0, displayText.length -1) + "&nbsp;";
			}
			if (displayText.length > 0) {				
				element.innerHTML = displayText;
			} else {				
				element.innerHTML = "&nbsp;";
			}
		}
	}

	setText(text, callback = false) {
		if (text.length > 0) {
			this.setLetter(text[0]);
			var a = text[0];
			var b = text[1];		
			var timeout = this.getDistance(a, b) * this.typeSpeed;
			if (timeout < this.removeSpeedMax) {
				timeout = this.removeSpeedMax;
			}
			var self = this;
			setTimeout(function() { 
				self.setText(text.substring(1, text.length), callback); 
			}, timeout); 
		}	else {
			if (callback !== false) {
				callback();
			}
		}	
	}

	setLetter(letter) {
		this.text += letter;
		this.updateText();
	}

	removeText(callback = false, index = 0) {
		if (this.text.length > 0) {
			this.removeLetter();

			var timeout = this.removeSpeed - index * this.removeSpeedMult;

			if (timeout < this.removeSpeedMax) {
				timeout = this.removeSpeedMax;
			}

			// console.log(timeout, index);

			// console.log(timeout);
			var self = this;
			setTimeout(function() { 
				self.removeText(callback, index+1); 
			}, timeout); 
		}	else {
			if (callback !== false) {				
				callback();
			}
		}
	}

	removeLetter() {
		this.text = this.text.substring(0, this.text.length - 1);
		this.updateText();
	}

}


