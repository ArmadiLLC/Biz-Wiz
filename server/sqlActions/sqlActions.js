const { Pool } = require('pg');
require('dotenv').config();
const PG_URL = process.env.DATABASE_URL;
const pool = new Pool({
    connectionString: PG_URL,
});

sqlActions = {};

dbActions.createTables = async() => {
    try{
        await pool.query(`CREATE TABLE IF NOT EXISTS employees
        (id SERIAL PRIMARY KEY NOT NULL,
            firstname VARCHAR(50) NOT NULL
            lastname VARCHAR(50) NOT NULL
            jobtitle VARCHAR(50) NOT NULL
            datehired TAMESTAMP
            email VARCHAR(50))
            bossid INTEGER
            shortbio VARCHAR(300)
            salary INTEGER`);

        pool.query(`CREATE TABLE IF NOT EXISTS users
        (id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(250) UNIQUE NOT NULL,
            password VARCHAR(250) NOT NULL);`);

        pool.query(`CREATE TABLE IF NOT EXISTS sessions
        (id SERIAL PRIMARY KEY NOT NULL
            cookieval VARCHAR(250) NOT NULL
            userid INTEGER NOT NULL DEFAULT -1)`);

    }catch(error){
        console.log(error.detail);
    }
}