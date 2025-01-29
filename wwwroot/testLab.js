import "./RectangleTool.js";
import { RectangleTool } from "./RectangleTool.js";

export default function initialise() {

    const box = new RectangleTool(document.getElementById("newBox"), "box");
    const circle = new RectangleTool(document.getElementById("newCirlcle"), "circle");


    EventPipe.On("move", e => {        
        console.log(`${e.subject.id} moved ${e.x}, ${e.y}`);
    });


    EventPipe.On("newItem", e => {        
        console.log(`new ${e.x}, ${e.y} = ${e.type} width id of ${e.itemId}`, e.subject);
    });


    EventPipe.On("select", e => {        
        console.log(`select  ${e.subject.id}`);
    });


    EventPipe.On("resize", e => {        
        console.log(`resize  ${e.id} ->  ${e.width},${e.height}`);
    });

}