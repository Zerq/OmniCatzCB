import { Elm } from "./elm.js";


/**
 *@typedef {"select" | "newItem" | "move" }  EventNames
 */

/**
 *@typedef {{ eventName: EventNames, subject: HTMLElement }}  AppEvent
 */



//i am just writing very basic eventhandling here also not copying the addEventListener thingy because that for components dont wanna confuse the two... 
//on off is fairly common to use as an alternative
//also made to be used either inherited into as a baseclass or used globally for a single point of access..
export class EventThrower {

    /**
     * @type {Map<string, (n: Event)=> void>}
     */
    #subscribers;

    /**
     * @function{}
     * @param {EventNames} eventName 
     * @param {(n: AppEvent) => void} callback 
     */
    On(eventName, callback) {
        this.#subscribers.set(eventName, callback);
    }

    /**
      * @param {EventNames} eventName
      */
    Off(eventName) {
        this.#subscribers.delete(eventName);
    }

    /**
     * @param {EventNames} eventName
     * @param {AppEvent} event
     */
    emit(eventName, event) {
        event.eventName = eventName;
        this.#subscribers.get(eventName)(event);
    }

    constructor() {
        this.#subscribers = new Map();
    }
}

globalThis.EventPipe = new EventThrower();

export class RectangleTool {

    #className;

    /**
     * @param {Event} e 
     */
    #select(e) {
        EventPipe.emit("select", { subject: e.target });
    }


    #timeout;

    /**
     * @param {Array<ResizeObserverEntry>} e 
     */
    #resize(e) {
        if (e.length > 0){    
            
         
            if (this.#timeout !== undefined){
                clearTimeout(this.#timeout);
                this.#timeout = undefined;
            }

            this.#timeout = setTimeout(() => {
                
                EventPipe.emit("resize", {
                    subject: e[0].target,
                    id: e[0].target.id,
                    width: e[0].contentRect.width,
                    height: e[0].contentRect.height
                });
                

            }, 300);
            

     


        }
    }

    /**
     * @param {number} left 
     * @param {number} top 
     * @param {HTMLDivElement} elementBeingMoved 
     * @param {number} xOffset 
     * @param {number} yOffset 
     */
    #move(left, top, xOffset, yOffset, elementBeingMoved) {
        elementBeingMoved.style.left = left + "px";
        elementBeingMoved.style.top = top + "px";
        EventPipe.emit("move", { subject: elementBeingMoved, x: left - xOffset, y: top - yOffset });
    }

    /**
     * create and add a rectangle by drag droping it from the menu
     * @param {number} left
     * @param {number} top
     * @param {HTMLMediaElementEventMap} container
     * @param {number} xOffset 
     * @param {number} yOffset 
     */
    #addNew(left, top, xOffset, yOffset, container) {
        const id = crypto.randomUUID();
        const element = Elm("div",
            {
                id: id,
                draggable: true,
                class: this.#className,
                style: `left: ${left}px; top: ${top}px;`,
                onDragStart: e => this.#drag(e),
                onDragEnd: e => this.#dragend(e),
                onClick: e => this.#select(e),
              
            });

        this.#resizeObserver?.observe(element);

        container.appendChild(element);
        EventPipe.emit("newItem", { x: left - xOffset, y: top - yOffset, type: this.#className, itemId: id, subject: element });
    }

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

    /**
      * @param {DragEvent} e 
      */
    #dragNew(e) {
        let data = JSON.stringify({
            id: e.target.id,
            action: "new",
            type: this.#className,
            offsetX: e.offsetX,
            offsetY: e.offsetY
        });
        e.dataTransfer.setData("text", data);
    }

    /**
     * @param {DragEvent} e 
     */
    #dragend(e) {
        e.preventDefault();
        e.target.classList.remove("hide");
    }

    /**
     * @param {DragEvent} e
     * @returns void
     */
    #drop(e) {
        e.preventDefault();
        let raw = JSON.parse(e.dataTransfer.getData("text"));
        let { id, offsetX, offsetY, action, type } = raw;

        if (type !== this.#className) {
            return; //only act on the same type 
        }

        let box = document.getElementById(id);
        const main = document.querySelector(".workArea");
        const toolbar = document.querySelector(".toolbox");
        const aside = document.querySelector("aside");
        const asideRect = aside.getBoundingClientRect();
        const headerRect = toolbar.getBoundingClientRect();
        const boxRect = box.getBoundingClientRect();
        const mainRect = main.getBoundingClientRect();

        let x = e.offsetX;
        let y = e.offsetY;

        let left = Math.min(Math.max(x - offsetX + asideRect.width, asideRect.width), (mainRect.width + asideRect.width) - boxRect.width);
        let top = Math.min(Math.max(y - offsetY + headerRect.height, headerRect.height), (mainRect.height + headerRect.height) - boxRect.height);

        if (action === "move") {
            this.#move(left, top, asideRect.width, headerRect.height, box);
            return;
        }

        if (action === "new") {
            this.#addNew(left, top, asideRect.width, headerRect.height, main);
        }
    }


    /**
     * @type {ResizeObserver}
     */
    #resizeObserver;

    /**
     * @param {HTMLDivElement} newbox
     * @param {string} className
     */
    constructor(newbox, className) {
        this.#className = className;
        const main = document.querySelector(".workArea");
        const container = document.querySelector(".container");
        const toolbox = document.querySelector(".toolbox");
        const timeLine = document.querySelector(".timeLine");

        this.#resizeObserver = new ResizeObserver(e=> this.#resize(e));

        main.addEventListener("drop", e => this.#drop(e));
        main.addEventListener("dragover", e => this.#allowDrop(e));
        newbox.addEventListener("dragstart", e => this.#dragNew(e));
        newbox.addEventListener("dragend", e => this.#dragend(e));
    }
}
