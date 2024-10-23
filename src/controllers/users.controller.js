import pool from '../db.js';

export const getAllUsers = async (req, res) => {
  //Connect to database
  const posts = await pool.query('SELECT * FROM usuario;');

  return res.json(posts);
};

export const createUser = async (req, res) => {
  let { nombre, apellido, correo, telefono, contrasena, tipodoc, numerodoc } =
    req.body;

  try {
    const user = await pool.query(
      'INSERT INTO usuario (nombre, apellido, correo, telefono, contraseña, tipodoc, numerodoc) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [nombre, apellido, correo, telefono, contrasena, tipodoc, numerodoc]
    );

    return res.json(user.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error creating user' });
  }
};
