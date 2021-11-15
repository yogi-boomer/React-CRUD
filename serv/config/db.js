const mysql = require('mysql')
const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "",
database:"angular_trabajadores" 
})

module.exports = db;