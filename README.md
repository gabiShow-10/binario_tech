Binário Tech

Projeto desenvolvido ao longo das aulas da disciplina, com APIs em Node.js/Express e scripts de terminal (Shell).

Alterações realizadas
1. Mudança da porta: 3000 → 3013

O projeto foi originalmente desenvolvido no Google Cloud Shell, usando a porta padrão 3000. Com a migração para execução no terminal local, cada aluno passou a utilizar uma porta individual correspondente ao seu número de chamada. Neste projeto, a porta utilizada é a 3013.

A alteração foi aplicada em:

Tipo de arquivo	Aulas afetadas
Servidores (server.js, servidor.js, app.js, frota_api.js, ocorrencias_api.js)	02, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 16
Variáveis de ambiente (.env)	11, 12, 14
Scripts de teste (testar_*.sh, teste_*.sh, auditoria_*.sh, limpar_dados.sh)	02, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14

Exceção: a aula 03 (telemetria.js) utiliza a porta 3001. Essa porta foi definida propositalmente desde o início para permitir que o servidor de telemetria rodasse em paralelo ao servidor principal, portanto não foi alterada.

2. Padronização dos nomes de arquivos

Alguns arquivos de atividade estavam com o nome corrompido por diferença de codificação entre sistemas (ex.: FIXA#U00c7#U00c3O em vez de FIXAÇÃO), o que causava erros ao copiar e ao versionar no Git.

Os nomes foram padronizados removendo acentos e caracteres especiais (ç, ã, õ, |, :), já que esses símbolos têm significado próprio no terminal e geram problemas de compatibilidade.

Exemplo:

Antes:  Aula 14: Autentica#U00e7#U00e3o Stateless com JWT (JSON Web Token)...
Depois: Aula 14 - Autenticacao Stateless com JWT (JSON Web Token)...
Como executar

Cada aula é um projeto independente. Para rodar qualquer uma delas:

bash
cd aula0X            # substitua X pelo número da aula
npm install          # instala as dependências
node server.js       # o nome do arquivo varia conforme a aula

O servidor ficará disponível em http://localhost:3013.

Para executar os testes automatizados da aula (quando houver):

bash
bash testar_*.sh
Observação sobre as aulas 11, 12 e 17

Essas aulas utilizam MongoDB e exigem que o banco esteja rodando localmente em 127.0.0.1:27017 antes de iniciar o servidor. As demais aulas que usam banco de dados (08, 09, 10) utilizam SQLite, que é embarcado e não exige instalação de servidor adicional. Para isso, sempre que for usado o mongoose, rode o comando: 'docker run -d -p 27017:27017 --name mongo-simulado mongo:latest' (padrão utilizado na aula 17).

Comandos para o mongo:
Ver se ele está rodando:

Bash
docker ps
Parar o banco de dados:

Bash
docker stop mongo-simulado
Ligar o banco de dados de novo (sem precisar recriar):

Bash
docker start mongo-simulado
Apagar o container:

Bash
docker rm -f mongo-simulado

Tecnologias utilizadas
Node.js + Express
Shell Script (Bash)
SQLite3 + Knex.js (aulas 08 a 10)
MongoDB + Mongoose (aulas 11 e 12)
JWT + Bcrypt (aula 14)
Express-Validator (aula 13)
