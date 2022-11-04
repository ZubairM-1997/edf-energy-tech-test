import MetadatKeys from "../../utils/metadata.keys";

const Controller = (basePath: string): ClassDecorator =>  
    (target) => Reflect.defineMetadata(MetadatKeys.BASE_PATH, basePath, target);

export default Controller;

