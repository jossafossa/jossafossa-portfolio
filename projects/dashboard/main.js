class AppWindow {
    constructor(root, title = "Window") {
        this.root = root;
        this.title = title;
        this.position = {x: 0, y: 0};
        this.height = 500;
        this.width = 500;
        this.minWidth = 200;
        this.minHeight = 150;
        this.isMaximized = false;
        this.isMinimized = true;
        this.animationSpeed = 300;
        this.order = 0;

        this.events = {
            drag: [],
            dragStart: [],
            click: [],
            resize: [],
            resizeStart: [],
            update: [],
            close: [],
            open: [],
            minimize: [],
            maximize: [],
        }

        this.app = this.setupRoot();
        this.contentElement = this.app.querySelector(".app-window-content > section");
        
        // header setup
        let header = this.app.querySelector(".app-window-content > header");
        let closeButton = this.app.querySelector(".app-window-content > header .close");
        let minimizeButton = this.app.querySelector(".app-window-content > header .minimize");
        let maximizeButton = this.app.querySelector(".app-window-content > header .maximize");
        
        if (closeButton) {
            closeButton.addEventListener("click", e => this.close(e));
        }
        if (minimizeButton) {
            minimizeButton.addEventListener("click", e => this.minimize(e));
        }
        if (maximizeButton) {
            maximizeButton.addEventListener("click", e => this.maximize(e));
        }

        // double click to maximize 
        let clicked = false;
        header.addEventListener("click", (e) => {
            if (clicked) {
                this.maximize(e);
            }
            clicked = true;
            setTimeout(() => {
                clicked = false;
            },300)
        })


        // click event
        this.app.addEventListener("click", e => {
            this.trigger("click", this);
        })


        // drag
        let headerEvents = new EventManager(header);

        let dragOffset = new Vector(0, 0);
        headerEvents.onDragStart = e => {
            let appBox = this.app.getBoundingClientRect();
            this.startPos = {x: appBox.x, y: appBox.y};
            dragOffset.x = e.clientX - appBox.x;
            dragOffset.y = e.clientY - appBox.y;
            this.app.classList.add("is-dragging");

            this.trigger("dragStart", this);
        }

        headerEvents.onDrag = e => {
            let x = this.startPos.x+e.x;
            let y = this.startPos.y+e.y;

            // fix out of bounds
            this.position.x = (x + this.width < window.innerWidth) ? x : window.innerWidth - this.width;
            this.position.x = (x < 0) ? 0 : this.position.x;
            
            this.position.y = (y + this.height < window.innerHeight) ? y : window.innerHeight - this.height;
            this.position.y = (y < 0) ? 0 : this.position.y;
            
            this.trigger("drag", this);

            this.updatePos();
        }

        headerEvents.onDragEnd = e => {
            this.app.classList.remove("is-dragging");
        }

        // resize
        let handles = this.app.querySelectorAll("[data-resize]");
        for (let handle of handles) {
            let event = new EventManager(handle);
            let resizeDir = handle.dataset.resize.split(" ");

            event.onDragStart = e => {
                let appBox = this.app.getBoundingClientRect();
                this.startPos = {x: appBox.x, y: appBox.y};
                this.startSize = {width: this.width, height: this.height};
                this.app.classList.add("is-resizing");

                this.trigger("resizeStart", this);
            }
            event.onDrag = e => {
                this.disableMaximized();

                let target = e.target.classList;
                if (resizeDir.includes("top")) {
                    this.resizeTop(e.y);
                }
                if (resizeDir.includes("bottom")) {
                    this.resizeBottom(e.y);
                }
                if (resizeDir.includes("left")) {
                    this.resizeLeft(e.x);
                }
                if (resizeDir.includes("right")) {
                    this.resizeRight(e.x);
                }
                this.trigger("resize", this);
                this.updatePos();
            }

            event.onDragEnd = e => {
                this.app.classList.remove("is-resizing");
            }
        }
        
        this.updatePos();
    }

    setupRoot() {
        let window = document.createElement("article");
        window.classList.add("app-window");
        window.innerHTML = `
        <div class="move-tools">
            <span class="handle handle-top" data-resize="top"></span>
            <span class="handle handle-bottom" data-resize="bottom"></span>
            <div class="handle-column">
                <span class="handle handle-top-left" data-resize="top left"></span>
                <span class="handle handle-left" data-resize="left"></span>
                <span class="handle handle-bottom-left" data-resize="bottom left"></span>
            </div>
            <div class="handle-column">
                <span class="handle handle-top-right" data-resize="top right"></span>
                <span class="handle handle-right" data-resize="right"></span>
                <span class="handle handle-bottom-right" data-resize="bottom right"></span>
            </div>
        </div>
        <div class="app-window-content">
            <header>
                <menu>
                    <button class="close"></button>
                    <button class="minimize"></button>
                    <button class="maximize"></button>
                </menu>

                <h2>${this.title}</h2>
            </header>
            <section></section>
            <footer></footer>
        </div>`;
        this.root.appendChild(window);
        return window;
    }

    on(event, callback) {
        if (event in this.events) {
            this.events[event].push(callback);
        }
    }

    trigger(event, e = {}) {
        for(let callback of this.events[event]) {
            callback(e);
        }
    }

    setOrder(order) {
        this.order = order;
        this.app.style.zIndex = order;
    }

    resizeTop(amount) {
        let height = this.startSize.height - amount
        let y = this.startPos.y + amount;

        if (height >= this.minHeight) {
            this.height = height;
            if (y < 0) {
                y = 0;
                this.height = this.startPos.y + this.startSize.height;
            }
        } else {
            this.height = this.minHeight;
            y = this.startPos.y + this.startSize.height - this.minHeight;
        }
        this.position.y = y
        
    }
    
    resizeBottom(amount) {
        let height = this.startSize.height + amount;
        
        this.height = (height >= this.minHeight) ? ((height+this.startPos.y > window.innerHeight) ? window.innerHeight - this.startPos.y : height) : this.minHeight;     
    }
    
    resizeLeft(amount) {
        let width = this.startSize.width - amount
        let x = this.startPos.x + amount;

        if (width >= this.minWidth) {
            this.width = width;
            this.position.x = x;

            if (x < 0) {
                this.position.x = 0;
                this.width = this.startPos.x + this.startSize.width;
            }
        } else {
            this.width = this.minWidth;
            this.position.x = this.startPos.x + this.startSize.width - this.minWidth;
        }  
    }
    
    resizeRight(amount) {
        let width = this.startSize.width + amount;
        this.width = (width >= this.minWidth) ? ((width+this.startPos.x > window.innerWidth) ? window.innerWidth - this.startPos.x : width) : this.minWidth;     
    }

    updatePos() {
        this.app.style.transform = `translate3d(${this.position.x}px, ${this.position.y}px, 0)`;
        this.app.style.width = this.width + "px";
        this.app.style.height = this.height + "px";
        this.trigger("update", this);
    }

    async animateTo(transformTo, time = null) {
        // getting bigger or getting smaller
        let staticWidth = (this.width < transformTo.width) ? transformTo.width : this.width;
        let staticHeight = (this.height < transformTo.height) ? transformTo.height : this.height;
        this.makeStatic(staticWidth, staticHeight);

        await sleep(100);


        time = (time !== null) ? time : this.animationSpeed;
        this.app.style.transition = time/1000 + "s ease";
        this.position = transformTo.pos;
        this.width = transformTo.width;
        this.height = transformTo.height;
        this.updatePos();
        
        await sleep(time);
        this.app.style.transition = null;
        this.makeDynamic();
    }

    fadeIn() {
        this.app.classList.add("is-visible");
        this.isVisible = true;
    }

    fadeOut() {
        this.app.classList.remove("is-visible");
        this.isVisible = false;
    }

    makeStatic(width = null, height = null) {
        width = width ? width : this.contentElement.offsetWidth;
        height = height ? height : this.contentElement.offsetHeight;
        console.log(width, height);
        this.contentElement.style.width = width + "px";
        this.contentElement.style.height = height + "px";
        
    }

    makeDynamic() {
        this.contentElement.style.width = null;
        this.contentElement.style.height = null;
    }

    close() {
        this.trigger("close", this);
        this.minimize();
        // this.unloadContent();
    }

    async open(transformFrom, transformTo = this.centerPos, time = null) {
        this.trigger("open", this);
        console.log(this.isMinimized);
        if (this.isMinimized || !this.isVisible) {
            this.isMinimized = false;
            this.app.classList.remove("is-minimized");
            this.app.style.transform = transformFrom.transform;
            this.app.style.width = transformFrom.width + "px";
            this.app.style.height = transformFrom.height + "px";
            let position = this.originalPosition ? this.originalPosition : transformTo;
            this.width = position.width;
            this.height = position.height;
            this.position = {x: position.x, y: position.y};

            this.closedPosition = transformFrom;

            this.animateTo(position, time);
            // this.loadContent();

            await sleep(100);

            this.fadeIn();

        }
    }

    async minimize() {
        console.log("minimize");
        if (!this.isMinimized) {
            this.trigger("minimize", this);
            this.originalPosition = new Transform(this.position, this.width, this.height);
            this.animateTo(
                this.closedPosition
            ).then(e => {
                this.app.classList.add("is-minimized");
                this.isMinimized = true;
                
            });
            await sleep(100);
            this.fadeOut();
        }
    }

    maximize() {
        if (!this.isMaximized) {
            this.trigger("maximize", this);
            this.originalPosition = new Transform(this.position, this.width, this.height);
            this.animateTo(
                new Transform({x: 0, y: 0}, window.innerWidth, window.innerHeight)
            ).then(e => {
                this.app.classList.add("is-maximized");
                this.isMaximized = true;
            });
        } else {
            this.disableMaximized();
            this.animateTo(
                this.originalPosition
            ).then(e => {
            });
        }
    }

    disableMaximized() {
        if (this.isMaximized) {
            this.isMaximized = false;
            this.app.classList.remove("is-maximized");
        }
    }
}

class ContentAppWindow extends AppWindow {
    constructor(root, title = "Window", ajaxContent, iframe = false) {
        super(root, title);
        this.ajaxContent = ajaxContent;
        this.iframe = iframe;
        this.loaded = false;

        this.on("open", e => {this.loadContent()});
        this.on("close", e => {this.unloadContent()});
    }

    async loadContent() {
        if (this.iframe) {
            if (!this.loaded) {
                let frame = document.createElement("iframe");
                frame.src = this.ajaxContent;
                this.contentElement.innerHTML = "";
                this.contentElement.appendChild(frame);
                this.loaded = true;
            }
        } else {
            let content = await fetch(this.ajaxContent);
            let html = await content.text();
            this.contentElement.innerHTML = html;
        }
    }

    unloadContent() {
        this.contentElement.innerHTML = "";
        this.loaded = false;
    }
}

class SettingsAppWindow extends AppWindow {
    constructor(root, title = "Window") {
        super(root, title);
    }
}

class Transform {
    constructor(pos, width, height) {
        this.pos = pos;
        this.x = pos.x;
        this.y = pos.y;
        this.width = width;
        this.height = height;
        this.transform = `translate3D(${pos.x}px, ${pos.y}px, 0)`;
    }
}


class Menu {
    constructor(root) {
        this.root = document.querySelector(root);
        this.menuItems = [];
    }

    addItem(menuItem) {
        this.menuItems.push(menuItem);
        this.root.appendChild(menuItem.getElement());
    }
}

class MenuItem {
    constructor(title, image, appWindow) {
        this.title = title;
        this.image = image;
        this.appWindow = appWindow;

        // setup element
        this.root = document.createElement("li");
        this.root.innerHTML = `
            <div class="app">
                <figure>
                    <img class="rounded" src="${this.image}" alt="" title="" style="">
                </figure>
                <span>${this.title}</span>
            </div>
        `;

        // events
        let clicked = false;
        this.root.addEventListener("click", (e) => {
            e.stopPropagation();
            this.root.classList.add("selected");
            if (clicked) {
                this.root.classList.remove("selected");
                this.onDoubleClick();
            }
            clicked = true;
            setTimeout(() => {
                clicked = false;
            },300)
        })

        document.body.addEventListener("click", e => {
            this.root.classList.remove("selected");
        })
    }

    getElement() {
        return this.root;
    }

    onDoubleClick() {
        // from
        let box = this.root.getBoundingClientRect();
        let fromWidth = box.width;
        let fromHeight = box.height;
        let fromPos = {
            x: box.x,
            y: box.y,
        }

        // to
        let windowHeight = window.innerHeight;
        let windowWidth = window.innerWidth;
        let toWidth = Math.round(windowWidth / 2 > 400 ? windowWidth / 2 : 400);
        let toHeight = Math.round(windowHeight / 2 > 300 ? windowHeight / 2 : 300);
        let toPos = {
            x: Math.round(windowWidth / 2 - toWidth / 2),
            y: Math.round(windowHeight / 2 - toHeight / 2),
        }

        let translateFrom = new Transform(fromPos, fromWidth, fromHeight);
        let translateTo = new Transform(toPos, toWidth, toHeight);
        this.appWindow.open(translateFrom, translateTo);
    }
}

class App {
    constructor(name, icon, url, iframe) {
        this.name = name;
        this.icon = icon;
    }
}

class ContentApp extends App {
    constructor(name, icon, url, iframe) {
        super(name, icon);
        this.url = url;
        this.iframe = iframe
    }
}

class SettingsApp extends App {
    constructor(name, icon) {
        super(name, icon);
    }
}

class FossaOS {
    constructor( desktopElement, navElement ) {
        this.desktop = document.querySelector(desktopElement);
        this.navElement = document.querySelector(navElement);
        this.menu = new Menu(navElement);
        this.appWindows = [];
        this.apps = [];
        this.appIndex = 1;
    }

    addApp(app) {
        this.apps.push(app);

        if (app instanceof ContentApp) {
            this.addContentApp(app);
        } else if (app instanceof SettingsApp) {
            this.addSettingsApp(app);
        }
    }

    addContentApp(app) {
        let appWindow = new ContentAppWindow(this.desktop, app.name, app.url, app.iframe);
        this.setupwindow(app, appWindow);
    }

    addSettingsApp(app) {
        let appWindow = new SettingsAppWindow(this.desktop, app.name, app.url, app.iframe);
        this.setupwindow(app, appWindow);
    }

    setupwindow(app, appWindow) {
         // appWindow.on("update", e=>{console.log("update", e)});
         appWindow.on("dragStart", appWindow => {this.bringToFront(appWindow)});
         appWindow.on("open", appWindow => {this.bringToFront(appWindow)});
         appWindow.on("click", appWindow => {this.bringToFront(appWindow)});
 
         this.menu.addItem(new MenuItem(app.name, app.icon, appWindow));
 
    }

    bringToFront(appWindow) {
        console.log("appWindow.order", appWindow.order, "<", "this.appIndex", this.appIndex)
        if (appWindow.order < this.appIndex) {
            this.appIndex++;
            appWindow.setOrder(this.appIndex);
        }
    }
}

function debug() {
    console.log("#", ...arguments);
}

async function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(e=> {
            resolve();
        }, time)
    })
}



// document ready
document.addEventListener('DOMContentLoaded', function(){ 
    let desktop = document.querySelector(".desktop");

    // let projects = new AppWindow(desktop, "projects", "apps/projects.html");
    // let about = new AppWindow(desktop, "about", "apps/about.html");
    // let contact = new AppWindow(desktop, "contact", "apps/contact.html");

    // let menu = new Menu(".main-nav ul");
    // menu.addItem(new MenuItem("projects.exe", "https://cataas.com/cat", projects));
    // menu.addItem(new MenuItem("about.exe", "https://cataas.com/cat/cute", about));
    // menu.addItem(new MenuItem("contact.exe", "https://cataas.com/cat/gif", contact));

    let os = new FossaOS(".desktop", ".main-nav ul");

    os.addApp(new ContentApp("projects.exe", "https://cataas.com/cat", "apps/projects.html"));
    os.addApp(new ContentApp("about.exe", "https://cataas.com/cat/gif", "apps/about.html"));
    os.addApp(new ContentApp("contact.exe", "https://cataas.com/cat/cute", "apps/contact.html"));
    os.addApp(new ContentApp("contact.exe", "https://cataas.com/cat/cute", "apps/contact.html"));
    os.addApp(new SettingsApp("Settings.exe", "https://cataas.com/cat/cute"));

    // os.addApp(new App("chess_v5.exe", "https://cataas.com/cat/cute", "https://www.jossafossa.nl/projects/chess_v5", true));
    // os.addApp(new App("logos.exe", "https://cataas.com/cat/cute", "https://www.jossafossa.nl/projects/logos", true));
    os.addApp(new ContentApp("design.exe", "https://cataas.com/cat/cute", "https://www.jossafossa.nl/projects/design", true));
    // os.addApp(new App("draw2.exe", "https://cataas.com/cat/cute", "https://www.jossafossa.nl/projects/draw2", true));
    // os.addApp(new App("faviTetris.exe", "https://cataas.com/cat/cute", "https://www.jossafossa.nl/projects/faviTetris", true));
    // os.addApp(new App("faviSnake.exe", "https://cataas.com/cat/cute", "https://www.jossafossa.nl/projects/faviSnake", true));

    /* 
    projects:
    - fairplay
    - Word clock
    - Catifier
    - Favigames
    - other
    - 
    */

}, false);