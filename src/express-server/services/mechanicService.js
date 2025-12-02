const db = require('../utils/db');

async function getAllMechanics(filters = {}) {
  let query = 'SELECT id, name, specialization, phone, email FROM mechanics WHERE 1=1';
  const params = [];

  if (filters.name) {
    query += ' AND name LIKE ?';
    params.push(`%${filters.name}%`);
  }

  if (filters.specialization) {
    query += ' AND specialization LIKE ?';
    params.push(`%${filters.specialization}%`);
  }

  const [rows] = await db.query(query, params);
  return rows;
}

async function getMechanicById(id) {
  const [rows] = await db.query(
    'SELECT id, name, specialization, phone, email FROM mechanics WHERE id = ?',
    [id]
  );
  return rows[0] || null;
}

async function createMechanic(data) {
  const { name, specialization, phone, email } = data;
  const [result] = await db.query(
    'INSERT INTO mechanics (name, specialization, phone, email) VALUES (?, ?, ?, ?)',
    [name, specialization || null, phone || null, email || null]
  );
  return await getMechanicById(result.insertId);
}

async function updateMechanic(id, data) {
  const existing = await getMechanicById(id);
  if (!existing) return null;

  const updated = {
    name: data.name ?? existing.name,
    specialization: data.specialization ?? existing.specialization,
    phone: data.phone ?? existing.phone,
    email: data.email ?? existing.email
  };

  await db.query(
    'UPDATE mechanics SET name = ?, specialization = ?, phone = ?, email = ? WHERE id = ?',
    [updated.name, updated.specialization, updated.phone, updated.email, id]
  );
  return await getMechanicById(id);
}

async function deleteMechanic(id) {
  const [result] = await db.query('DELETE FROM mechanics WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

// ========== Funções para relação M:N ==========

async function getMechanicsByServiceRecord(serviceRecordId) {
  const [rows] = await db.query(
    `SELECT m.id, m.name, m.specialization, m.phone, m.email 
     FROM mechanics m
     INNER JOIN service_record_mechanics srm ON m.id = srm.mechanic_id
     WHERE srm.service_record_id = ?`,
    [serviceRecordId]
  );
  return rows;
}

async function getServiceRecordsByMechanic(mechanicId) {
  const [rows] = await db.query(
    `SELECT sr.id, sr.vehicle_id, sr.service_type_id, sr.service_date, sr.mileage_km, sr.cost, sr.notes
     FROM service_records sr
     INNER JOIN service_record_mechanics srm ON sr.id = srm.service_record_id
     WHERE srm.mechanic_id = ?`,
    [mechanicId]
  );
  return rows;
}

async function assignMechanicToServiceRecord(serviceRecordId, mechanicId) {
  try {
    await db.query(
      'INSERT INTO service_record_mechanics (service_record_id, mechanic_id) VALUES (?, ?)',
      [serviceRecordId, mechanicId]
    );
    return { service_record_id: serviceRecordId, mechanic_id: mechanicId };
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return null; // Já existe
    }
    throw err;
  }
}

async function removeMechanicFromServiceRecord(serviceRecordId, mechanicId) {
  const [result] = await db.query(
    'DELETE FROM service_record_mechanics WHERE service_record_id = ? AND mechanic_id = ?',
    [serviceRecordId, mechanicId]
  );
  return result.affectedRows > 0;
}

module.exports = {
  getAllMechanics,
  getMechanicById,
  createMechanic,
  updateMechanic,
  deleteMechanic,
  getMechanicsByServiceRecord,
  getServiceRecordsByMechanic,
  assignMechanicToServiceRecord,
  removeMechanicFromServiceRecord
};
