#!/bin/bash
echo "=================================================="
echo "    LIMPEZA DE AMBIENTE DOCKER - BINÁRIO TECH"
echo "=================================================="

echo "[1/2] Removendo containers inativos (exited/created)..."
docker container prune -f --filter "status=exited"

echo "[2/2] Removendo imagens pendentes (dangling images <none>)..."
docker image prune -f --filter "dangling=true"

echo "=================================================="
echo "Limpeza concluída com sucesso!"
echo "=================================================="
