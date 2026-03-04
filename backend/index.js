// console.log("Hola desde el backend");
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
require('./database');

//Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/v1/jugadores', require('./routes/jugador.route'));
app.use('/', (req, res) => res.send('API is in /api/v1/jugadores/'));



//Settings
app.set('port', process.env.PORT || 3000);

if (!process.env.VERCEL) {
    app.listen(app.get('port'),() =>{
        console.log('Server on port', app.get('port'));
    });
}

module.exports = app;