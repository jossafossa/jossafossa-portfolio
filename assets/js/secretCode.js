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

class SecretCode {
	constructor(settings) {
		var defaultSettings = {
			code: false,
			callback: false,
			onKeyPress: false,
		}
		this.settings = extend(defaultSettings, settings);
		if (!this.settings["code"]) {
			throw new Error('Parameter code not found');
		}
		if (typeof this.settings["code"] != "string" && typeof this.settings["code"] != "object" ) {
			throw new Error("invalid type found for code: " + typeof this.settings["code"] + ". Expected string or array");
		};

		this.code = this.codeToArray(this.settings["code"]);
		this.callback = this.settings["callback"];
		this.onKeyPress = this.settings["onKeyPress"];
		this.down = false;
		this.codeQueue = [];

		// setup event
		document.addEventListener("keydown", e => {this.keyDown(e)}, false);
		document.addEventListener("keyup", e => {this.keyUp(e)}, false);
	}

	codeToArray(code) {
		var codeArray = [];
		if (typeof code == "string") {
			for (var i = 0; i < code.length; i++) {
				codeArray.push(code.charAt(i));
			}
		} else if (typeof code == "object") {
			for (var i = 0; i < code.length; i++) {
				codeArray.push(code[i]);
			}
		}
		return codeArray;
	}

	keyDown(e) {
    if(this.down) return;
    this.onKeyStroke(e);
	}

	keyUp(e) {
		this.down = false;
	}

	onKeyStroke(e) {
		this.codeQueue.push(e.keyCode);
		if (this.codeQueue.length > this.code.length) {
			this.codeQueue.shift();
		}
		this.triggerKeypressCallback();
		if (this.checkCodeArray()	) {
			this.triggerCallback();
		}		
	}

	triggerCallback() {
		this.callback();
	}

	triggerKeypressCallback() {
		if (this.onKeyPress) {
			this.onKeyPress();
		}
	}

	checkCodeArray() {
		// console.log(this.code, this.codeQueue);
		for (var i = 0; i < this.code.length; i++) {
			var codeChar = this.code[i];
			var queueChar = this.codeQueue[i];
			if (typeof codeChar == "string") {
				queueChar = String.fromCharCode(queueChar).toLowerCase();
			}
			if (codeChar != queueChar) {
				return false;
			}
			
		}
		return true;
	}

	getQueue() {
		return this.codeQueue;
	}
}