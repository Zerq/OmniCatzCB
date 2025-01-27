
/**
 * @typedef {import("../views/ViewFunc").ViewFunc<AboutController> } AboutViewFunc
 */

export class AboutController {

    /**
    * @type {AboutViewFunc}
    */
    #view;

    /**
     * @param {AboutViewFunc} view
     * @param {HTMLElement} container
     */
    constructor(view, container) {
        this.#view = view;
        
        //initial render
        container.innerHTML ="";
        container.appendChild(this.#view(this));

    }

}
