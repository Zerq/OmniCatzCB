export function JSX(tag: string, attributes: { [name: string]: any; }, ...children: Array<string | HTMLElement>) {

    if (Components().Has(tag)) {
        return Components().CreateElement(tag, attributes);
    }

    const newElement = document.createElement(tag);

    for (const key in attributes) {
        if (key.startsWith("on")) {
            newElement.addEventListener(key.substring(1), attributes[key]);
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


/** abstract class type */
export type AbsCtr<T> = Function & { prototype: T; };
/** non-abstract class type */

export interface Ctr<T> {
    new(): T;
}


export function Components(): ComponentRegistry {
    if (!ComponentRegistry.instance) {
        ComponentRegistry.instance = new ComponentRegistry();
    }

    return ComponentRegistry.instance;
}

export interface ComponentRegistryLike {
    Register<T>(tag: string, ctr: Ctr<BaseComponent<T>>): void;
    CreateElement<T, V extends BaseComponent<T>>(tag: string, params: { [name: string]: any }): BaseComponent<V>;
    Has(tag): boolean;
}

class ComponentRegistry {
    #map: Map<string, Ctr<BaseComponent<any>>> = new Map();
    // public Register(string, )
    static instance: ComponentRegistry;

    Has(tag): boolean {
        return this.#map.has(tag);
    }

    Register<T>(tag: string, ctr: Ctr<BaseComponent<T>>) {
        this.#map.set(tag, ctr);
    }

    CreateElement<T, V extends BaseComponent<V>>(tag: string, params: { [name: string]: any }): BaseComponent<V> {
        let ctr = this.#map.get(tag);
        const newComponent = new ctr();

        for (let key in params) {
            newComponent.SetParam(key, params[key]);
        }

        newComponent.Render()

        return <V>newComponent;
    }

}


export abstract class BaseComponent<T> {


    protected model: T;
    protected container: HTMLElement;

    public constructor() {
        this.container = this.makeContainer();
        this.Render();
    }

    protected abstract makeContainer(): HTMLElement;

    public abstract SetParam(name: string, value: any);

    protected abstract View(): HTMLElement;
    public Render() {
        this.container.innerHTML = "";
        this.container.appendChild(this.View());
    }

}
