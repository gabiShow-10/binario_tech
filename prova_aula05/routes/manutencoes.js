const express = require('express');
const router = express.Router();

let manutencoes = [];

router.get('/', (req, res) => res.status(200).json(manutencoes));

router.post('/', (req, res) => {
    const { veiculo, descricao, valor } = req.body;
    if (!veiculo || !descricao || !valor) {
        return res.status(400).json({ erro: "Campos obrigatórios ausentes." });
    }
    const nova = { id: manutencoes.length + 1, veiculo, descricao, valor };
    manutencoes.push(nova);
    res.status(201).json(nova);
});

module.exports = router;
