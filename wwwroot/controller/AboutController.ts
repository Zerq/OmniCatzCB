export class AboutController {

    #view:(n:AboutController)=>HTMLElement;
    
    constructor(view:(n:AboutController)=>HTMLElement, container:HTMLElement) {
        this.#view = view;        
        //initial render
        container.innerHTML ="";
        container.appendChild(this.#view(this));
    }
}
