const service = require('../services/vehicleService');

async function getAll(req, res, next) {
  try {
    const filters = {
      brand: req.query.brand,
      owner_id: req.query.owner_id,
      year: req.query.year
    };
    const result = await service.getAllVehicles(filters);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const id = req.params.id;
    const result = await service.getVehicleById(id);
    if (!result) {
      return res.status(404).json({ message: 'Veículo não encontrado' });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const result = await service.createVehicle(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const id = req.params.id;
    const result = await service.updateVehicle(id, req.body);
    if (!result) {
      return res.status(404).json({ message: 'Veículo não encontrado' });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const id = req.params.id;
    const ok = await service.deleteVehicle(id);
    if (!ok) {
      return res.status(404).json({ message: 'Veículo não encontrado' });
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
