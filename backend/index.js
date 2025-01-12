import express from 'express';
import {PORT, mongoDBURL} from './config.js';
import mongoose from 'mongoose';
import {Book} from './models/bookModels.js';
import booksRoute from './routes/booksRoute.js'
import cors from 'cors';

// mongoose.set('strictQuery', false);

const app = express();

// midleware for parsing request body
app.use(express.json());

// Option1: Allow all origins with default of cors (*)
// app.use(cors())
// Option2: Allow Cutom Origins
app.use(
        cors({
        origin: 'http://127.0.0.1:5174',
        method: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
)


//2. make http route
app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Success! <h1>Welcome to MERN Stack Tutorial</h1>')
});

// prefix for booksRoute
app.use('/books', booksRoute);

//3. add MongoDB and mongoose to node js
mongoose.set("strictQuery", false);
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        //1. make node.js server
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    });