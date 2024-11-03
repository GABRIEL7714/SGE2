import pool from "../db.js";


//UC-001
export const getAllUsers = async (req, res) => {
  //Connect to database
  const posts = await pool.query("SELECT * FROM usuario;");

  return res.json(posts);
};

//UC-002
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

//UC-003
export const changeRol = async (req, res) => {
  const { numerodoc, rolNuevo } = req.body;

  try {
    const query =
      "UPDATE usuario SET rol = $1 WHERE numerodoc = $2 RETURNING *";
    const values = [rolNuevo, numerodoc];

    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "User role updated successfully",
      user: result.rows[0],
      redirect: "/indexAdmin",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error updating user role" });
  }
};
