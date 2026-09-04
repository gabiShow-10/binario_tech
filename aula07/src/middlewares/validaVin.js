const validaVin = (req, res, next) => {
    const { vin } = req.body;

    if (!vin || typeof vin !== 'string' || vin.trim().length !== 12) {
        return res.status(400).json({
            erro: "Validação recusada: O código VIN é obrigatório e deve ter exatamente 12 caracteres."
        });
    }

    next();
};

module.exports = validaVin;
