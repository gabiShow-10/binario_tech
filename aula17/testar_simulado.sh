#!/bin/bash

# Faz a requisição capturando apenas o HTTP Status Code e salva no log
STATUS_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/v1/health)

echo "[$(date '+%Y-%m-%d %H:%M:%S')] HTTP Status Code: $STATUS_CODE" >> health_check.log
echo "Status $STATUS_CODE registrado em health_check.log"
