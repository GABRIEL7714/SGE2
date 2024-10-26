import pool from "../db.js";

export const getAllEvents = async (req, res) => {
  const events = await pool.query("SELECT * FROM evento;");
  return res.json(events.rows);
};
