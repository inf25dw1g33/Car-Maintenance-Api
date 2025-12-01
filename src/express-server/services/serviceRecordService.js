const db = require('../utils/db');

async function getAllServiceRecords(filters = {}) {
  let query = `SELECT sr.id, sr.vehicle_id, sr.service_type_id, sr.service_date,
                      sr.mileage_km, sr.cost, sr.notes
                 FROM service_records sr WHERE 1=1`;
  const params = [];

  if (filters.vehicle_id) {
    query += ' AND sr.vehicle_id = ?';
    params.push(filters.vehicle_id);
  }

  if (filters.service_type_id) {
    query += ' AND sr.service_type_id = ?';
    params.push(filters.service_type_id);
  }

  const [rows] = await db.query(query, params);
  return rows;
}

async function getServiceRecordById(id) {
  const [rows] = await db.query(
    `SELECT sr.id, sr.vehicle_id, sr.service_type_id, sr.service_date,
            sr.mileage_km, sr.cost, sr.notes
       FROM service_records sr
      WHERE sr.id = ?`,
    [id]
  );
  return rows[0] || null;
}

async function createServiceRecord(data) {
  const {
    vehicle_id,
    service_type_id,
    service_date,
    mileage_km,
    cost,
    notes
  } = data;

  const [result] = await db.query(
    `INSERT INTO service_records
       (vehicle_id, service_type_id, service_date, mileage_km, cost, notes)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [vehicle_id, service_type_id, service_date, mileage_km, cost, notes || null]
  );
  return await getServiceRecordById(result.insertId);
}

async function updateServiceRecord(id, data) {
  const existing = await getServiceRecordById(id);
  if (!existing) return null;

  const updated = {
    vehicle_id: data.vehicle_id ?? existing.vehicle_id,
    service_type_id: data.service_type_id ?? existing.service_type_id,
    service_date: data.service_date ?? existing.service_date,
    mileage_km: data.mileage_km ?? existing.mileage_km,
    cost: data.cost ?? existing.cost,
    notes: data.notes ?? existing.notes
  };

  await db.query(
    `UPDATE service_records
        SET vehicle_id = ?, service_type_id = ?, service_date = ?,
            mileage_km = ?, cost = ?, notes = ?
      WHERE id = ?`,
    [
      updated.vehicle_id,
      updated.service_type_id,
      updated.service_date,
      updated.mileage_km,
      updated.cost,
      updated.notes,
      id
    ]
  );
  return await getServiceRecordById(id);
}

async function deleteServiceRecord(id) {
  const [result] = await db.query('DELETE FROM service_records WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = {
  getAllServiceRecords,
  getServiceRecordById,
  createServiceRecord,
  updateServiceRecord,
  deleteServiceRecord
};
