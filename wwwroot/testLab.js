import { Elm } from "./elm.js";


export class RectangleTool {
    #allowDrop(e) {
        e.preventDefault();
    }

    /**
     * @param {DragEvent} e 
     */
    #drag(e) {
        let data = JSON.stringify({
            id: e.target.id,
            action: "move",
            type: this.#className,
            offsetX: e.offsetX,
            offsetY: e.offsetY
        });

        e.dataTransfer.setData("text", data);
        e.target.classList.add("hide");
    }

    #dragNew(e){
        let data = JSON.stringify({
            id: e.target.id,
            action: "new",
            type: this.#className,
            offsetX: e.offsetX,
            offsetY: e.offsetY
        });
        e.dataTransfer.setData("text", data);
    }

    #dragend(e) {
        e.preventDefault();    
        e.target.classList.remove("hide");    
    }

    /**
     * move a rectangle
     * @param {number} left 
     * @param {number} top 
     * @param {HTMLDivElement} box 
     */
    #move(left, top, box) {
        box.style.left = left + "px";
        box.style.top = top + "px";
    }

    /**
     * create and add a rectangle by drag droping it from the menu
     * @param {number} left 
     * @param {number} top 
     * @param {HTMLMediaElementEventMap} main 
     */
    #addNew(left, top, main){
        main.appendChild(Elm("div",
            {
                id: crypto.randomUUID(),
                draggable: true,
                class: this.#className,
                style: `left: ${left}px; top: ${top}px;`,
                onDragStart: e => this.#drag(e),
                onDragEnd: e => this.#dragend(e)
            }, "box")
        );
    }

    /**
     * @param {DragEvent} e 
     * @returns void
     */
    #drop(e) {
        e.preventDefault();
        let raw = JSON.parse(e.dataTransfer.getData("text"));
        let { id, offsetX, offsetY, action, type } = raw;

        if (type !== this.#className){
            return; //only act on the same type 
        }

        let box = document.getElementById(id);
        const main = document.querySelector("main");
        const elm = document.querySelector(".toolbox");
        const aside = document.querySelector("aside");
        const asideReact = aside.getBoundingClientRect();
        const headerRect = elm.getBoundingClientRect();
        const boxRect = box.getBoundingClientRect();
        const mainRect = main.getBoundingClientRect();

        let x = e.offsetX;
        let y = e.offsetY;
    
        let left = Math.min(Math.max(x - offsetX + asideReact.width, asideReact.width), (mainRect.width + asideReact.width) - boxRect.width);
        let top = Math.min(Math.max(y - offsetY + headerRect.height, headerRect.height), (mainRect.height + headerRect.height) - boxRect.height);
    
        if (action === "move") {
            this.#move(left,top,box);
            return;
        }
    
        if (action === "new") {
            this.#addNew(left,top,main);
        }    
    }


 
    #className;

    /**
     * @param {HTMLDivElement} newbox 
     * @param {string} className 
     */
    constructor(newbox, className){
        this.#className = className;
        const boxes = document.querySelectorAll("main .box");
        const main = document.querySelector("main");
        const container = document.querySelector(".container");
        const toolbox = document.querySelector(".toolbox");
        const timeLine = document.querySelector(".timeLine");
    
        main.addEventListener("drop", e=> this.#drop(e));
        main.addEventListener("dragover", e => this.#allowDrop(e));
        newbox.addEventListener("dragstart", e => this.#dragNew(e));
        newbox.addEventListener("dragend", e => this.#dragend(e));
    
        boxes.forEach(box => {
            box.addEventListener("dragstart", e => this.#drag(e));
            box.addEventListener("dragend", e => this.#dragend(e));
        });
    }
}

