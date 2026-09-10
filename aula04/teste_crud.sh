#!/bin/bash
LOG_FILE="crud_result.log"

echo "=== INICIANDO TESTES CRUD - $(date) ===" > $LOG_FILE

echo -e "\n1. Cadastrando Veículo 1 (DAF)..." >> $LOG_FILE
curl -s -X POST http://localhost:3013/api/v1/veiculos -H "Content-Type: application/json" -d '{"placa":"ABC-9999","montadora":"DAF","modelo":"XF"}' | jq . >> $LOG_FILE

echo -e "\n2. Cadastrando Veículo 2 (Iveco)..." >> $LOG_FILE
curl -s -X POST http://localhost:3013/api/v1/veiculos -H "Content-Type: application/json" -d '{"placa":"XYZ-8888","montadora":"Iveco","modelo":"Hi-Way"}' | jq . >> $LOG_FILE

echo -e "\n3. Atualizando status do Veículo ID 3..." >> $LOG_FILE
curl -s -X PATCH http://localhost:3013/api/v1/veiculos/3/status -H "Content-Type: application/json" -d '{"status":"EM_ROTA"}' | jq . >> $LOG_FILE

echo -e "\n4. Deletando Veículo ID 4..." >> $LOG_FILE
curl -s -X DELETE http://localhost:3013/api/v1/veiculos/4 | jq . >> $LOG_FILE

echo -e "\n=== TESTES FINALIZADOS DE FORMA SEQUENCIAL ===" >> $LOG_FILE
