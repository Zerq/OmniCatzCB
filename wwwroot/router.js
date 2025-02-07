export function Router() {
    if (!Router_.instance) {
        Router_.instance = new Router_();
    }
    return Router_.instance;
}
class Router_ {
    #routes;
    Register(rexPath, initiator, ignoreAfter = null) {
        this.#routes.set(rexPath, initiator);
    }
    static instance;
    constructor() {
        this.#routes = new Map();
        window.addEventListener("hashchange", e => {
            this.#routes.forEach((initiator, rexPath) => {
                const rex = new RegExp(rexPath);
                const capture = rex.exec(location.hash);
                if (capture === null) {
                    return;
                }
                if (capture?.length === 1) {
                    initiator();
                    return;
                }
                if (capture.length > 1) {
                    const arys = [];
                    for (let i = 1; i < capture.length; i++) {
                        arys.push(capture[i]);
                    }
                    initiator(...arys);
                }
            });
        });
    }
}
//# sourceMappingURL=router.js.map