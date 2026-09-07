const autorizarPerfil = (perfisPermitidos = []) => {
  return (req, res, next) => {
    // req.usuario é injetado previamente pelo middleware autenticarToken
    if (!req.usuario || !req.usuario.perfil) {
      return res.status(403).json({ 
        status: "ERRO", 
        mensagem: "Acesso negado. Informações de perfil ausentes." 
      });
    }

    const possuiPermissao = perfisPermitidos.includes(req.usuario.perfil);

    if (!possuiPermissao) {
      return res.status(403).json({ 
        status: "ERRO", 
        mensagem: `Acesso negado. Perfil '${req.usuario.perfil}' não tem permissão para acessar este recurso.` 
      });
    }

    next();
  };
};

module.exports = autorizarPerfil;
