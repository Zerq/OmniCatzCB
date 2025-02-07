import { JSX } from "./JSX.js";
import { DirectoryInfoLike } from "../model/DirectoryInfoLike.js";
import { DirectoryController } from "../controller/FileController.js";
 
export const FileView = (model:DirectoryInfoLike, controller:DirectoryController) => {

    return <div class="FileView">
        {model.parent ?
            <div class="dir" data-fullName={model.parent}  ondblclick={e=> controller.openDirectory(e)} >
                <img src="./assets/folder.svg" alt=""></img>
                ..
            </div>
        : ""}

        {...model.directories.map(d=> <div class="dir" data-fullName={d.fullName} ondblclick={e=> controller.openDirectory(e)}>
                <img src="./assets/folder.svg" alt=""></img>
                {d.name}
        </div>)}


        {...model.files.map(f=> <div class="file" data-fullName={f.fullName} ondblclick={e=> controller.openFile(e)}>
                <img src="./assets/application-vnd.comicbook+zip.svg" alt=""></img>
                {f.name}
        </div>)}
    </div>
};
