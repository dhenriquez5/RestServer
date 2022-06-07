const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivos = (files,ExtensionesValidas=[],carpeta='') => {

    return new Promise(function (resolve, reject) {

        const { archivo } = files;

        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        // Validar extensiones
        
        if (!ExtensionesValidas.includes(extension)) return reject(`La extension ${extension} no es permitida`);

        const nombreTmp = uuidv4() + "." + extension;

        const uploadPath = path.join(__dirname, '../uploads/',carpeta, nombreTmp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }

            resolve(nombreTmp);
        });
    })

}


module.exports = {
    subirArchivos
}