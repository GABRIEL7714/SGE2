import pool from "../db.js";

export const getAllUsers = async (req, res) => {
  //Connect to database
  const posts = await pool.query("SELECT * FROM usuario;");

  return res.json(posts);
};

export const createUser = async (req, res) => {
  let { nombre, apellido, correo, telefono, contrasena, tipodoc, numerodoc } =
    req.body;
  const rol = "usuario";

  try {
    const query =
      "INSERT INTO usuario (nombre, apellido, correo, telefono, contraseña, tipodoc, numerodoc, rol) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
    const values = [
      nombre,
      apellido,
      correo,
      telefono,
      contrasena,
      tipodoc,
      numerodoc,
      rol,
    ];

    const result = await pool.query(query, values);

    res.json({
      redirect: "/logIn",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error creating user" });
  }
};

export const logIn = async (req, res) => {
  //Connect to database
  const posts = await pool.query("SELECT * FROM usuario;");

  return res.json(posts);
};
