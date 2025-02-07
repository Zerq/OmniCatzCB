export class ComicBookController {
    #model;
    #view;
    #comicBookPath;
    #container;
    constructor(view, container, comicBookPath, page) {
        this.#container = container;
        this.#view = view;
        this.#comicBookPath = comicBookPath;
        this.#loadComic(comicBookPath).then(n => {
            this.#model = n;
            this.#model.path = comicBookPath;
            this.#container.innerHTML = "";
            this.#container.appendChild(this.#view(this.#model, this));
        });
    }
    /**
     * @param {string} path
     * @returns {Promise<ComicbBookModelLike}
     */
    async #loadComic(path) {
        //fetch list of images
        const request = await fetch(`${location.origin}/comic/${path}`);
        const list = await request.json();
        //query local storage for book mark
        let bookmark = Number.parseInt(window.localStorage.getItem(path));
        if (bookmark === null) {
            bookmark = 0;
            window.localStorage.setItem(path, bookmark.toString());
        }
        return { "bookmark": bookmark, "pages": list, "path": path };
        //render view
    }
    setPage(nr) {
        this.#model.bookmark = nr;
        this.#container.innerHTML = "";
        this.#container.appendChild(this.#view(this.#model, this));
        window.localStorage.setItem(this.#model.path, this.#model.bookmark.toString());
    }
}
//# sourceMappingURL=ComicBookController.js.map