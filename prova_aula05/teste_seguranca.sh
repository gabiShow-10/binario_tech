
#!/bin/bash

LOG_FILE="audit_seguranca.log"
URL="http://localhost:3013/api/v1"
CHAVE_VALIDA="binario-tech-secret-2026"

echo "====================================" > "$LOG_FILE"
echo " AUDITORIA DE SEGURANCA - BINARIO TECH" >> "$LOG_FILE"
echo "====================================" >> "$LOG_FILE"

echo -e "\n1. ACESSO SEM CHAVE (esperado: 401)" >> "$LOG_FILE"
curl -s -i "$URL/motoristas" >> "$LOG_FILE"

echo -e "\n2. ACESSO COM CHAVE INVALIDA (esperado: 401)" >> "$LOG_FILE"
curl -s -i -H "X-API-KEY: chave-errada" "$URL/motoristas" >> "$LOG_FILE"

echo -e "\n3. CADASTRO COM CNH INVALIDA (esperado: 400)" >> "$LOG_FILE"
curl -s -i -X POST "$URL/motoristas" \
  -H "Content-Type: application/json" \
  -H "X-API-KEY: $CHAVE_VALIDA" \
  -d '{"nome":"Teste","cnh":"123","categoria":"B"}' >> "$LOG_FILE"

echo -e "\n4. ROTA INEXISTENTE (esperado: 404)" >> "$LOG_FILE"
curl -s -i -H "X-API-KEY: $CHAVE_VALIDA" "$URL/clientes" >> "$LOG_FILE"

echo -e "\n5. CONSULTA DE MOTORISTAS (esperado: 200)" >> "$LOG_FILE"
curl -s -i -H "X-API-KEY: $CHAVE_VALIDA" "$URL/motoristas" >> "$LOG_FILE"

echo -e "\n6. CADASTRO DE MOTORISTA (esperado: 201)" >> "$LOG_FILE"
curl -s -i -X POST "$URL/motoristas" \
  -H "Content-Type: application/json" \
  -H "X-API-KEY: $CHAVE_VALIDA" \
  -d '{"nome":"Motorista Teste","cnh":"12345678901","categoria":"B"}' >> "$LOG_FILE"

echo -e "\n7. CONSULTA DE MANUTENCOES (esperado: 200)" >> "$LOG_FILE"
curl -s -i -H "X-API-KEY: $CHAVE_VALIDA" "$URL/manutencoes" >> "$LOG_FILE"

echo -e "\n8. CADASTRO DE MANUTENCAO" >> "$LOG_FILE"
curl -s -H "X-API-KEY: binario-tech-secret-2026" -X POST http://localhost:3013/api/v1/manutencoes \
  -H "Content-Type: application/json" \
  -d '{"veiculo":"SCA-0001","descricao":"Troca de oleo","valor":350}' | jq . >> "$LOG_FILE"
echo -e "\nAuditoria finalizada. Resultado salvo em $LOG_FILE"

