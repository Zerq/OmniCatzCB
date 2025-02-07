import { JSX } from "./JSX.js";
export const FileView = (model, controller) => {
    return JSX("div", { class: "FileView" },
        model.parent ?
            JSX("div", { class: "dir", "data-fullName": model.parent, ondblclick: e => controller.openDirectory(e) },
                JSX("img", { src: "./assets/folder.svg", alt: "" }),
                "..")
            : "",
        ...model.directories.map(d => JSX("div", { class: "dir", "data-fullName": d.fullName, ondblclick: e => controller.openDirectory(e) },
            JSX("img", { src: "./assets/folder.svg", alt: "" }),
            d.name)),
        ...model.files.map(f => JSX("div", { class: "file", "data-fullName": f.fullName, ondblclick: e => controller.openFile(e) },
            JSX("img", { src: "./assets/application-vnd.comicbook+zip.svg", alt: "" }),
            f.name)));
};
//# sourceMappingURL=FileView.js.map