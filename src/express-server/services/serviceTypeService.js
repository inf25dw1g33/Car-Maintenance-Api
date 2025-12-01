const db = require('../utils/db');

async function getAllServiceTypes(filters = {}) {
  let query = 'SELECT id, name, description FROM service_types WHERE 1=1';
  const params = [];

  if (filters.name) {
    query += ' AND name LIKE ?';
    params.push(`%${filters.name}%`);
  }

  const [rows] = await db.query(query, params);
  return rows;
}

async function getServiceTypeById(id) {
  const [rows] = await db.query(
    'SELECT id, name, description FROM service_types WHERE id = ?',
    [id]
  );
  return rows[0] || null;
}

async function createServiceType(data) {
  const { name, description } = data;
  const [result] = await db.query(
    'INSERT INTO service_types (name, description) VALUES (?, ?)',
    [name, description || null]
  );
  return await getServiceTypeById(result.insertId);
}

async function updateServiceType(id, data) {
  const existing = await getServiceTypeById(id);
  if (!existing) return null;

  const updated = {
    name: data.name ?? existing.name,
    description: data.description ?? existing.description
  };

  await db.query(
    'UPDATE service_types SET name = ?, description = ? WHERE id = ?',
    [updated.name, updated.description, id]
  );
  return await getServiceTypeById(id);
}

async function deleteServiceType(id) {
  const [result] = await db.query('DELETE FROM service_types WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = {
  getAllServiceTypes,
  getServiceTypeById,
  createServiceType,
  updateServiceType,
  deleteServiceType
};
