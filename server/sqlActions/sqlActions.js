const { Pool } = require('pg');
require('dotenv').config();
const PG_URL = process.env.DATABASE_URL;
const pool = new Pool({
    connectionString: PG_URL,
});

sqlActions = {};

sqlActions.createTables = async() => {
    try{
        await pool.query(`CREATE TABLE IF NOT EXISTS employees
        (id SERIAL PRIMARY KEY NOT NULL,
            firstname VARCHAR(50) NOT NULL
            lastname VARCHAR(50) NOT NULL
            jobtitle VARCHAR(50) NOT NULL
            datehired TIMESTAMP
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
};

sqlActions.createEmployee = async(data) =>{
    const {firstname, lastname, jobtitle, datehired, email, shortbio, salary} = data;
    const values = [firstname, lastname, jobtitle, datehired, email, shortbio, salary];
    try{
        const query = `INSERT into employees 
        (firstname, lastname, jobtitle, datehired, email, shortbio, salary) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, firstname, lastname, jobtitle, datehired, email, bossid, shortbio, salary`;

        const result = await pool.query(query, values);
        return result.rows[0];
    }catch(error){
        console.log(error.detail);
    }
}
sqlAction.searchEmployees = asyc(query) =>{
    try{
        const query = `SELECT * FROM employees WHERE `;
        const values = [];
        if(query.bossid !== undefined){
            query += `bossid = $1`;
            values.push(query.bossid);
        }else{
            query += `id = $1`;
            values.push(query.employeeid);
        }
        const result = await pool.query(query, values);
        return result.rows[0];
    }catch(error){}
}
