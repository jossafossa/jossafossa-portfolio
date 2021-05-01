
class Bulge {
  constructor(query) {
    this.radius = 250;
    this.elements = document.querySelectorAll(query);
    
    for (let element of this.elements) {
      let bulge = this.getElement();
      element.bulge = bulge;
      element.appendChild(bulge);
      element.classList.add("bulge-container");
      
      let position = window.getComputedStyle(element).getPropertyValue("position");
      if (!(position in ["absolute", "relative", "fixed"])) {
         element.style.position = "relative";
      }
      
    }
    
    document.addEventListener("mousemove", e => this.setPos(e));
    document.addEventListener("touchstart", e => this.setPos(e));
    document.addEventListener("touchend", e => this.setPos(e));
    document.addEventListener("mousedown", e => this.setPos(e));
    document.addEventListener("mouseup", e => this.setPos(e));
  }
  
  getElement() {
    let el = document.createElement("span");
    el.classList.add("bulge");
    return el;
  }
  
  setPos(e) {
    let x = e.clientX;
    let y = e.clientY;
    let radius = this.radius;
    for (let element of this.elements) {
      let box = element.getBoundingClientRect();
      if ( x - radius < box.right && x + radius > box.left && y - radius < box.bottom && y + radius > box.top ) {
        let relX = x - box.left;
        let relY = y - box.top;
        let bulge = element.bulge;
        this.hover(bulge, relX, relY);
        element.bulge.classList.add("is-active");
      } else {
        element.bulge.classList.remove("is-active");
      }
    }
  }
  
  hover(bulge, x, y) {
    // console.log(bulge, x, y)
    bulge.style.transform = `translate(${x}px, ${y}px )`;
  }
}




class Ripple {
  constructor(query) {
    this.elements = document.querySelectorAll(query);
    this.time = 1900;
    
    for (let element of this.elements) {
      element.addEventListener("click", e => {

        let x = e.clientX - element.offsetLeft;
        let y = e.clientY - element.offsetTop;
        console.log(e.clientY, box, element.offsetTop, element);
        this.ripples(element, x, y);
      })
      // element.addEventListener("mouseenter", e => {
      //   this.ripples(element, e, false)
      // })
      // element.addEventListener("mouseleave", e => {
      //   this.ripples(element, e, false)
      // })
    }
  }
  
  ripples(element, x, y, intensity=0.05, color="white", keep=false) {
    let bounce = true;
    let box = element.getBoundingClientRect();
    this.bounceOpacity = 0.2;
    element.classList.add("ripple-container");
    this.ripple(element, x, y, 1, intensity, color, keep);
    if (bounce) {
      for (let i = 0; i < 1; i++) {
        this.ripple(element, box.width*i + box.width*2 - x, y, this.bounceOpacity, intensity, color, keep);
        this.ripple(element, box.width*-i + -x, y, this.bounceOpacity, intensity, color, keep);
        this.ripple(element, x, box.height*i + box.height*2 - y, this.bounceOpacity, intensity, color, keep);
        this.ripple(element, x, box.height*-i + -y, this.bounceOpacity, intensity, color, keep);
      }
    }
  }
  
  ripple(element, x, y, t=1, intensity=0.05, color="white", keep = false) {
    let ripple = document.createElement("span");
    ripple.classList.add("ripple");
    let time = this.time;
    if (keep) {
      ripple.classList.add("no-fade");
      time;
    }
    element.appendChild(ripple);
    
    ripple.style.top = y + "px";
    ripple.style.left = x + "px";
    ripple.style.backgroundColor = color;
    ripple.style.setProperty("--opacity", intensity*t);
    
    setTimeout(e => {

      ripple.remove();
    }, time)
  }
}
