import { Elm } from "../elm.js";

/**
 * @param {import("../model/DirectoryInfoLike.js").DirectoryInfoLike} model
 * @param {import("../controller/FileController.js").DirectoryController} controller
 */

export const FileView = (model, controller) => {
    return Elm("div", { class: "FileView" },

        model.parent ?
            Elm("div", {
                "class": "dir",
                "data-fullName": model.parent,
                ondblclick: e => controller.openDirectory(e)
            }, Elm("img", { src: "./assets/folder.svg", alt: "" }), `..`)
            : "",

        ...model.directories.map(d => Elm("div", {
            "class": "dir",
            "data-fullName": d.fullName,
            ondblclick: e => controller.openDirectory(e)
        },
            Elm("img", { src: "./assets/folder.svg", alt: "" }), `${d.name}`)),

        ...model.files.map(f => Elm("div", {
            ondblclick: e => controller.openFile(e),
            "class": "file",
            "data-fullName": f.fullName
        },
            Elm("img", { src: "./assets/application-vnd.comicbook+zip.svg", alt: "" }), `${f.name}`)),
    );
};
2