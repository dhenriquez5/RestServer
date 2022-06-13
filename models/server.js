require('dotenv').config()
const express = require('express');
var cors = require('cors')
const { createServer } = require('http');
const {dbConnection} = require('../db/config')
const fileUpload = require('express-fileupload');
const { socketController } = require('../sockets/socketController');

class Server {
    constructor() {
        this.app = express();
        this.port=process.env.PORT;
        this.server = createServer( this.app );
        this.io     = require('socket.io')(this.server)

        //CONECTAR BD
        this.conectarBd();

        //Middleware
        this.middleware();

        this.routes();

        ///Sockets
        this.sockets();
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

        //Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));
    }


    routes() {
      this.app.use('/api/usuarios',require('../routes/usuarios'))
      this.app.use('/api/auth',require('../routes/auth'))
      this.app.use('/api/categorias',require('../routes/categorias'))
      this.app.use('/api/productos',require('../routes/productos'))
      this.app.use('/api/busquedas',require('../routes/busquedas'))
      this.app.use('/api/uploads',require('../routes/uploads'))

    }

    sockets() {
        this.io.on('connection', ( socket ) => socketController(socket, this.io ) )
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('listening on port ' + this.port);
        })
    }

}

module.exports = Server