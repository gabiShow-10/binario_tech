const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3013;
const ARQUIVO_DADOS = path.join(__dirname, 'ocorrencias.json');

app.use(cors());
app.use(express.json());

//Funcao Auxiliar: Ler arquivo json

async function lerOcorrencias() {
	try {
		const dados = await fs.readFile(ARQUIVO_DADOS, 'utf-8');
		return JSON.parse(dados);
	} catch (erro) {
		//se o arquivo nao existir, retorna array vazio e cria o arquivo
		await fs.writeFile(ARQUIVO_DADOS, '[]', 'utf-8');
		return [];
	}
}

// Funcao Auxiliar: Salvar no Arquivo JSON

async function salvarOcorrencias(ocorrencias) {
	await fs.writeFile(ARQUIVO_DADOS, JSON.stringify(ocorrencias, null, 2), 'utf-8');
}

// ROTA 1: Listar todas as ocorrencias

app.get('/api/v1/ocorrencias', async (req, res) => {
	try {
		const ocorrencias = await lerOcorrencias();
		res.status(200).json(ocorrencias);
	} catch (erro) {
		res.status(500).json({ erro: "Erro ao ler base de dados em disco."});
	}
});

//ROTA 2: Cadastrar nova ocorrencia na frota
app.post('/api/v1/ocorrencias', async (req, res) => {
	try {
		const { montadora, placa, descricao, gravidade } = req.body;

		if (!montadora || !placa || !descricao) {
			return res.status(400).json({ erro: "Montadora, placa e descricao sao obrigatorios."
			});
		}

		const ocorrencias = await lerOcorrencias();
		const novaOcorrencia = {
			id: Date.now(),
			montadora,
			placa,
			descricao,
			gravidade: gravidade || "MEDIA",
			data_registro: new Date().toISOString()
		};

		ocorrencias.push(novaOcorrencia);
		await salvarOcorrencias(ocorrencias);

		res.status(201).json(novaOcorrencia);
	} catch (erro) {
		res.status(500).json({ erro: "Erro ao salvar ocorrencia em disco." });
	}
});

// ROTA 3: Buscar ocorrencias por montadora
app.get('/api/v1/ocorrencias/montadora/:nome', async (req, res) => {
    try {
        const { nome } = req.params;
        const ocorrencias = await lerOcorrencias();
        const resultado = [];

        // Percorre a lista e guarda só o que for igual ao nome recebido
        for (let i = 0; i < ocorrencias.length; i++) {
            if (ocorrencias[i].montadora === nome) {
                resultado.push(ocorrencias[i]);
            }
        }

        res.status(200).json(resultado);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao buscar por montadora." });
    }
});

// ROTA 4: Remover ocorrencia pelo ID
app.delete('/api/v1/ocorrencias/:id', async (req, res) => {
    try {
        const idParaRemover = Number(req.params.id);
        const ocorrencias = await lerOcorrencias();
        const novaLista = [];
        let encontrou = false;

        // Percorre a lista e copia apenas os itens que NAO sao o ID buscado
        for (let i = 0; i < ocorrencias.length; i++) {
            if (ocorrencias[i].id === idParaRemover) {
                encontrou = true;
            } else {
                novaLista.push(ocorrencias[i]);
            }
        }

        // Se nao encontrou nenhum item com esse ID
        if (!encontrou) {
            return res.status(404).json({ erro: "Ocorrencia nao encontrada." });
        }

        // Salva a nova lista sem o item removido
        await salvarOcorrencias(novaLista);

        res.status(200).json({ mensagem: "Ocorrencia removida com sucesso." });
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao remover ocorrencia." });
    }
});

app.listen(PORT, () => {
	console.log(`[Binario Tech] API de Ocorrencia ativa na porta ${PORT}`);
});
