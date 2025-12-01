const db = require('../utils/db');

async function getAllOwners(filters = {}) {
  let query = 'SELECT id, name, email, phone FROM owners WHERE 1=1';
  const params = [];

  if (filters.name) {
    query += ' AND name LIKE ?';
    params.push(`%${filters.name}%`);
  }

  const [rows] = await db.query(query, params);
  return rows;
}

async function getOwnerById(id) {
  const [rows] = await db.query(
    'SELECT id, name, email, phone FROM owners WHERE id = ?',
    [id]
  );
  return rows[0] || null;
}

async function createOwner(data) {
  const { name, email, phone } = data;
  const [result] = await db.query(
    'INSERT INTO owners (name, email, phone) VALUES (?, ?, ?)',
    [name, email, phone || null]
  );
  return await getOwnerById(result.insertId);
}

async function updateOwner(id, data) {
  const existing = await getOwnerById(id);
  if (!existing) return null;

  const updated = {
    name: data.name ?? existing.name,
    email: data.email ?? existing.email,
    phone: data.phone ?? existing.phone
  };

  await db.query(
    'UPDATE owners SET name = ?, email = ?, phone = ? WHERE id = ?',
    [updated.name, updated.email, updated.phone, id]
  );
  return await getOwnerById(id);
}

async function deleteOwner(id) {
  const [result] = await db.query('DELETE FROM owners WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = {
  getAllOwners,
  getOwnerById,
  createOwner,
  updateOwner,
  deleteOwner
};
