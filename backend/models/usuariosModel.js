const { poolConnect, pool, sql } = require('../config/db');
const bcrypt = require('bcrypt');

const getAllUsuarios = async () => {
  await poolConnect;
  const result = await pool.request().query('SELECT * FROM dbo.julen');
  return result.recordset;
};

const getUsuarioById = async (id) => {
  await poolConnect;
  const result = await pool
    .request()
    .input('id', sql.Int, id)
    .query('SELECT * FROM dbo.julen WHERE id = @id');
  return result.recordset[0];
};

const createUsuario = async ({ username, password, email }) => {
  await poolConnect;

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool
    .request()
    .input('username', sql.NVarChar(100), username)
    .input('password', sql.NVarChar(100), hashedPassword)
    .input('email', sql.NVarChar(100), email)
    .query(`
      INSERT INTO dbo.julen (username, password, email)
      VALUES (@username, @password, @email);
      SELECT SCOPE_IDENTITY() AS id;
    `);
  return result.recordset[0];
};

const updateUsuario = async (id, { username, password, email }) => {
  await poolConnect;

  const hashedPassword = await bcrypt.hash(password, 10);

  await pool
    .request()
    .input('id', sql.Int, id)
    .input('username', sql.NVarChar(100), username)
    .input('password', sql.NVarChar(100), hashedPassword)
    .input('email', sql.NVarChar(100), email)
    .query(`
      UPDATE dbo.julen
      SET username = @username, password = @password, email = @email
      WHERE id = @id
    `);
};

const deleteUsuario = async (id) => {
  await poolConnect;
  await pool
    .request()
    .input('id', sql.Int, id)
    .query('DELETE FROM dbo.julen WHERE id = @id');
};

const getUsuarioByEmail = async (email) => {
  await poolConnect;
  const result = await pool
    .request()
    .input('email', sql.NVarChar(100), email)
    .query('SELECT * FROM dbo.julen WHERE email = @email');
  return result.recordset[0];
};

module.exports = {
  getAllUsuarios,
  getUsuarioById,
  getUsuarioByEmail,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};