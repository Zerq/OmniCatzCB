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
     * @param {ComicbBookModelLike} model
     * @param {ComicBookViewFunc} view
     * @param {HTMLElement} container
     */
    constructor(view, container, comicBookPath) {

        this.#view = view;
        this.#comicBookPath = comicBookPath;


        this.#loadComic(comicBookPath).then(n=> {
            this.#model = n;
            container.appendChild(this.#view(this.#model, this));
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
       
        if (bookmark === undefined){
            bookmark = 0;
            window.localStorage.setItem(path, bookmark);
        }

        return { bookmark: bookmark, pages: list };
        //render view

    }


  
}
