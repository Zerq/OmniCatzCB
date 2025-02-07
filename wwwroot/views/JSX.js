export function JSX(tag, attributes, ...children) {
    if (Components().Has(tag)) {
        return Components().CreateElement(tag, attributes);
    }
    const newElement = document.createElement(tag);
    for (const key in attributes) {
        if (key.startsWith("on")) {
            newElement.addEventListener(key.substring(2), attributes[key]);
            continue;
        }
        newElement.setAttribute(key, attributes[key]);
    }
    children.forEach(elm => {
        if (typeof elm === "string") {
            newElement.appendChild(document.createTextNode(elm));
            return;
        }
        newElement.appendChild(elm);
    });
    return newElement;
}
export function Components() {
    if (!ComponentRegistry.instance) {
        ComponentRegistry.instance = new ComponentRegistry();
    }
    return ComponentRegistry.instance;
}
class ComponentRegistry {
    #map = new Map();
    // public Register(string, )
    static instance;
    Has(tag) {
        return this.#map.has(tag);
    }
    Register(tag, ctr) {
        this.#map.set(tag, ctr);
    }
    CreateElement(tag, params) {
        let ctr = this.#map.get(tag);
        const newComponent = new ctr();
        for (let key in params) {
            newComponent.SetParam(key, params[key]);
        }
        newComponent.Render();
        return newComponent;
    }
}
export class BaseComponent {
    model;
    container;
    constructor() {
        this.container = this.makeContainer();
        this.Render();
    }
    Render() {
        this.container.innerHTML = "";
        this.container.appendChild(this.View());
    }
}
//# sourceMappingURL=JSX.js.map