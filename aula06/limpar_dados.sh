#!/bin/bash

# Script de limpeza e reset do ambiente de testes
# Binario Tech - Aula 06

echo "=========================================="
echo "   LIMPANDO E RESETANDO AMBIENTE DE TESTES"
echo "=========================================="

# 1. Encerra o processo do Node.js
echo "[1/2] Encerrando processos do Node.js..."
pkill -f "node ocorrencias_api.js" 2>/dev/null || fuser -k 3000/tcp 2>/dev/null || true

# Breve pausa para garantir a liberação da porta
sleep 1

# 2. Exclui o arquivo ocorrencias.json
echo "[2/2] Removendo arquivo 'ocorrencias.json'..."
if [ -f "ocorrencias.json" ]; then
    rm -f ocorrencias.json
    echo " -> Arquivo 'ocorrencias.json' removido com sucesso!"
else
    echo " -> O arquivo 'ocorrencias.json' não existia no diretório atual."
fi

echo "=========================================="
echo " Ambiente resetado com sucesso!"
echo " Para reiniciar a API, rode: node ocorrencias_api.js"
echo "=========================================="
