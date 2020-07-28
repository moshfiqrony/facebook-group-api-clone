import express, { urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { json } from 'body-parser';
import ApiRouter from './routes';
import { connect } from 'mongoose';

try {
    connect('mongodb://localhost:27017/fb-group-api',
        { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
        (e) => console.log('db connected', e)
    )
} catch (err) {
    console.log('DB error')
}

export const app = express();

app.disable('x-powered-by')
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api', ApiRouter)

export const start = () => {
    app.listen(3007, () => {
        console.log('running on http://localhost:3007');
    })
} 