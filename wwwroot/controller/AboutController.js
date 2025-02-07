export class AboutController {
    #view;
    constructor(view, container) {
        this.#view = view;
        //initial render
        container.innerHTML = "";
        container.appendChild(this.#view(this));
    }
}
//# sourceMappingURL=AboutController.js.map