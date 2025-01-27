/**
 * @typedef {import("../model/ComicbBookModelLike").ComicbBookModelLike } ComicbBookModelLike
 * @typedef {import("../views/ViewFunc").ViewFunc<ComicbBookModelLike, ComicBookController> } ComicBookViewFunc
 */

export class ComicBookController {

    /**
     * @type {ComicbBookModelLike}
     */
    #model;

    /**
    * @type {ComicBookViewFunc}
    */
    #view;

    /**
    * @type {string}
    */
    #comicBookPath;

    /**
     * @type HTMLElement
     */
    #container

    /**
     * @param {ComicbBookModelLike} model
     * @param {ComicBookViewFunc} view
     * @param {HTMLElement} container
     */
    constructor(view, container, comicBookPath) {
        this.#container = container;
        this.#view = view;
        this.#comicBookPath = comicBookPath;


        this.#loadComic(comicBookPath).then(n=> {
            this.#model = n;
            this.#model.path= comicBookPath;
            this.#container.innerHTML = "";
            this.#container.appendChild(this.#view(this.#model, this));
        });
    }

    /**
     * @param {string} path 
     * @returns {Promise<ComicbBookModelLike}
     */
    async #loadComic(path){
        //fetch list of images

        const request = await fetch(`${location.origin}/comic/${path}`);
        

        const list = await request.json();
    


        //query local storage for book mark

        let bookmark = window.localStorage.getItem(path);
       
        if (bookmark === null){
            bookmark = 0;
            window.localStorage.setItem(path, bookmark);
        } else {
            bookmark = Number.parseInt(bookmark);
        } 




        return { "bookmark": bookmark, "pages": list, "path": path };
        //render view

    }


    

    setPage(nr){
        this.#model.bookmark = nr;
        this.#container.innerHTML = "";
        this.#container.appendChild(this.#view(this.#model, this));
        window.localStorage.setItem(this.#model.path, this.#model.bookmark);
    } 
  
}
