class toolTipController {
    constructor(selector) {
        this.selector = selector;
        this.elements = document.querySelectorAll(`[${selector}]`);

        this.events();
    }

    events() {
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].addEventListener("mouseenter", e => this.showtoolTip(this.elements[i]));
            this.elements[i].addEventListener("mouseleave", e => this.hidetoolTip(this.elements[i]));

            this.elements[i].addEventListener("touchstart", e => this.showtoolTip(this.elements[i]));
            this.elements[i].addEventListener("touchend", e => this.hidetoolTip(this.elements[i]));
        }
    }

    showtoolTip(element) {
        var text = element.getAttribute(this.selector);
        console.log(text);

        var boundingBox = element.getBoundingClientRect();
        console.log(boundingBox);

        var toolTip = document.createElement("span");
        toolTip.classList.add("tooltip");
        toolTip.innerHTML = text;
        document.body.append(toolTip);
        
        var width = element.clientWidth;
        var height = element.clientHeight;
        console.log(width, height);

        var x, y, dir;
        let scrollY = window.scrollY;
        console.log(boundingBox);
        if (boundingBox.left - toolTip.clientWidth / 2 < 0) {  
            x = boundingBox.right;
            y = boundingBox.top + scrollY + height / 2;
            dir = "right";
        } else if (boundingBox.right - toolTip.clientWidth / 2 > document.body.clientWidth) {
            x = boundingBox.left;
            y = boundingBox.top + scrollY + height / 2;
            dir = "left";
        } else {
            x = boundingBox.left + width / 2;
            y = boundingBox.top + scrollY;
            dir = "top";
        }

        console.log(document.body.clientWidth);

        this.moveToolTip(toolTip, x, y, dir);
    }

    moveToolTip(element, x, y, dir) {
        console.log(x, y);
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        element.classList.add("tooltip-" + dir);
    }

    hidetoolTip(element) {
        console.log("hidng");
        document.body.removeChild(document.body.getElementsByClassName("tooltip")[0]);
    }
}