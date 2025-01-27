import "./router.js";
 

import { DirectoryController } from "./controller/FileController.js";
import { FileView } from "./views/FileView.js";
import { ComicBookController } from "./controller/ComicBookController.js";
import { ComicBookView} from "./views/ComicBookView.js"

import { AboutController } from "./controller/AboutController.js";
import { AboutView} from "./views/AboutView.js"


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

Router.register("#about", async (path, page) => {      
        currentController = new AboutController(AboutView, document.querySelector("main")); 
});


location.hash = "#about";





