const express = require('express');
const cors = require('cors');
const veiculoRoutes = require('./src/routes/veiculoRoutes');
const gerenciadorErros = require('./src/middlewares/gerenciadorErros');
const validarContentType = require('./src/middlewares/validarContentType'); // Import do middleware

const app = express();
const PORT = 3013;

app.use(cors());
app.use(express.json());

// Aplicando o middleware customizado globalmente para checar Content-Type
app.use(validarContentType);

// Rotas da Aplicação
app.use('/api/v1/veiculos', veiculoRoutes);

// Rota 404 e Middleware Global de Erros...
app.use((req, res) => {
  res.status(404).json({ status: "NAO_ENCONTRADO", mensagem: "Endpoint não encontrado na API." });
});

app.use(gerenciadorErros);

app.listen(PORT, () => {
  console.log(`[Binário Tech] Servidor de Validações Aula 13 ativo na porta ${PORT}`);
});
