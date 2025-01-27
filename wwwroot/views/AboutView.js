import { Elm } from "../elm.js";

/**
 * @param {import("../controller/AboutController.js").AboutController} controller
 */
export const AboutView = (controller) => {
    return Elm("pre", { onclick: e => controller.ClickThingy() },`

    
        Very basic comic book reader app.
        Currently only has limited support for formats

        cbz=zip (supported)
        cb7=7zip
        cbr=rar 
        
        Probably need to find a better archive library to support more formats.

        I am hoping to use this project as a launching of point for extending the 
        format tobake in html with animation and sound file or text-transcripts and 
        TTS to make it panning animated and voiced.

        `);
};
