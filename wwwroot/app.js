import "./router.js";
import {  } from  "./controller/HomeController.js";

import { DirectoryController } from "./controller/FileController.js";
import { FileView } from "./views/FileView.js";
import { ComicBookController } from "./controller/ComicBookController.js";
import { ComicBookView} from "./views/ComicBookView.js"


Router.register("#open", async () => {
    

    new DirectoryController(FileView, document.querySelector("main"));

});

Router.register("#read\/([^\/]*)[\/]*(.*)", async (path, page) => {    
    new ComicBookController(ComicBookView, document.querySelector("main"), path);
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