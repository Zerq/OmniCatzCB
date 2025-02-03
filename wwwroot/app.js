import "./router.js";
 

import { DirectoryController } from "./controller/FileController.js";
import { FileView } from "./views/FileView.js";
import { ComicBookController } from "./controller/ComicBookController.js";
import { ComicBookView} from "./views/ComicBookView.js"

import { AboutController } from "./controller/AboutController.js";
import { AboutView} from "./views/AboutView.js"

import { EditorController } from "./controller/EditorController.js";
import {EditorView, WorkSpaceChildView} from  "./views/EditorView.js";


let currentController;

Router.register("#open", async () => {   
    currentController = new DirectoryController(FileView, document.querySelector(".appbody"), "#read/");
});

Router.register("#open-editor", async () => {   
    currentController = new DirectoryController(FileView, document.querySelector(".appbody"), "#read-editor/");
});


Router.register("#read\/([^\/]*)[\/]*(.*)", async (path, page) => {      

    if (Object.getPrototypeOf(currentController) === ComicBookController.prototype){
        currentController.setPage(page);

    } else {
        currentController = new ComicBookController(ComicBookView, document.querySelector(".appbody"), path, page);
    }
});

Router.register("#about", async (path, page) => {      
        currentController = new AboutController(AboutView, document.querySelector(".appbody")); 
});

Router.register("#editor\/(.*)", (file)=> {
    currentController = new EditorController(EditorView, WorkSpaceChildView, document.querySelector(".appbody"));

});


location.hash = "#about";





