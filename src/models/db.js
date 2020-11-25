import pg from 'pg';
import config from '../config/config';
import dotenv from 'dotenv';

dotenv.config();
let connectionString;
const environmentVariable = process.env.NODE_ENV;

if (environmentVariable === 'development' || 'test') 
connectionString = config['development'];
else {
  connectionString = config['production'];
}
const pool = new pg.Pool({
  ...connectionString,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
})

// console.log({...connectionString});
pool.on('connect', () => { });

module.exports = pool;