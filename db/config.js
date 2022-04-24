const mongoose = require('mongoose');
require('dotenv').config()


const dbConnection= async()=>{

    try {
        const con = await mongoose.connect(process.env.DBCON);
        console.log("Bd Connected");
        
    } catch (error) {
        console.log(error);
        throw new Error("Error de conexion")
    }
}

module.exports={
    dbConnection
}