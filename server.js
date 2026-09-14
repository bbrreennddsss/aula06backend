const express = require('express');
const app = express();
const PORT = 3000;
const veiculos = [];

// Middleware para ler JSON no corpo das requisições
app.use(express.json());

// Rota para Listar todos os Veículos (GET)
app.get('/veiculos', (req, res) => {
    return res.status(200).json(veiculos);
});

// Rota para Cadastrar um Novo Veículo (POST)
app.post('/veiculos', (req, res) => {
    const { nome, preco } = req.body || {};

    // Valida se nome e preço foram informados e se o preço é um número válido
    if (!nome || preco === undefined || Array.isArray(nome) || isNaN(Number(preco))) {
        return res.status(400).json({ 
            mensagem: 'Nome e Preço válidos são obrigatórios.' 
        });
    }

    const novoVeiculo = {
        id: veiculos.length > 0 ? veiculos[veiculos.length - 1].id + 1 : 1, 
        nome: String(nome),
        preco: Number(preco)
    };

    veiculos.push(novoVeiculo);

    return res.status(201).json({
        mensagem: 'Veículo cadastrado com sucesso!',
        veiculo: novoVeiculo
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em  http://localhost:${PORT}`);
});