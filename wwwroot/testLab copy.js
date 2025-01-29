function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}



export function Initialize() {

        const box = document.querySelector(".box");
        const container = document.querySelector(".container");

        container.addEventListener("drop", drop);

        container.addEventListener("dragover", e=>  allowDrop(e));
        


        box.addEventListener("dragstart", e=> drag(e));
        



}