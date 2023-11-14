import { getConnection, querys, sql } from "../database";

/*export const getProducts = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllProducts);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};*/

export const crerNuevoTurista = async (req, res) => {
  const {usuario,usuarioNombre,usuarioApellidos,usuarioCorreo,usuarioTelefono,usuarioPassword,usuarioConfirmarPassword} = req.body;

  // validating
  if (usuario == null || usuarioNombre == null || usuarioApellidos == null || usuarioCorreo == null || usuarioTelefono == null || usuarioPassword == null || usuarioConfirmarPassword == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  if (quantity == null) quantity = 0;

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("usuario", sql.VarChar, usuario)
      .input("usuarioNombre", sql.VarChar, usuarioNombre)
      .input("usuarioApellidos", sql.VarChar, usuarioApellidos)
      .input("usuarioCorreo",sql.VarChar,usuarioCorreo)
      .input("usuarioTelefono",sql.VarChar,usuarioTelefono)
      .input("usuarioPassword",sql.VarChar,usuarioPassword)
      .input("usuarioConfirmarPassword",sql.VarChar,usuarioConfirmarPassword)
      .query(`
      INSERT INTO turista (
        Nombre,
        A_Paterno,
        A_Materno,
        Correo,
        Telefono
      ) VALUES (
        @usuarioNombre,
        @usuario,
        @usuarioApellidos,
        @usuarioCorreo,
        @usuarioTelefono
      )`);
      res.json({
        usuario,
        usuarioNombre,
        usuarioApellidos,
        usuarioCorreo,
        usuarioTelefono
      });
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
};


export const getProductById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query(querys.getProducById);
    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", req.params.id)
      .query(querys.deleteProduct);

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getTotalProducts = async (req, res) => {
  const pool = await getConnection();

  const result = await pool.request().query(querys.getTotalProducts);
  console.log(result);
  res.json(result.recordset[0][""]);
};

export const updateProductById = async (req, res) => {
  const { description, name, quantity } = req.body;

  // validating
  if (description == null || name == null || quantity == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("name", sql.VarChar, name)
      .input("description", sql.Text, description)
      .input("quantity", sql.Int, quantity)
      .input("id", req.params.id)
      .query(querys.updateProductById);
    res.json({ name, description, quantity });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
