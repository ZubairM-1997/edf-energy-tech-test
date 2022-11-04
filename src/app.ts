import dotenv from 'dotenv'
import ExpressApplication from './bootstrapper';
import express from 'express';
import logger from './lib/logger';
import 'reflect-metadata'
import BookController from './api/book/book.controller';

dotenv.config({ path: `${process.cwd()}/.env.${process.env.NODE_ENV}`})

const PORT = process.env.PORT || 5000;

const app = new ExpressApplication(
    PORT, 
    [
        express.json({limit: '10kb'}),
        express.urlencoded({extended: true, limit: '10kb'})
    ],
    [
        BookController
    ]
)

const server = app.start();

process.on('SIGTERM', () => {
    logger.warn("SIGTERM RECIEVED!");
    server.close(() => {
        logger.warn('Process terminated!')
    })
})