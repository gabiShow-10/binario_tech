function tratarErros(err, req, res, next) {
  console.error(`[ERRO LOG]: ${err.message}`);

  // Exercício 2: Trata erro de sintaxe do JSON (ex: vírgula a mais, aspas não fechadas)
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ 
      erro: "O corpo da requisição contém um formato JSON inválido." 
    });
  }

  // Tratamento de conflito de chave única (ex: placa duplicada)
  if (err.message && err.message.includes('UNIQUE constraint failed')) {
    return res.status(409).json({ erro: "Conflito de dados: Registro já existe com este valor único (ex: Placa)." });
  }

  // Tratamento de chave estrangeira (ex: veículo inexistente)
  if (err.message && err.message.includes('FOREIGN KEY constraint failed')) {
    return res.status(400).json({ erro: "Erro de relacionamento: O registro pai fornecido nao existe." });
  }

  // Erro padrão do servidor
  return res.status(500).json({ erro: "Erro interno no servidor da Binário Tech." });
}

module.exports = tratarErros;
