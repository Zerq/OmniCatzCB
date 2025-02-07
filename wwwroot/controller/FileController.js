/**
 * @typedef {import("../model/DirectoryInfoLike").DirectoryInfoLike } DirectoryInfoLike
 * @typedef {import("../views/ViewFunc").ViewFunc<DirectoryInfoLike, DirectoryController> } DirectoryViewFunc
 */
export class DirectoryController {
    /**
     * @type {DirectoryInfoLike}
     */
    #model;
    /**
    * @type {DirectoryViewFunc}
    */
    #view;
    /**
    * @type {HTMLElement}
    */
    #container;
    /**
     * @param {string|undefined|null} path
     */
    async getDirectory(path) {
        let request = !path ?
            await fetch(`${location.origin}/filebrowse_home`) :
            await fetch(`${location.origin}/filebrowse/${encodeURIComponent(path)}`);
        this.#model = await request.json();
        this.#container.innerHTML = "";
        this.#container.appendChild(this.#view(this.#model, this));
    }
    /**
     * @param {Event} e
     */
    async openDirectory(e) {
        const fullName = e.currentTarget.getAttribute("data-fullName");
        await this.getDirectory(fullName);
    }
    openFile(e) {
        const fullName = e.currentTarget.getAttribute("data-fullName");
        location.hash = this.#openUrlFragment + encodeURIComponent(fullName);
    }
    #openUrlFragment;
    /**
     * @param {DirectoryInfoLike} model
     * @param {DirectoryViewFunc} view
     * @param {HTMLElement} container
     * @param {string} openUrlFragment
     */
    constructor(view, container, openUrlFragment) {
        this.#view = view;
        this.#container = container;
        this.getDirectory(null).then();
        this.#openUrlFragment = openUrlFragment;
    }
}
//# sourceMappingURL=FileController.js.map