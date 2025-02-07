import { ReadAloud, MoveTo } from "../model/EditorModel.js";
/**
 * @typedef {import("../views/EditorView.js").EditorView } EditorView
 * @typedef {import("../views/EditorView.js").WorkSpaceChildView } WorkSpaceChildView
 *
 */
/**
 * @typedef {import("../model/EditorModelLike")} EditorModelLike
 */
export class EditorController {
    /**
    * @type {EditorView}
    */
    #view;
    /**
    * @type {WorkSpaceChildView}
    */
    #WorkSpaceChildView;
    /**
     * @type {EditorModelLike}
     */
    #model;
    /***
     * @type ()=> void;
     */
    #Render;
    /**
     * @type {number}
     */
    #timeout;
    /**
     * @type {ResizeObserver}
     */
    ResizeObserver;
    /**
    * @type {HTMLElement}
    */
    #container;
    /**
     * @param {EditorView} view
     * @param {childview} WorkSpaceChildView
     * @param {HTMLElement} container
     */
    constructor(view, WorkSpaceChildView, container) {
        this.#view = view;
        this.#WorkSpaceChildView = WorkSpaceChildView;
        this.#model = { Events: new Map() };
        this.#container = container;
        this.ResizeObserver = new ResizeObserver(e => {
            if (this.#timeout !== undefined) {
                clearTimeout(this.#timeout);
                this.#timeout = undefined;
            }
            this.#timeout = setTimeout(() => {
                this.resize(e);
            });
        });
        //initial render
        this.#Render = () => {
            this.#container.innerHTML = "";
            this.#container.appendChild(this.#view(this.#model, this));
            const workArea = this.#container.querySelector("#workArea");
            const workSpaceContent = this.#WorkSpaceChildView(this.#model, this);
            workSpaceContent.forEach(n => workArea.appendChild(n));
        };
        this.#Render();
    }
    /**
     * @param {Array<ResizeObserverEntry>} e
     */
    resize(e) {
        let x = this.#model.Events;
        e.forEach(n => {
            const item = this.#model.Events.get(n.target.id);
            item.Width = n.contentRect.width;
            item.Height = n.contentRect.height;
        });
        // EventPipe.emit("resize", {
        //     subject: e[0].target,
        //     id: e[0].target.id,
        //     width: e[0].contentRect.width,
        //     height: e[0].contentRect.height
        // });
    }
    select(e) {
        this.#model.SelectedItem = e.target.id;
        this.#model.selectedType = e.target.className;
        this.#Render();
    }
    #move(left, top, xOffset, yOffset, elementBeingMoved) {
        elementBeingMoved.style.left = left + "px";
        elementBeingMoved.style.top = top + "px";
        let item = this.#model.Events.get(elementBeingMoved.id);
        item.X = left - xOffset;
        item.Y = top - yOffset;
        this.#Render();
    }
    #addNew(left, top, xOffset, yOffset, container, type) {
        let action;
        switch (type) {
            case "box":
                action = new ReadAloud();
                action.BatchId = crypto.randomUUID();
                action.Id = crypto.randomUUID();
                action.SequenceNr = this.#model.Events.length; //zero index so should be one ahead 
                action.X = left;
                action.Y = top;
                action.Width = 100;
                action.Height = 100;
                action.Type = type;
                break;
            case "circle":
                action = new MoveTo();
                action.BatchId = crypto.randomUUID();
                action.Id = crypto.randomUUID();
                action.SequenceNr = this.#model.Events.length; //zero index so should be one ahead 
                action.X = left;
                action.Y = top;
                break;
        }
        this.#model.Events.set(action.Id, action);
        this.#Render();
    }
    allowDrop(e) {
        e.preventDefault();
    }
    /**
     * @param {DragEvent} e
     */
    drag(e) {
        let data = JSON.stringify({
            id: e.target.id,
            action: "move",
            type: e.target.className,
            offsetX: e.offsetX,
            offsetY: e.offsetY
        });
        e.dataTransfer.setData("text", data);
        e.target.classList.add("hide");
    }
    /**
      * @param {DragEvent} e
      * @param {string} type
      */
    dragNew(e) {
        let data = JSON.stringify({
            id: e.target.id,
            action: "new",
            type: e.target.className,
            offsetX: e.offsetX,
            offsetY: e.offsetY
        });
        e.dataTransfer.setData("text", data);
    }
    /**
     * @param {DragEvent} e
     */
    dragend(e) {
        e.preventDefault();
        e.target.classList.remove("hide");
    }
    /**
     * @param {DragEvent} e
     * @returns void
     */
    drop(e) {
        e.preventDefault();
        let raw = JSON.parse(e.dataTransfer.getData("text"));
        let { id, offsetX, offsetY, action, type } = raw;
        let box = document.getElementById(id);
        const mainApplicationHeader = document.querySelector("#mainApplicationHeader");
        const main = document.querySelector("#workArea");
        const toolbar = document.querySelector(".toolbox");
        const aside = document.querySelector("aside");
        const asideRect = aside.getBoundingClientRect();
        const headerRect = toolbar.getBoundingClientRect();
        const boxRect = box.getBoundingClientRect();
        const mainRect = main.getBoundingClientRect();
        const mainApplicationHeaderRect = mainApplicationHeader.getBoundingClientRect();
        let x = e.offsetX;
        let y = e.offsetY;
        let left = Math.min(Math.max(x - offsetX + asideRect.width, asideRect.width), (mainRect.width + asideRect.width) - boxRect.width);
        let top = Math.min(Math.max(y - offsetY + headerRect.height + mainApplicationHeaderRect.height, headerRect.height + mainApplicationHeaderRect.height), (mainRect.height + headerRect.height + mainApplicationHeaderRect.height) - boxRect.height);
        if (action === "move") {
            this.#move(left, top, asideRect.width, headerRect.height, box);
            return;
        }
        if (action === "new") {
            this.#addNew(left, top, asideRect.width, headerRect.height, main, type);
        }
    }
}
4;
//# sourceMappingURL=EditorController.js.map