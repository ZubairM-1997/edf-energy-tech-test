import Controller from "../../decorators/RouteDecorators/controller.decorator";

import BookService from './book.service';
import { Request, Response } from "express";
import { Get } from "../../decorators/RouteDecorators/handlers.decorator";

@Controller('/api/books')
export default class BookController {
    private bookService;

    constructor(){
        this.bookService = new BookService()
    }

    @Get('/getBookByAuthor/:author')
    public async getBooksByAuthor(req: Request, res: Response) {
        return this.bookService.getBooksByAuthor(req, res)
    }

    @Get('/getBookByISBN/:isbn')
    public async getBookByISBN(req: Request, res: Response) {
        return this.bookService.getBookByISBN(req, res)
    }
}