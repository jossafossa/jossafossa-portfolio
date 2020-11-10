class Dir {
  constructor(elements, children) {    
    this.children = children;
		this.removeAnimTimeout = null;
    this.pos = {x: 0, y: 0};
    this.prevPos = {x: 0, y: 0};
    this.elements = document.querySelectorAll(elements);
    this.mobile = (window.innerWidth < 640) ? true : false;
    console.log(elements);
    
    if (!this.mobile) {
	    // register global move event
	    document.addEventListener("mousemove", event => {this.move(event.clientX, event.clientY)});
	    
	    // register element events
	    this.elements.forEach(element => {
	      element.addEventListener("mouseenter", event => {this.enter(element, event)});
	      element.addEventListener("mouseleave", event => {this.leave(element, event)});
	    })  
    }
    
    
    // custom css
		var css = document.createElement("style");
		css.innerHTML = ".animating {transition:.2s;}";
		document.head.appendChild(css);
  }
	  
  move(x, y) {
    this.prevPos = {x: this.pos.x, y: this.pos.y};
    this.pos.x = x;
    this.pos.y = y;
  }
  
  getEnterDir(element, oldPos) {
    let box = element.getBoundingClientRect();
    let right = box.width + box.left;
    let left = box.left;
    let top = box.top;
    let bottom = box.height + box.top;
    console.log(oldPos, right);
    if(right <= oldPos.x) {
      return "right";
    } else if(left >= oldPos.x) {
      return "left";
    } else {
      if (top >= oldPos.y) {
        return "top";
      } else {
        return "bottom";
      }
    }
  }
  
  getDir(element, pos) { 
    let box = element.getBoundingClientRect();
    let offset = {
      right: Math.abs(box.width + box.left - pos.x),
      left: Math.abs(box.left - pos.x),
      top: Math.abs(box.top - pos.y),
      bottom: Math.abs(box.height + box.top - pos.y)      
    }
    let min = Object.keys(offset).reduce(function (r, a, i) {
        return !i || +offset[a] < +offset[r] ? a : r;
    }, undefined);
    console.log(min);
    switch(min) {
      case "right":
        return [1, 0];
        break;
      case "left":
        return [-1, 0];
        break;
      case "top":
        return [0, -1];
        break;
      case "bottom":
        return [0, 1];
        break;
    }
  }
  
  getLeaveDir(element, newPos) {
    let box = element.getBoundingClientRect();
    let right = box.width + box.left;
    let left = box.left;
    let top = box.top;
    let bottom = box.height + box.top;
    console.log(newPos.x, right);
    if(right <= newPos.x) {
      return [1, 0];
    } else if(left >= newPos.x) {
      return [-1, 0];
    } else {
      if (top >= newPos.y) {
        return [0, -1];
      } else {
        return [0, 1];
      }
    }
  }
  
  enter(element, e) {
    console.log("enter");
    clearTimeout(this.removeAnimTimeout);
		var dir = this.getDir(element, this.pos);
		this.setState(element, dir);		
		this.setAnimateState(element, false);
		var self = this;
    clearTimeout(this.removeAnimTimeout);
		this.removeAnimTimeout = setTimeout(function() {	
			self.setAnimateState(element, true);
			self.setState(element, [0,0]);
		}, 20);
  }
  
  leave(element, e) {
    console.log("leave");
    var dir = this.getDir(element, this.pos);
    this.setState(element, dir);
		var self = this;
    clearTimeout(this.removeAnimTimeout);
		this.removeAnimTimeout = setTimeout(function() {				
			self.setAnimateState(element, false);
		}, 200);
  }
  
  setState(element, dir) {
    let children = element.querySelectorAll(this.children);
		for (var i = 0; i < children.length; i++) {
			children[i].style.transform = "translate3d(" + dir[0] * 100 + "%, " + dir[1] * 100 + "%, 0)";
		}
	}

	setAnimateState(element, state) {
    let children = element.querySelectorAll(this.children);
		for (var i = 0; i < children.length; i++) {
			if (state) {
				children[i].classList.add("animating");
			} else {
				children[i].classList.remove("animating");
			}
		}
		
	}
  
}
