import { Request, Response } from "express";
export default class BookController {
    private bookService;
    constructor();
    getBooksByAuthor(req: Request, res: Response): Promise<void>;
}
