import { HomeController } from "../controller/HomeController.js";
import { Elm } from "../elm.js";

/**
 * @param {import("../model/HomeModelLike.js").HomeModelLike} model
 * @param {import("../controller/HomeController.js").HomeController} controller
 */
export const ComicBookView = (model, controller) => {
    return Elm("nav", { onclick: e => controller.ClickThingy() },
        "blarg");
};
