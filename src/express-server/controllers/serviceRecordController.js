const service = require('../services/serviceRecordService');

async function getAll(req, res, next) {
  try {
    const filters = {
      vehicle_id: req.query.vehicle_id,
      service_type_id: req.query.service_type_id
    };
    const result = await service.getAllServiceRecords(filters);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const id = req.params.id;
    const result = await service.getServiceRecordById(id);
    if (!result) {
      return res.status(404).json({ message: 'Registo de serviço não encontrado' });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const result = await service.createServiceRecord(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const id = req.params.id;
    const result = await service.updateServiceRecord(id, req.body);
    if (!result) {
      return res.status(404).json({ message: 'Registo de serviço não encontrado' });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const id = req.params.id;
    const ok = await service.deleteServiceRecord(id);
    if (!ok) {
      return res.status(404).json({ message: 'Registo de serviço não encontrado' });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
