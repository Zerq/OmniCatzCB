import { Elm } from "../elm.js";
import {ComicbBookModelLike} from "../model/ComicbBookModelLike.js";
import {ComicBookController} from "../controller/ComicBookController.js";

export const ComicBookView = (model:ComicbBookModelLike, controller:ComicBookController) => {

    // position logic
    // 0 even   +1
    // 1 odd    -1
    // 2 even   +1
    // 3 odd    -1
    // 4 even
    // 5 odd
    // 6 even

    const isEven = (n) => {
        return n % 2 === 0;
    };
 
    let index1;
    let index2;

    if (isEven(model.bookmark)) {
        index1 = model.bookmark;
        index2 = model.bookmark + 1;

    }

    if (!isEven(model.bookmark)) {
        index1 = model.bookmark - 1;
        index2 = model.bookmark;
    }

    let page1 = model.pages[index1];
    let page2 = model.pages[index2];

    return Elm("div", { class: "comicView" },
        Elm("img", { "src": `/comic/${model.path}/${page1}`, onclick: e => controller.setPage(Math.max(index1 - 1, 0)) }),
        Elm("img", { "src": `/comic/${model.path}/${page2}`, onclick: e => controller.setPage(Math.min(index2 + 1,model.pages.length-1))})
    );

};

