const express = require('express');
const router = express.Router();
const controller = require('../controllers/mechanicController');

// CRUD básico de mecânicos
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

// Obter serviços de um mecânico (relação M:N)
router.get('/:id/service-records', controller.getServiceRecordsByMechanic);

module.exports = router;
