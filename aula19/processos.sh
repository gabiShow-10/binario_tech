echo "=========================================="
echo " LISTA DE PROCESSOS ATIVOS - BINARIO TECH"
echo "=========================================="

echo "Salvando todos os processos ativos do pm2..."

pm2 save

sleep 2

echo "Gerando log atualizado..."

pm2 status > /home/gabriel.barbosa/binario_tech/aula19/processos.log

sleep 2

echo "resultado:"

cat /home/gabriel.barbosa/binario_tech/aula19/processos.log

