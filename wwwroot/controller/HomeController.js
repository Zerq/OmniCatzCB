/**
 * @typedef {import("../model/HomeModelLike").HomeModelLike } HomeModelLike
 * @typedef {import("../views/ViewFunc").ViewFunc<HomeModelLike, HomeController> } HomeViewFunc
 */

export class HomeController {

    /**
     * @type {HomeModelLike}
     */
    #model;

    /**
    * @type {HomeViewFunc}
    */
    #view;

    /**
     * @param {HomeModelLike} model
     * @param {HomeViewFunc} view
     * @param {HTMLElement} container
     */
    constructor(model, view, container) {
        this.#model = model;
        this.#view = view;

        //initial render
        container.appendChild(this.#view(this.#model, this));
    }


    ClickThingy() {

        alert("bork");
    }
}
