const express = require('express');
const controller = require('../controllers/serviceRecordController');
const mechanicController = require('../controllers/mechanicController');

const router = express.Router();

// CRUD básico de service records
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

// Endpoints para relação M:N com mecânicos
router.get('/:serviceRecordId/mechanics', mechanicController.getMechanicsByServiceRecord);
router.post('/:serviceRecordId/mechanics/:mechanicId', mechanicController.assignToServiceRecord);
router.delete('/:serviceRecordId/mechanics/:mechanicId', mechanicController.removeFromServiceRecord);

module.exports = router;
