import { Elm } from "../elm.js";
import { ReadAloud, MoveTo } from "../model/EditorModel.js";

/**
 * @param {import("../controller/EditorController.js").EditorController} controller
 * @param {import("../model/EditorModelLike").EditorModelLike} model
 * @returns HtmlElement
 */
export const WorkSpaceChildView = (model, controller) => {

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

        switch (n.EventName) {
            case ReadAloud.name:
                inst = Elm("div",
                    {
                        id: n.Id,
                        draggable: true,
                        class: "box",
                        style: `left: ${n.X + asideRect.width}px; top: ${n.Y + headerRect.height}px; width: ${n.Width}px; height: ${n.Height}; `,
                        onDragStart: e => controller.drag(e),
                        onDragEnd: e => controller.dragend(e),
                        onClick: e => controller.select(e)
                    });

                controller.ResizeObserver.observe(inst);
                break;

            case MoveTo.name:
                inst = Elm("div",
                    {
                        id: n.Id,
                        draggable: true,
                        class: "circle",
                        style: `left: ${n.X + asideRect.width}px; top: ${n.Y + headerRect.height}px;`,
                        onDragStart: e => controller.drag(e),
                        onDragEnd: e => controller.dragend(e),
                        onClick: e => controller.select(e)
                    });
                break;
        }

        return inst;
    })
};

/**
 * @param {import("../controller/EditorController.js").EditorController} controller
 * @param {import("../model/EditorModelLike").EditorModelLike} model
 * @returns HtmlElement
 */
export const AssideView = (model, controller) => {
    const item = model.Events.get(model.SelectedItem);

    if (model.SelectedItem !== undefined && model.selectedType === "box") {
    
        return Elm("form", { id:"propertyGridForm" },
            Elm("label", { for: "itemId" }, "itemId"),
            Elm("input", { id: "itemId", disable:"", readonly: "", value: item.Id }),
            
            Elm("label", { for: "itemEventName" }, "EventName"),
            Elm("input", { id: "itemEventName",disable:"",  readonly: "", value: item.EventName }),

            Elm("label", { for: "itemBatchId" }, "BatchId"),
            Elm("input", { id: "itemBatchId", disable:"", readonly: "", value: item.BatchId }),

            Elm("label", { for: "itemType" }, "Type"),
            Elm("input", { id: "itemType", disable:"", readonly: "", value: item.Type }),

            Elm("label", { for: "itemVoice" }, "Voice"),
            Elm("input", { id: "itemVoice", value: item.Voice }),

            Elm("label", { for: "itemSequenceNr" }, "SequenceNr"),
            Elm("input", { id: "itemSequenceNr", value: item.SequenceNr }),

            Elm("label", { for: "itemOverride" }, "Override"),
            Elm("input", { id: "itemOverride", value: item.Override }),

            Elm("label", { for: "itemX" }, "X"),
            Elm("input", { id: "itemX", value: item.X }),

            Elm("label", { for: "itemY" }, "Y"),
            Elm("input", { id: "itemY", value: item.Y }),
        )
        
        
    }

    if (model.SelectedItem !== undefined && model.selectedType === "circle") {
        return Elm("form", { id:"propertyGridForm" },
            Elm("label", { for: "itemId" }, "itemId"),
            Elm("input", { id: "itemId", readonly: "", value: item.Id }),
            
            Elm("label", { for: "itemEventName" }, "EventName"),
            Elm("input", { id: "itemEventName", disable:"", readonly: "", value: item.EventName }),

            Elm("label", { for: "itemBatchId" }, "BatchId"),
            Elm("input", { id: "itemBatchId", disable:"", readonly: "", value: item.BatchId }),

            Elm("label", { for: "itemEffect" }, "Effect"),
            Elm("input", { id: "itemEffect", value: item.Effect }),

            Elm("label", { for: "itemSpeed" }, "Speed"),
            Elm("input", { id: "itemSpeed", value: item.Speed }),

            Elm("label", { for: "itemZppm" }, "Zppm"),
            Elm("input", { id: "itemZppm", value: item.Zppm }),

            Elm("label", { for: "itemX" }, "X"),
            Elm("input", { id: "itemX", value: item.X }),

            Elm("label", { for: "itemY" }, "Y"),
            Elm("input", { id: "itemY", value: item.Y }),


        )
    }

    return Elm("div", {});
};


/**
 * @param {import("../controller/EditorController.js").EditorController} controller
 * @param {import("../model/EditorModelLike").EditorModelLike} model
 * @returns HtmlElement
 */
export const EditorView = (model, controller) => {

    const old = document.head.getElementsByClassName("viewStyle")
    if (old.length !== 0) {
        old.array.forEach(element => {
            document.head.removeChild(element);
        });
    };
    document.head.appendChild(Elm("link", { href: "./views/EditorView.css", rel: "stylesheet" }));

    return Elm("div", { class: "designer" },
        Elm("header", { class: "toolbox" },
            Elm("div", {
                id: "newBox",
                draggable: "true",
                onDragStart: e => controller.dragNew(e),
                onDragEnd: e => controller.dragend(e),
                class: "box"
            }, "Read aloud"),
            Elm("div", {
                id: "newCirlcle",
                draggable: "true",
                onDragStart: e => controller.dragNew(e),
                onDragEnd: e => controller.dragend(e),
                class: "circle"
            }, "Move To"),
            Elm("button", {}, "Open"),
            Elm("button", {}, "Next"),
            Elm("button", {}, "Previous")
        ),
        Elm("aside", { class: "timeline" }, AssideView(model, controller)),
        Elm("section", { id: "workArea", onDrop: e => controller.drop(e), "onDragOver": e => controller.allowDrop(e) },

        )
    );
};
