//para establecer la conexion a mysql
const {createPool} = require('mysql2/promise');

//opciones para la conexion a la base de datos
const conexion = createPool({
    host: process.env.MYSQLHOST || 'localhost',
    user: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASWORD || '',
    port: process.env.MYSQLPORT || '3306',
    database: process.env.MYSQLDATABASE || 'siveo',
})

const getConexion = () => {
    return conexion;
}

//exportamos la funcion para poder usarla en otro modulo (archivo.js)
module.exports.miConexion = getConexion;