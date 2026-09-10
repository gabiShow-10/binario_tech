module.exports = (req, res, next) => {
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(415).json({
        status: "ERRO_CONTENT_TYPE",
        mensagem: "O cabeçalho Content-Type deve ser application/json para este método."
      });
    }
  }
  next();
};
