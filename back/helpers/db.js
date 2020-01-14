const mysql = require('mysql')

require('dotenv').config(process.cwd())

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.SERVER_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_DBN
})

module.exports = connection;