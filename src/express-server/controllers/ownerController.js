const service = require('../services/ownerService');

async function getAll(req, res, next) {
  try {
    const filters = {
      name: req.query.name
    };
    const result = await service.getAllOwners(filters);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const id = req.params.id;
    const result = await service.getOwnerById(id);
    if (!result) {
      return res.status(404).json({ message: 'Proprietário não encontrado' });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const result = await service.createOwner(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const id = req.params.id;
    const result = await service.updateOwner(id, req.body);
    if (!result) {
      return res.status(404).json({ message: 'Proprietário não encontrado' });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const id = req.params.id;
    const ok = await service.deleteOwner(id);
    if (!ok) {
      return res.status(404).json({ message: 'Proprietário não encontrado' });
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
