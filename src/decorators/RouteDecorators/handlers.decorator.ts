import MetadatKeys from "../../utils/metadata.keys";

export enum Methods {
    GET = 'get',
    PUT = 'put',
    POST = 'post',
    DELETE = 'delete'
}

export interface IRouter {
    method: Methods,
    middlewares?: any[],
    handlerPath: string, 
    handlerName: string | symbol
}

const decoratorFactory = 
    (method: Methods) => 
    (path: string, middlewares?: any[]): MethodDecorator => 
    (target, propertyKey) => {
        const controlleerClass = target.constructor;

        const routers: IRouter[] = Reflect.hasMetadata(
            MetadatKeys.ROUTERS, 
            controlleerClass,) 
            ? Reflect.getMetadata(MetadatKeys.ROUTERS, controlleerClass)
            : [];

        routers.push({
            method,
            middlewares, 
            handlerPath: path,
            handlerName: propertyKey
        })

        Reflect.defineMetadata(MetadatKeys.ROUTERS, routers, controlleerClass)
}

export const Get = decoratorFactory(Methods.GET)
export const Post = decoratorFactory(Methods.POST)
export const Put = decoratorFactory(Methods.PUT)
export const Delete = decoratorFactory(Methods.DELETE)