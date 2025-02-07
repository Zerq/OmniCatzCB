import { Elm } from "../elm.js";
import { ReadAloud, MoveTo } from "../model/EditorModel.js";
import { EditorController } from "../controller/EditorController.js";
import { EditorModelLike } from "../model/EditorModelLike.js";


export const WorkSpaceChildView = (model:EditorModelLike, controller:EditorController) => {

    const mainApplicationHeader = document.querySelector("#mainApplicationHeader");
    const main = document.querySelector("#workArea");
    const toolbar = document.querySelector(".toolbox");
    const aside = document.querySelector("aside");
    const asideRect = aside.getBoundingClientRect();
    const headerRect = toolbar.getBoundingClientRect();

    const mainRect = main.getBoundingClientRect();
    const mainApplicationHeaderRect = mainApplicationHeader.getBoundingClientRect();


    return Array.from(model.Events.values()).map(n => {
        let inst;
        switch (n.ActionName) {
            case ReadAloud.name:
                let readAloud = n as ReadAloud;
                inst = Elm("div",
                    {
                        id: (n as ReadAloud).Id,
                        draggable: true,
                        class: "box",
                        style: `left: ${readAloud.X + asideRect.width}px; top: ${readAloud.Y + headerRect.height}px; width: ${readAloud.Width}px; height: ${readAloud.Height}; `,
                        onDragStart: e => controller.drag(e),
                        onDragEnd: e => controller.dragend(e),
                        onClick: e => controller.select(e)
                    });

                controller.ResizeObserver.observe(inst);
                break;
            case MoveTo.name:
                let moveTo = n as MoveTo;
                inst = Elm("div",
                    {
                        id: n.Id,
                        draggable: true,
                        class: "circle",
                        style: `left: ${moveTo.X + asideRect.width}px; top: ${moveTo.Y + headerRect.height}px;`,
                        onDragStart: e => controller.drag(e),
                        onDragEnd: e => controller.dragend(e),
                        onClick: e => controller.select(e)
                    });
                break;
        }

        return inst;
    })
};

export const AssideView = (model:EditorModelLike, controller:EditorController) => {
    const item = model.Events.get(model.SelectedItem);
    if (model.SelectedItem !== undefined && model.selectedType === "box") {
    
        return Elm("form", { id:"propertyGridForm" },
            Elm("label", { for: "itemId" }, "itemId"),
            Elm("input", { id: "itemId", disable:"", readonly: "", value: item.Id }),
            
            Elm("label", { for: "itemEventName" }, "EventName"),
            Elm("input", { id: "itemEventName",disable:"",  readonly: "", value: item.ActionName }),

            Elm("label", { for: "itemVoice" }, "Voice"),
            Elm("input", { id: "itemVoice", value: (item as ReadAloud).Voice }),

            Elm("label", { for: "itemSequenceNr" }, "SequenceNr"),
            Elm("input", { id: "itemSequenceNr", value: item.SequenceNr }),

            Elm("label", { for: "itemOverride" }, "Override"),
            Elm("input", { id: "itemOverride", value: (item as ReadAloud).Override }),

            Elm("label", { for: "itemX" }, "X"),
            Elm("input", { id: "itemX", value: (item as ReadAloud).X }),

            Elm("label", { for: "itemY" }, "Y"),
            Elm("input", { id: "itemY", value: (item as ReadAloud).Y }),
        )
        
        
    }

    if (model.SelectedItem !== undefined && model.selectedType === "circle") {
        return Elm("form", { id:"propertyGridForm" },
            Elm("label", { for: "itemId" }, "itemId"),
            Elm("input", { id: "itemId", readonly: "", value: item.Id }),
            
            Elm("label", { for: "itemEventName" }, "EventName"),
            Elm("input", { id: "itemEventName", disable:"", readonly: "", value: item.ActionName }),

            Elm("label", { for: "itemEffect" }, "Effect"),
            Elm("input", { id: "itemEffect", value: (item as MoveTo).Effect }),

            Elm("label", { for: "itemSpeed" }, "Speed"),
            Elm("input", { id: "itemSpeed", value: (item as MoveTo).Speed }),

            Elm("label", { for: "itemZppm" }, "Zppm"),
            Elm("input", { id: "itemZppm", value: (item as MoveTo).Zoom }),

            Elm("label", { for: "itemX" }, "X"),
            Elm("input", { id: "itemX", value: (item as MoveTo).X }),

            Elm("label", { for: "itemY" }, "Y"),
            Elm("input", { id: "itemY", value: (item as MoveTo).Y }),


        )
    }

    return Elm("div", {});
};


export const EditorView = (model:EditorModelLike, controller:EditorController) => {

    const old = document.head.getElementsByClassName("viewStyle")
    if (old.length !== 0) {
       Array.from(old).forEach(element => {
            document.head.removeChild(element);
        });
    };
    document.head.appendChild(Elm("link", { href: "./views/EditorView.css", rel: "stylesheet" }));



    return <div>
        
    </div>


    // return Elm("div", { class: "designer" },
    //     Elm("header", { class: "toolbox" },
    //         Elm("div", {
    //             id: "newBox",
    //             draggable: "true",
    //             onDragStart: e => controller.dragNew(e),
    //             onDragEnd: e => controller.dragend(e),
    //             class: "box"
    //         }, "Read aloud"),
    //         Elm("div", {
    //             id: "newCirlcle",
    //             draggable: "true",
    //             onDragStart: e => controller.dragNew(e),
    //             onDragEnd: e => controller.dragend(e),
    //             class: "circle"
    //         }, "Move To"),
    //         Elm("button", {}, "Open"),
    //         Elm("button", {}, "Next"),
    //         Elm("button", {}, "Previous")
    //     ),
    //     Elm("aside", { class: "timeline" }, AssideView(model, controller)),
    //     Elm("section", { id: "workArea", onDrop: e => controller.drop(e), "onDragOver": e => controller.allowDrop(e) },

    //     )
    );
};
