import { Elm } from "../elm.js";

/**
 * @param {model} model
 * @param {ComicBookController} controller
 */

export const ComicBookView = (model, controller) => {
    return Elm("div", { onclick: e => controller.ClickThingy() },
        "blarg");
};


