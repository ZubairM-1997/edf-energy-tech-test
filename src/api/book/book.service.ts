import { Request, Response } from "express";
import fetch from 'node-fetch'
import logger from '../../lib/logger';
import { searchByAuthorApis, searchByISBNApis } from "../../apiLinks/apiLinks";
import xml2js from 'xml2js'

export default class BookService {
    public async getBooksByAuthor(req: Request, res: Response) {
        const author = req.params.author;
        const query = author.toLowerCase().split("_").join("%20")
        
        const responses = searchByAuthorApis.map(async (link) => {
            try{
                const resp = await fetch(link + query)
                const data = await resp.json()
                const contentType = resp.headers.get("content-type")
                if (contentType === "application/json") {
                    return data.docs
                } else {
                    xml2js.parseString(data, (err, result) => {
                        if (err) {
                            throw err
                        }

                        const json = JSON.stringify(result, null, 4)
                        return json
                    })
                }
            } catch (error) {
                throw error
            }
        })
        const data = await Promise.all(responses)
        return res.send(data)
    }

    public async getBookByISBN(req: Request, res: Response) {
        const isbn = req.params.isbn;
        const isbnRegex = /(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)/

        if (isbn.match(isbnRegex)){
                const response = searchByISBNApis.map(async (link) => {
                    try {
                        const resp  = await fetch(link + isbn);
                        const data = await resp.json();
                        const contentType = resp.headers.get("content-type")
                        if (contentType === "application/json") {
                            return data
                        } else {
                            xml2js.parseString(data, (err, result) => {
                                if (err) {
                                    throw err
                                }

                                const json = JSON.stringify(result, null, 4)
                                return json
                            })
                        }

                    } catch (error) {
                        throw error
                    }
                })

                const data = await Promise.all(response)
                return res.send(data)
        } else {
            return res.send("Incorrect ISBN format entered")
        }
    } 
}