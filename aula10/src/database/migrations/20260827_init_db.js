exports.up = function(knex) {
  return knex.schema
    .createTable('veiculos', function(table) {
      table.increments('id').primary();
      table.string('placa').notNullable().unique();
      table.string('montadora').notNullable();
      table.string('modelo').notNullable();
    })
    .createTable('telemetria', function(table) {
      table.increments('id').primary();
      table.integer('veiculo_id').unsigned().notNullable();
      table.foreign('veiculo_id').references('id').inTable('veiculos').onDelete('CASCADE');
      table.float('velocidade').notNullable();
      table.float('temperatura_motor').notNullable(); // <-- Verifique esta linha
      table.timestamp('capturado_em').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('telemetria')
    .dropTableIfExists('veiculos');
};
