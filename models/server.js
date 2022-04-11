require('dotenv').config()
const express = require('express');
var cors = require('cors')

class Server {
    constructor() {
        this.app = express();
        this.port=process.env.PORT;

        //Middleware
        this.middleware();

        this.routes();
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
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('listening on port ' + this.port);
        })
    }

}

module.exports = Server