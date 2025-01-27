/**
 * @typedef {(...params:Array<stirng>) => void } RouteAction
 */
class Router {

    /**
     *  @type {Map<string, RouteAction>}
     */
    #routes;

    /**
     * @param {string} rexPath Regex pattern for the path
     * @param {RouteAction} initiator action that grabs the parameters from the regex pattern path
     */
    register(rexPath, initiator, ignoreAfter=null) {
        this.#routes.set(rexPath, initiator);
    }

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
globalThis.Router = new Router();
