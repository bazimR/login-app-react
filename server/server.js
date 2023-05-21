import express from 'express'
import cors from 'cors'
import morgan from 'morgan';
import connect from './database/connection.js';
import router from './router/route.js';
import bodyParser from 'body-parser';
const app = express()

//middleware
app.use(bodyParser({ limit: '50mb' }));
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');


const port = 4000;

// http GET
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request")
})


// api ROUTE
app.use('/api', router)
// start server only wnen db connected
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        })
    }
    catch (error) {
        console.log("Cannot connect to server");
    }
})
    .catch(error => {
        console.log("Invalid database connection...!", error);
    })


