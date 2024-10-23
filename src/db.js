import pg from 'pg';

import { RAILWAY_CONNECTION_URL } from './config.js';

// The secret connection string you copied earlier
const connectionString = RAILWAY_CONNECTION_URL;
const { Pool } = pg;

const pool = new Pool({
  connectionString,
});

export default pool;
