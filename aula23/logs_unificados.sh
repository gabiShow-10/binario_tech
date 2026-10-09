#!/bin/bash
echo "=================================================="
echo "    MONITORAMENTO DE LOGS UNIFICADOS - REDIS + API"
echo "=================================================="
docker compose logs -f --tail=20
