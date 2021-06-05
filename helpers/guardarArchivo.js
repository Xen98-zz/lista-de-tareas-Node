const fs = require('fs');

const archivo = './db/data.json';

// Guardar los datos en un archivo Json
const guardarDB = ( data ) => {
    // Convertir la data en un string
    fs.writeFileSync( archivo, JSON.stringify( data ) );
}

// Leer los datos del archivo Json
const leerDB = () => {

    if( !fs.existsSync( archivo ) ) {
        return null;
    }
    // Convertir el string en un Json
    const info = fs.readFileSync( archivo, { encoding: 'utf-8' } );
    const data = JSON.parse( info );

    return data;
}

module.exports = {
    guardarDB,
    leerDB
}