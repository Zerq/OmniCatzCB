
export function Router(): IRouter{
    if (!Router_.instance){
        Router_.instance = new Router_();
    }

    return Router_.instance;
}


export interface IRouter {
     Register(rexPath:string, initiator, ignoreAfter?:boolean);
}
class Router_ implements IRouter {

    #routes:Map<string, Function>;


    public Register(rexPath:string, initiator, ignoreAfter=null) {
        this.#routes.set(rexPath, initiator);
    }

    static instance: IRouter; 

    constructor() {
        this.#routes = new Map();

        window.addEventListener("hashchange", e => {

            this.#routes.forEach((initiator, rexPath) => {
                const rex = new RegExp(rexPath);


                const capture = rex.exec(location.hash);


                if (capture === null){
                    return;
                }

                if (capture?.length === 1) {
                    initiator();
                    return;
                }


                if (capture.length > 1){

                    const arys = [];
                    for (let i=1; i< capture.length; i++){
                        arys.push(capture[i]);
                    }

                    initiator(...arys);

                }
            });
        });
    }
}
