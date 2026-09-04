#!/bin/bash

LOG_FILE="auditoria.log"

echo "====================================================" > "$LOG_FILE"
echo " RELATÓRIO DE AUDITORIA DE TELEMETRIA - BINÁRIO TECH" >> "$LOG_FILE"
echo " Data/Hora: $(date)" >> "$LOG_FILE"
echo "====================================================" >> "$LOG_FILE"

echo -e "\n[1] Telemetria Scania:" >> "$LOG_FILE"
curl -s http://localhost:3000/api/v1/telemetria/scania | jq . >> "$LOG_FILE"

echo -e "\n[2] Telemetria Mercedes-Benz:" >> "$LOG_FILE"
curl -s http://localhost:3000/api/v1/telemetria/mercedes | jq . >> "$LOG_FILE"

echo -e "\n[3] Teste de Registro Inválido na Scania (VIN Incorreto):" >> "$LOG_FILE"
curl -s -X POST http://localhost:3000/api/v1/telemetria/scania \
  -H "Content-Type: application/json" \
  -d '{"modelo":"R500","vin":"INVALIDO","temperatura_motor":90}' | jq . >> "$LOG_FILE"

echo -e "\n[4] Teste de Endpoint 404 (Volvo):" >> "$LOG_FILE"
curl -s http://localhost:3000/api/v1/telemetria/volvo | jq . >> "$LOG_FILE"

echo -e "\nAuditoria concluída! Verifique os detalhes em '$LOG_FILE'."
