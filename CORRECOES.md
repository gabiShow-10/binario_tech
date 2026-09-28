# Correções — Binário Tech

Este pacote tem **só os arquivos que precisavam de correção**, na mesma estrutura de pastas do seu projeto (`aulaXX/caminho/arquivo`). Testei cada um de verdade (rodando o servidor e chamando as rotas) antes de colocar aqui.

## Como aplicar

Extraia este zip dentro da pasta raiz do seu projeto (`binario_tech/`), substituindo os arquivos quando o sistema perguntar. Como os caminhos são idênticos aos do seu projeto, cada arquivo cai automaticamente no lugar certo.

```bash
cd binario_tech
unzip -o binario_tech_correcoes.zip
```

(o `-o` sobrescreve sem perguntar; se preferir revisar antes, tire o `-o` e confirme arquivo por arquivo)

## O que mudou em cada arquivo

| Arquivo | O que era | O que virou | Testado |
|---|---|---|---|
| `aula07/src/routes/scaniaRoutes.js` | `require('../middleware/validaVin')` (pasta errada) + `validaVin` nunca era usado na rota | caminho corrigido para `../middlewares/validaVin` + `validaVin` aplicado no `POST /` | ✅ servidor sobe, VIN inválido → 400, VIN válido → 201 |
| `aula07/src/routes/mercedesRoutes.js` | faltava `module.exports = router` | linha adicionada no final | ✅ `GET /api/v1/telemetria/mercedes` → 200 |
| `aula08/testar_banco.sh` | passo `[2]` com `Content-Type: application.json` (typo) | corrigido para `application/json` | ✅ passo `[2]` agora cadastra com sucesso |
| `aula09/src/controllers/telemetriaController.js` | `registrarLeitura` tentava gravar `latitude`, `longitude` e `data_hora`, colunas que não existem na tabela | esses 3 campos removidos do insert e do retorno | ✅ `POST /telemetria` → 201 (antes dava 500) |
| `aula13/src/middlewares/validarRequisicao.js` | continha a lógica de checagem de `Content-Type` (duplicada de `validarContentType.js`) em vez de checar o `express-validator` | reescrito para usar `validationResult(req)` e devolver `422` | ✅ payload inválido → 422, payload válido → 201 |
| `aula17/testar_simulado.sh` | testava `http://localhost:3000/...` | corrigido para `http://localhost:3013/...` | ✅ grava `200` no log (antes gravava `000`) |
| `aula18/.env` | não existia (ignorado pelo `.gitignore`, de propósito) | arquivo novo, com `PORT`, `MONGO_URI` (`127.0.0.1`) e `JWT_SECRET` | ✅ variáveis carregam e o `jwt.sign` funciona (antes quebrava por `JWT_SECRET` undefined) |
| `aula19/monitorar_pm2.sh` | lia `pm2_env_restart_time` (sem o ponto) → sempre `null` | corrigido para `pm2_env.restart_time` | ✅ testado com um crash real: mostrou `1` corretamente |

## Observações

- **`aula18/.env`**: os valores de `MONGO_URI` e `JWT_SECRET` são os mesmos sugeridos no README (não são segredos reais nem nada específico da sua conta) — se a prova usar outro valor de chave/URI, é só editar esse arquivo.
- **`aula19/monitorar_pm2.sh`**: continua assumindo que o processo se chama `api-telemetria` na linha final (`pm2 restart api-telemetria`). Se você estiver usando o `ecosystem.config.js`, os nomes reais são `api-telemetria-dev`/`api-telemetria-prod` — troque essa linha para o nome certo se for o caso.
- Nenhum outro arquivo do projeto foi tocado — só estes 8.
- O `README.md` principal (o guia completo da disciplina) continua explicando cada um desses bugs em detalhe, útil pra entender o "porquê" caso a prova caia bem nessas aulas.
