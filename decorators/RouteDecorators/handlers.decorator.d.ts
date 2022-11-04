export declare enum Methods {
    GET = "get",
    PUT = "put",
    POST = "post",
    DELETE = "delete"
}
export interface IRouter {
    method: Methods;
    middlewares?: any[];
    handlerPath: string;
    handlerName: string | symbol;
}
export declare const Get: (path: string, middlewares?: any[]) => MethodDecorator;
export declare const Post: (path: string, middlewares?: any[]) => MethodDecorator;
export declare const Put: (path: string, middlewares?: any[]) => MethodDecorator;
export declare const Delete: (path: string, middlewares?: any[]) => MethodDecorator;
