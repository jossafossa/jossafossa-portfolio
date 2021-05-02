class modeSwitcher {
    constructor(element, activeClass, defaultMode = true) {
        this.element = document.querySelectorAll(element);
        this.state = this.getDefaultMode();
        this.activeClass = activeClass;
        this.createClickEvent();
        this.setMode(defaultMode);
        this.timer = null;
    }

    getDefaultMode() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          return true;
        }
        return false;
    }

    createClickEvent() {
        console.log(this.element);
        self = this;
        for (let i = 0; i < this.element.length; i++) {
            console.log(i);
            this.element[i].addEventListener("click", e => this.onClick());
        }
    }

    onClick() {
        this.state = !this.state;
        this.setMode(this.state);
    }

    setMode(mode) {
        for (let i = 0; i < this.element.length; i++) {
            const element = this.element[i];
            element.checked = mode;
        }

        if (mode) {
            document.body.classList.add(this.activeClass);
        } else {            
            document.body.classList.remove(this.activeClass); 
        }

        var self = this;

        clearTimeout(this.timer);
        this.timer  = setTimeout(function() {self.stopTransition()}, 1000);
    }

    stopTransition() {
        document.body.classList.remove("transitioning");
    }


}

console.log("henk"); 