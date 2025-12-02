const service = require('../services/mechanicService');

async function getAll(req, res, next) {
  try {
    const filters = {
      name: req.query.name,
      specialization: req.query.specialization
    };
    const result = await service.getAllMechanics(filters);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const id = req.params.id;
    const result = await service.getMechanicById(id);
    if (!result) {
      return res.status(404).json({ message: 'Mecânico não encontrado' });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const result = await service.createMechanic(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const id = req.params.id;
    const result = await service.updateMechanic(id, req.body);
    if (!result) {
      return res.status(404).json({ message: 'Mecânico não encontrado' });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const id = req.params.id;
    const ok = await service.deleteMechanic(id);
    if (!ok) {
      return res.status(404).json({ message: 'Mecânico não encontrado' });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

// ========== Endpoints para relação M:N ==========

async function getMechanicsByServiceRecord(req, res, next) {
  try {
    const serviceRecordId = req.params.serviceRecordId;
    const result = await service.getMechanicsByServiceRecord(serviceRecordId);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function getServiceRecordsByMechanic(req, res, next) {
  try {
    const mechanicId = req.params.id;
    const result = await service.getServiceRecordsByMechanic(mechanicId);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function assignToServiceRecord(req, res, next) {
  try {
    const serviceRecordId = req.params.serviceRecordId;
    const mechanicId = req.params.mechanicId;
    const result = await service.assignMechanicToServiceRecord(serviceRecordId, mechanicId);
    if (!result) {
      return res.status(409).json({ message: 'Mecânico já está atribuído a este serviço' });
    }
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

async function removeFromServiceRecord(req, res, next) {
  try {
    const serviceRecordId = req.params.serviceRecordId;
    const mechanicId = req.params.mechanicId;
    const ok = await service.removeMechanicFromServiceRecord(serviceRecordId, mechanicId);
    if (!ok) {
      return res.status(404).json({ message: 'Relação não encontrada' });
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
  remove,
  getMechanicsByServiceRecord,
  getServiceRecordsByMechanic,
  assignToServiceRecord,
  removeFromServiceRecord
};
