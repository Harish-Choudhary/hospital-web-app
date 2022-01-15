const mysql = require('mysql');

//createPool helps to create the connection. 
const db = mysql.createPool({
    connectionLimit : 100,
    host : "localhost",
    password : "",
    user : "root",
    database : "hospital"
});

module.exports = db;

// http://localhost:80/phpmyadmin