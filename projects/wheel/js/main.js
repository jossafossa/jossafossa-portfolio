// todo
// add choice if not empty meesturen
// Uncheck on spin option
// Text overflow issue
// Skip spin button if spinning
// Pointer anim + more flexible anim
// Better wheel styling
// Remove choice
// 

function getChildNumber(node) {
  return Array.prototype.indexOf.call(node.parentNode.childNodes, node);
}

Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};


// menu toggle
let menuToggler = document.querySelector(".menu-button");
let menuElem = document.querySelector("menu");

menuToggler.addEventListener("click", e => {
    toggleMenu();
});

function toggleMenu() {
    menuToggler.classList.toggle("active");
    menuElem.classList.toggle("active");
}


class Wheel {
    wheelContainer;
    element;
    choices;
    constructor(querySelector) {
        this.element = document.querySelector(querySelector);
        this.choices = {};
        this.setupWheel();

        this.onSpin = function() {};
    }

    setupWheel() {
        this.wheelContainer = document.createElement("div");
        this.wheelContainer.classList.add("items");
        this.element.appendChild(this.wheelContainer);

        let center = document.createElement("div");
        center.classList.add("center");
        this.element.appendChild(center);
    }

    populate(choices) {
        this.choices = choices;
        this.element.style.setProperty('--nr-of-items', choices.length);
        this.wheelContainer.innerHTML = "";
        let index = 0;
        for(let choice of choices) {
            let choiceElem = document.createElement("div");
            choiceElem.classList.add("item");

            let inner = document.createElement("div");
            inner.classList.add("item-offset");
            inner.style.setProperty("--color", "#"+((1<<24)*Math.random()|0).toString(16));
            choiceElem.appendChild(inner);

            let center = document.createElement("div");
            center.classList.add("item-inner");
            center.innerText = choice;
            inner.appendChild(center);

            choiceElem.style.setProperty('--index', index);

            this.wheelContainer.appendChild(choiceElem);    
            index++;
        };
    }

    spin() {
        this.wheelContainer.style.setProperty("--rotation", 0);
        this.wheelContainer.style.transition = "0s";
        
        setTimeout(e => {
            this.wheelContainer.style.transition = null;
            let rounds = 10;
            let rand = Math.floor(Math.random() * this.choices.length);
            let SegDeg = 360 / this.choices.length;
            let value = Math.floor(SegDeg * rand - SegDeg / 2) + 360 * rounds + "deg";
            this.wheelContainer.style.setProperty("--rotation", value);  
            this.onSpin(rand);         
        }, 1000);
    }
}

class WheelController {
    constructor() {
        this.wheels = this.load();
        this.lastSpinnedWheel = this.wheels[0];
        this.onChange = function(){};
    }

    generateID() {
        return Date.now();
    }

    add(name, value, options) {
        let id = this.generateID();
        let choices = value;
        this.wheels[id] = {
            name: name, 
            choices: choices, 
            options: options
        };
        this.save()
    }

    edit(id, name, choices, options) {
        if (this.wheels[id] !== null) {
            this.wheels[id].name = name;
            this.wheels[id].choices = choices;
            this.wheels[id].options = options;
            this.save();
        }
    }

    get() {
        let wheels = this.wheels;
        return wheels;
    }

    getForWheel(id) {
        this.lastSpinnedWheel = id;
        let choice = this.wheels[id];
        return this.simplifyChoices(choice.choices);     
    }

    simplifyChoices(choices) {
        let simpleChoices = [];
        for(let choice of choices) {
            if (choice.checked) {
                simpleChoices.push(choice.value);
            }
        }
        return simpleChoices;

    }

    remove(id) {
        delete this.wheels[id];
        this.save();
    }

    setState(id, index, state) {
        this.wheels[id]["choices"][index]["checked"] = state;
        this.save();
    }

    save(id, name, choices) {
        localStorage.setItem("wheels", JSON.stringify(this.wheels));
        this.onChange(this.wheels);
    }

    load() {
        let data = localStorage.getItem("wheels");
        if (data !== null) {
            let json;
            try {
                json = JSON.parse(data);
            } catch (e) {
                return {};
            }
            return json;
        }
        return {};
    }
}

class ListCreatorView {
    constructor() {
        this.nameElem = document.querySelector("#name");
        this.idElem = document.querySelector("#id");
        this.valueElem = document.querySelector("#value");
        this.newValueElem = document.createElement("input");
        this.removeOnSpinElem = document.querySelector("#remove-on-spin");
        this.buttonElem = document.querySelector("#add");

        this.choices = [this.defaultChoice()];

        this.onCreate = function() {};
        this.onEdit = function() {};

        this.loadChoices();
        this.registerEvents();
    }

    defaultChoice() {
        return {
            value: "",
            checked: true,
        }
    }

    loadChoices() {  
        this.valueElem.innerHTML = '';
        this.choices.forEach(choice => {
            this.valueElem.appendChild(this.getChoiceRow(choice.value, choice.checked));
        });        
    }

    addChoice(value, index = false) {
        let choice = {
            value: value,
            checked: true,
        };
        if (index == false) {
            this.choices.push(choice);
            this.loadChoices();
            this.newValueElem.value = "";
            this.newValueElem.focus();
        } else {
            this.choices.insert(index, choice);
            this.loadChoices();
            this.focus(index);
        }
    }

    removeChoice(index) {
        this.choices.splice(index, 1);
        this.loadChoices();
        this.focus(index - 1);
    }

    focus(index) {
        if (this.valueElem.children.length > index >= 0) {
            this.valueElem.children[index].querySelector("input[type=text]").focus();
        }
    }

    getChoiceRow(value, checked) {
        let row = document.createElement("div");
        row.classList.add("choice-row");

        let checkbox = document.createElement("input");
        row.appendChild(checkbox);
        checkbox.type = "checkbox";
        checkbox.checked = checked;

        checkbox.addEventListener("click", e => {
            this.choices[getChildNumber(checkbox.parentNode)].checked = checkbox.checked;
        })

        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = "add a new choice";

        input.addEventListener("keyup", e => {
            this.choices[getChildNumber(input.parentNode)].value = input.value;
        });

        input.addEventListener("keydown", e => {
            let index = getChildNumber(input.parentNode);
            if (e.key == "Backspace") {
                if (input.value == "") {
                    if (index - 1 >= 0) {
                        this.removeChoice(index);
                        e.preventDefault();
                    }
                }
            } else if (e.key == "Enter") {
                this.addChoice("", index + 1);
            } else if (e.key == "ArrowUp") {
                this.focus(index - 1);
                e.preventDefault();
            } else if (e.key == "ArrowDown") {
                this.focus(index + 1);
                e.preventDefault();
            }

        });
        row.appendChild(input);
        input.value = value;

     

        return row;
    }

    getChoices() {
        let choices = this.choices;
        if (this.newValueElem.value.length > 0) {
            choices.push({
                value: this.newValueElem.value,
                checked: true,
            })
        }
        return choices;
    }

    getNewChoiceRow() {
        return this.getChoiceRow("", true);

        let input = this.newValueElem;
        input.placeholder = "Add a new choice";
        input.type = "text";

        let row = document.createElement("div");
        row.classList.add("choice-row");
        row.appendChild(input);

        return row;
    }

    registerEvents() {
        this.buttonElem.addEventListener("click", e => {
            let removeOnSpin = this.removeOnSpinElem.checked;
            let options = {
                removeOnSpin: removeOnSpin,
            }
            console.dir(this.removeOnSpinElem);
            if (this.idElem.value !== "") {        
                let choices = this.getChoices()
                this.onEdit(this.idElem.value, this.nameElem.value, choices, options);
            } else {
                this.onCreate(this.nameElem.value, this.choices, options);
            }
            this.clear();
        })

        this.newValueElem.addEventListener("keydown", e => {
            if (e.key == "Enter") {
                this.addChoice(this.newValueElem.value);
            }
        })
    }

    load(id, name, choices, options) {
        this.idElem.value = id;
        this.nameElem.value = name;
        this.choices = choices;
        this.loadChoices();
        this.removeOnSpinElem.checked = options.removeOnSpin;
        console.log(options);
    }

    

    clear() {        
        this.nameElem.value = "";
        this.idElem.value = "";
        this.newValueElem.value = "";
        this.choices = [this.defaultChoice()];
        this.loadChoices();
    }
}



let wheel = new Wheel(".wheel");

let listCreatorView = new ListCreatorView();

let controller = new WheelController();

listCreatorView.onCreate = (name, choices, options) => controller.add(name, choices, options);
listCreatorView.onEdit = (id, name, choices, options) => controller.edit(id, name, choices, options);


let menu = document.querySelector("#menu");
controller.onChange = function(value) {
   updateList(value);
}

wheel.onSpin = function(index) {
    this.wheels = controller.get();
    let id = controller.lastSpinnedWheel;

    if (this.wheels[id].options.removeOnSpin) {
        controller.setState(id, index, false);
    }
}

updateList(controller.get());

let spinElem = document.querySelector(".spin");
spinElem.addEventListener("click", e => {
    wheel.populate(controller.getForWheel(controller.lastSpinnedWheel));
    wheel.spin();
    toggleMenu();
})


function updateList(value) {
    menu.innerHTML = "";
    for(let id in value) {
        let item = value[id];
        let row = document.createElement("tr");

        let nameCell = document.createElement("td");
        nameCell.innerText = item.name;
        row.appendChild(nameCell);


        let editCell = document.createElement("td");
        let editButton = document.createElement("button");
        editButton.classList.add("small");
        editButton.innerText = "edit";
        editButton.addEventListener("click", e => {
            listCreatorView.load(id, item.name, item.choices, item.options);
        })        
        editCell.appendChild(editButton);
        row.appendChild(editCell);
        
        let loadCell = document.createElement("td");
        let loadButton = document.createElement("button");
        loadButton.classList.add("small");
        loadButton.innerText = "load";
        loadButton.addEventListener("click", e => {
            wheel.populate(controller.getForWheel(id));
        })
        loadCell.appendChild(loadButton);
        row.appendChild(loadCell);

        let deleteCell = document.createElement("td");
        let deleteButton = document.createElement("button");
        deleteButton.classList.add("small");
        deleteButton.innerText = "X";
        deleteButton.addEventListener("click", e => {
            controller.remove(id);
        })
        deleteCell.appendChild(deleteButton);        
        row.appendChild(deleteCell);

        menu.appendChild(row);
    }
}



