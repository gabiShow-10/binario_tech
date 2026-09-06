const validarContentType = (req, res, next) => {
  // Executa a validação apenas para requisições do tipo POST
  if (req.method === 'POST') {
    const contentType = req.headers['content-type'];
    
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(400).json({
        status: "REQUISICAO_INVALIDA",
        mensagem: "O cabeçalho Content-Type deve ser obrigatoriamente 'application/json'."
      });
    }
  }
  next();
};

module.exports = validarContentType;
