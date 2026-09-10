#!/bin/bash

LOG_FILE="audit_seguranca.log"
URL="http://localhost:3013/api/v1/motoristas"
CHAVE_VALIDA="binario-tech-secret-2026"

echo "=== AUDIT DE SEGURANCA ===" > "$LOG_FILE"

for i in {1..3}; do
    echo "--- Tentativa $i sem chave ---" >> "$LOG_FILE"
    curl -s -i "$URL" >> "$LOG_FILE"
    echo -e "\n" >> "$LOG_FILE"
done

echo "--- Tentativa com chave valida ---" >> "$LOG_FILE"
curl -s -i -H "X-API-KEY: $CHAVE_VALIDA" "$URL" >> "$LOG_FILE"
echo -e "\n" >> "$LOG_FILE"
