const { Pool } = require('pg');
require('dotenv').config();
const bcrypt = require('bcrypt');
const PG_URL = process.env.DATABASE_URL;
console.log(PG_URL);
const pool = new Pool({
  connectionString: PG_URL,
});

sqlActions = {};

sqlActions.createTables = async () => {
  console.log('created tables');
  await pool.query(`CREATE TABLE IF NOT EXISTS employees
        (id SERIAL PRIMARY KEY NOT NULL,
            firstname VARCHAR(50) NOT NULL,
            lastname VARCHAR(50) NOT NULL,
            jobtitle VARCHAR(50) NOT NULL,
            datehired TIMESTAMP,
            email VARCHAR(50),
            bossid INTEGER,
            shortbio VARCHAR(300),
            salary INTEGER)`);

  await pool.query(`CREATE TABLE IF NOT EXISTS users
        (id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(250) UNIQUE NOT NULL,
            password VARCHAR(250) NOT NULL)`);

  await pool.query(`CREATE TABLE IF NOT EXISTS sessions
        (id SERIAL PRIMARY KEY NOT NULL,
            cookieval VARCHAR(250) NOT NULL,
            userid INTEGER NOT NULL DEFAULT -1)`);
  console.log('created tables');
};

sqlActions.createEmployee = async data => {
  const {
    firstname,
    lastname,
    jobtitle,
    datehired,
    email,
    bossid,
    shortbio,
    salary,
  } = data;
  const values = [
    firstname,
    lastname,
    jobtitle,
    datehired,
    email,
    bossid,
    shortbio,
    salary,
  ];
  const query = `INSERT into employees 
        (firstname, lastname, jobtitle, datehired, email, bossid, shortbio, salary) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id, firstname, lastname, jobtitle, datehired, email, bossid, shortbio, salary`;
  const result = await pool.query(query, values);
  return result.rows[0];
};
sqlActions.updateEmployee = async data => {
  const {
    employeeid,
    firstname,
    lastname,
    jobtitle,
    datehired,
    email,
    shortbio,
    salary,
  } = data;
  let updateEmployee = [
    firstname,
    lastname,
    jobtitle,
    datehired,
    email,
    shortbio,
    salary,
  ];
  const values = [employeeid];
  updateEmployee = Object.keys(updateEmployee)
    .filter(key => updateEmployee[key] !== undefined)
    .reduce(
      (cur, key) => Object.assign(cur, { [key]: updateEmployee[key] }),
      {},
    );
  for (const [key, value] of Object.entries(updateLift)) {
    if (!first) {
      query += `,`;
    }
    first = false;
    query += ` ${key} = $${values.length + 1}`;
    values.push(value);
  }
  query += ` where id = $1 RETURNING id, firstname, lastname, jobtitle, datehired, email, bossid, shortbio, salary`;
  const result = await pool.query(query, values);
  return result.rows[0];
};
sqlActions.getEmployees = async () => {
  const result = await pool.query('SELECT * FROM employees');
  return result.rows;
};
sqlActions.searchEmployees = async query => {
  let dbquery = `SELECT * FROM employees WHERE `;
  const values = [];
  if (query.bossid !== undefined && query.employeeid !== undefined) {
    dbquery += 'bossid = $1 AND id = $2';
    values.push(query.bossid);
    values.push(query.employeeid);
  } else {
    if (query.bossid !== undefined) {
      dbquery += `bossid = $1`;
      values.push(query.bossid);
    }
    if (query.employeeid !== undefined) {
      dbquery += `id = $1`;
      values.push(query.employeeid);
    }
  }
  console.log(dbquery, values);
  const result = await pool.query(dbquery, values);
  return result.rows;
};
sqlActions.deleteEmployee = async employeeid => {
  const query = `DELETE FROM employees WHERE id = $1 RETURNING id`;
  const values = [employeeid];
  const result = await pool.query(query, values);
  return result.rows;
};
sqlActions.startSession = async userid => {
  const cookieval = userid + Date.now();
  const query = `INSERT INTO sessions (userid, cookieval) VALUES ($1, $2) RETURNING cookieval`;
  const values = [userid, cookieval];
  const result = await pool.query(query, values);
  return result.rows[0];
};
sqlActions.checkSession = async cookieval => {
  const query = `SELECT userid FROM sessions where cookieval = $1`;
  const values = [cookieval];
  const result = await pool.query(query, values);
  return result.rows;
};
sqlActions.addUser = async (username, password) => {
  const saltRounds = 10;
  const hashpass = await bcrypt.hash(password, saltRounds);
  const query =
    'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id';
  const values = [username, hashpass];
  const result = await pool.query(query, values);
  return result.rows;
};
sqlActions.checkPassword = async (username, password) => {
  const query = 'SELECT id, password FROM users where username = $1';
  const values = [username];
  const result = await pool.query(query, values);
  const compare = await bcrypt.compare(password, result.rows[0].password);
  if (compare) {
    return result.rows[0].id;
  }
};
module.exports = sqlActions;
