import "./router.js";
import {  } from  "./controller/HomeController.js";

import { DirectoryController } from "./controller/FileController.js";
import { FileView } from "./views/FileView.js";
import { ComicBookController } from "./controller/ComicBookController.js";
import { ComicBookView} from "./views/ComicBookView.js"



let currentController;

Router.register("#open", async () => {   
    currentController = new DirectoryController(FileView, document.querySelector("main"));
});


Router.register("#read\/([^\/]*)[\/]*(.*)", async (path, page) => {      

    if (Object.getPrototypeOf(currentController) === ComicBookController.prototype){
        currentController.setPage(page);

    } else {
        currentController = new ComicBookController(ComicBookView, document.querySelector("main"), path, page);
    }
});


location.hash ="#home";




//import { ComicBookController } from "../controller/ComicBookController.js";
//import { ComicBookView } from "../views/ComicBookView.js";
//export const InitiateComicBookReaderView = ()=> {
//    /**
//     * @type {import("../model/ComicbBookModelLike.js").ComicbBookModelLike}
//     */
//    const model = { 
//        pages: []
//    };
//    new ComicBookController(model, ComicBookView, document.querySelector("body"));
//};