exports.seed = async function(knex) {
  await knex('veiculos').insert([
    {
      montadora: 'Mercedes-Benz',
      modelo: 'Accelo 1016',
      placa: 'MBB2E45'
    },
    {
      montadora: 'DAF',
      modelo: 'XF 530',
      placa: 'DAF9F88'
    }
  ]);
};
