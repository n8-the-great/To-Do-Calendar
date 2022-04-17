require('dotenv').config();
const { Pool, Client } = require('pg');
const query = require('./queries.js');

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASS,
  database: process.env.PGDB,
  port: process.env.PGPORT,
  host: process.env.PGHost
});


const getInfo = async (email, callback) => {
  (async () => {
    const client = await pool.connect()
    try {
      const result = await client.query(query.getInfo, [email]);
      callback(null, result);
    } finally {
      client.release();
    }
  })().catch((err) => {
    console.log(err.stack)
  })
};

const getSharedWithUser = async function (email) {
  const client = await pool.connect()
  try {
    return await client.query(query.getSharedWithUser, [email]);
  } catch (err) {
    throw (err);
  } finally {
    client.release();
  }
};

const getSharedByUser = async function (email) {
  const client = await pool.connect()
  try {
    return await client.query(query.getSharedByUser, [email]);
  } catch (err) {
    throw (err);
  } finally {
    client.release();
  }
};

const deleteFromShares = async function (email) {
  const client = await pool.connect()
  try {
    return await client.query(query.deleteFromShares, [email]);
  } catch (err) {
    throw (err);
  } finally {
    client.release();
  }
};


const getSharedTo = async (email) => {
  (async () => {
    const client = await pool.connect()
    try {
      const result = await client.query(query.getSharedTo, [email]);
      return result;
    } finally {
      client.release();
    }
  })().catch((err) => {
    console.log('in outside err')
   return (err.stack)
  })
};




module.exports = {
  getInfo, getSharedWithUser, getSharedByUser, deleteFromShares, pool
}