const db = require('../utils/db');

async function getAllVehicles(filters = {}) {
  let query = 'SELECT id, owner_id, brand, model, license_plate, year FROM vehicles WHERE 1=1';
  const params = [];

  if (filters.brand) {
    query += ' AND brand LIKE ?';
    params.push(`%${filters.brand}%`);
  }

  if (filters.owner_id) {
    query += ' AND owner_id = ?';
    params.push(filters.owner_id);
  }

  if (filters.year) {
    query += ' AND year = ?';
    params.push(filters.year);
  }

  const [rows] = await db.query(query, params);
  return rows;
}

async function getVehicleById(id) {
  const [rows] = await db.query(
    'SELECT id, owner_id, brand, model, license_plate, year FROM vehicles WHERE id = ?',
    [id]
  );
  return rows[0] || null;
}

async function createVehicle(data) {
  const { owner_id, brand, model, license_plate, year } = data;
  const [result] = await db.query(
    'INSERT INTO vehicles (owner_id, brand, model, license_plate, year) VALUES (?, ?, ?, ?, ?)',
    [owner_id, brand, model, license_plate, year || null]
  );
  return await getVehicleById(result.insertId);
}

async function updateVehicle(id, data) {
  const existing = await getVehicleById(id);
  if (!existing) return null;

  const updated = {
    owner_id: data.owner_id ?? existing.owner_id,
    brand: data.brand ?? existing.brand,
    model: data.model ?? existing.model,
    license_plate: data.license_plate ?? existing.license_plate,
    year: data.year ?? existing.year
  };

  await db.query(
    'UPDATE vehicles SET owner_id = ?, brand = ?, model = ?, license_plate = ?, year = ? WHERE id = ?',
    [updated.owner_id, updated.brand, updated.model, updated.license_plate, updated.year, id]
  );
  return await getVehicleById(id);
}

async function deleteVehicle(id) {
  const [result] = await db.query('DELETE FROM vehicles WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle
};
