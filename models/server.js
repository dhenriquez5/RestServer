require('dotenv').config()
const express = require('express');
var cors = require('cors')
const {dbConnection} = require('../db/config')

class Server {
    constructor() {
        this.app = express();
        this.port=process.env.PORT;

        //CONECTAR BD
        this.conectarBd();

        //Middleware
        this.middleware();

        this.routes();
    }

    async conectarBd() {
        await dbConnection();
    }

    middleware() {
        ////CORS
        this.app.use(cors());

        //LECTURA Y PARSOE DEL BODY
        this.app.use(express.json())

        ///CARPETA PUBLIC PARA SERVIR WEB PAGE
        this.app.use(express.static('public'))
    }


    routes() {
      this.app.use('/api/usuarios',require('../routes/usuarios'))
      this.app.use('/api/auth',require('../routes/auth'))
      this.app.use('/api/categorias',require('../routes/categorias'))
      this.app.use('/api/productos',require('../routes/productos'))
      this.app.use('/api/busquedas',require('../routes/busquedas'))

    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('listening on port ' + this.port);
        })
    }

}

module.exports = Server