echo "======================================"
echo " AUDITORIA DE SERVIDOR - BINARIO TECH"
echo "======================================"

echo "Listando o status de execucao de processos Node.js ativos no servidor..."

ps aux | grep node >> ./processos.log

sleep 2

echo "resultado:"
cat processos.log
