import pool from '../db.js';

export const getAllEvents = async (req, res) => {
  //Connect to database
  const events = await pool.query('SELECT * FROM evento;');
  return res.json(events.rows);
};
