class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    mult(pos) {
        return new Vector(
            this.x * pos.x,
            this.y * pos.y
        )
    }

    add(pos) {
        return new Vector(
            this.x + pos.x,
            this.y + pos.y
        )
    }

    sub(pos) {
        return new Vector(
            this.x - pos.x,
            this.y - pos.y
        )
    }

    diff(pos) {
        return new Vector(
            Math.abs(pos.x - this.x),
            Math.abs(pos.y - this.y) 
        )
    }

    center(pos) {
        let offset = this.diff(pos);
        return new Vector(
            this.x + offset.x / 2,
            this.y + offset.y / 2,
        )

    }
}

class EventManager {
    constructor(element) {
        this.element = element;
        this.onDrag = (e) => {};
        this.onDragStart = (e) => {};
        this.onDragEnd = (e) => {};
        this.onClick = (e) => {};

        this.dpi = window.devicePixelRatio;
        
        
        // mouse 
        this.down = false;
        let dragging = false;
        this.lastTouch;

        let click = (e) => {
            if (!dragging) this.onClick(this.getPos(e));
        }
        let mousedown = (e) => {
            this.down = true;
            this.start = [e.clientX, e.clientY];
            this.target = e.target;
        }
        let mouseup = (e) => {
            this.down = false; 
            if (dragging) this.onDragEnd(this.getPos(e)) 
            if (e instanceof TouchEvent) {
                mousemove(e);
            }
        }
        let mousemove = (e) => {
            if (this.down) {
                if (!dragging) this.onDragStart(this.getPos(e));
                dragging = true;
                this.onDrag(this.getPos(e));
            } else {
                dragging = false;
            }
        }
        
        // mobile
        this.element.addEventListener("touchstart", mousedown);
        this.element.addEventListener("touchmove", click);
        window.addEventListener("touchend", mouseup);
        window.addEventListener("touchcancel", mouseup);
        window.addEventListener("touchmove", mousemove);

        // desktop
        this.element.addEventListener("mousedown", mousedown);
        this.element.addEventListener("click", click);
        window.addEventListener("mouseup", mouseup);
        window.addEventListener("mousemove", mousemove);
    }

    getPos(e) {
        if ( e instanceof TouchEvent ) {
            let touches = e.touches;

            if (touches.length > 0) {
                this.lastTouch = touches[0];
                for (let touch of touches) {
                    return this.getRelPos(touch);
                }
            } else {
                return this.getRelPos(this.lastTouch);
            }
        }
        return this.getRelPos(e);
    }

    getRelPos(e) {
        return {
            x: e.clientX - this.start[0],
            y: e.clientY - this.start[1],
            target: this.element,
        }
    }
}