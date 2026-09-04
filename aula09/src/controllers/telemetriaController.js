const db = require('../database/connection');

module.exports = {
  // EXERCÍCIO 1: Retorna leituras de um veículo específico pelo ID
  async buscarPorVeiculo(req, res) {
    try {
      const { id } = req.params;

      const veiculo = await db('veiculos').where({ id }).first();
      if (!veiculo) {
        return res.status(404).json({ erro: 'Veículo não encontrado.' });
      }

      const leituras = await db('telemetria').where({ veiculo_id: id });
      return res.json(leituras);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro interno no servidor.' });
    }
  },

  // EXERCÍCIO 2: Valida se o veículo existe antes de registrar a leitura
  async registrarLeitura(req, res) {
    try {
      const { veiculo_id, temperatura_motor, velocidade, latitude, longitude } = req.body;

      const veiculo = await db('veiculos').where({ id: veiculo_id }).first();
      if (!veiculo) {
        return res.status(404).json({ erro: 'Veículo não encontrado para o ID informado.' });
      }

      const [id] = await db('telemetria').insert({
        veiculo_id,
        temperatura_motor,
        velocidade,
        latitude,
        longitude,
        data_hora: new Date()
      });

      return res.status(201).json({ id, veiculo_id, temperatura_motor, velocidade, latitude, longitude });
    } catch (error) {
      return res.status(500).json({ erro: 'Erro interno ao salvar leitura de telemetria.' });
    }
  },

  // EXERCÍCIO 3: Filtro por Query Parameter ?alerta=true
  async listarRelatorioCompleto(req, res) {
    try {
      const { alerta } = req.query;

      let query = db('telemetria')
        .join('veiculos', 'telemetria.veiculo_id', '=', 'veiculos.id')
        .select(
          'telemetria.*',
          'veiculos.placa',
          'veiculos.modelo',
          'veiculos.montadora'
        );

      if (alerta === 'true') {
        query = query.where('telemetria.temperatura_motor', '>', 95);
      }

      const relatorio = await query;
      return res.json(relatorio);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro interno ao gerar relatório.' });
    }
  }
};
