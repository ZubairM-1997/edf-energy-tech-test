/// <reference types="node" />
declare class ExpressApplication {
    private port;
    private middlewares;
    private controllers;
    private app;
    constructor(port: string | number, middlewares: any[], controllers: any[]);
    private setupMiddlewares;
    private configureAssets;
    private setUpLogger;
    private setupRoutes;
    start(): import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>;
}
export default ExpressApplication;
