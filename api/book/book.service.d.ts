import { Request, Response } from "express";
export default class BookService {
    getBookByAuthor(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
