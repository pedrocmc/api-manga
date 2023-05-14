require('dotenv'). config();
require('express-async-errors')
const express = require ('express');



const routeManga = require ('./routes/routemanga');
const routeCapi = require ('./routes/routecapi');
const routePagi = require ('./routes/routepagi');

const validateManga = require('./middlewares/validaManga');
const validateCapi = require ('./middlewares/validaCapi')
const validatePagi = require('./middlewares/validaPagi');


const errorMiddleware = require('./middlewares/errorMiddleware')

const app = express();

app.use (express.json());
app.use ('/manga', validateManga,routeManga);
app.use ('/capitulo',validateCapi, routeCapi);
app.use ('/Pagina',validatePagi, routePagi);
app.use(errorMiddleware);





module.exports = {
    app
}