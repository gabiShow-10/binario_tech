const express = require('express');
const router = express.Router();
const frotaController = require('../controllers/frotaController');

// Rotas mapeadas com os nomes exatos do seu controller
router.get('/relatorio', frotaController.listarTudo);
router.post('/veiculo-teste', frotaController.cadastrarVeiculo);

module.exports = router;
