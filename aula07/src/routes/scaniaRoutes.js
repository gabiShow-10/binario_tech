const express = require('express');
const router = express.Router();
const scaniaController = require('../controllers/scaniaController');
const validaVin = require('../middleware/validaVin');

router.get('/', scaniaController.listarTelemetria);
router.post('/', scaniaController.registrarTelemetria);

module.exports = router;
