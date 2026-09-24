module.exports = {
  apps: [
    {
      name: 'api-telemetria-dev',
      script: 'server.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'development',
        PORT: 3013
      },
      watch: true, // Reinicia automaticamente ao alterar arquivos em ambiente de desenvolvimento
      ignore_watch: ['node_modules', 'logs'],
      max_memory_restart: '200M'
    },
    {
      name: 'api-telemetria-prod',
      script: 'server.js',
      instances: 'max', // Utiliza todos os núcleos disponíveis da CPU em cluster
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 8013
      },
      watch: false,
      max_memory_restart: '500M',
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss'
    }
  ]
};
