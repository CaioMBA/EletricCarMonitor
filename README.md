# GS MOBILE DEV - 2024
# INTEGRANTES: CAIO MANOEL BEZERRA DE ARAUJO (RM: 94778) | LUCAS FERRAZ MARTINS (RM: 94821) | GABRIEL FELIPE DE MARIA (RM: 94772)

# EletricCarMonitor
Sistema de monitoramento e gerenciamento de recarga de veículos elétricos, desenvolvido para um projeto acadêmico. Este repositório contém o front-end (React) e o back-end (API REST).

# 🛠️ Funcionalidades
# Front-End
Dashboard: Visualização de informações gerais sobre os carregadores.
Gerenciamento de recarga: Controle e monitoramento de sessões de recarga.
# Back-End
API REST para gerenciar dados e integrar com o front-end.
Endpoints para cadastro, consulta e gerenciamento de carregadores.
link documentação postman: https://github.com/CaioMBA/EletricCarMonitor/releases/tag/EletricCarMonitor-Documentation

# 🚀 Instalação e Uso
Pré-requisitos:
Node.js: Versão 14 ou superior.
NPM ou Yarn.
SqLite 
Instalação

# Clone o repositório:
# bash
git clone https://github.com/CaioMBA/EletricCarMonitor.git
cd EletricCarMonitor
Instale as dependências:

# bash
cd frontend
npm install
cd ../backend
npm install

# Configure as variáveis de ambiente:
No back-end, crie um arquivo .env com as variáveis:
JWT_SECRET=(arquivo sqlite local)
PORT=(porta desejada para o back-end)

No front-end, crie um arquivo .env com as variáveis:
REACT_APP_API_URL=(está deve ser igual a porta selecionada no .env do back-end)
# Execução

Inicie o back-end:
# bash
cd backend
npm start
Inicie o front-end:

# bash
cd frontend
npm start
Acesse o sistema no navegador: http://localhost:3000.

# 🌐 Endpoints da API
GET /stations: Retorna a lista de carregadores disponíveis.
POST /stations: Adiciona um novo carregador.
GET /vehicles: Retorna a lista de veículos cadastrados.
POST /vehicles: Adiciona um novo veículo.
GET /sessions: Lista sessões de recarga.
POST /sessions: Inicia uma nova sessão de recarga.
PUT /sessions/:id: Atualiza uma sessão existente.

# 🖥️ Telas do Front-End
Dashboard:

Exibe carregamentos ativos, energia limite e status de cada carregador.


# 📄 Licença
Este projeto está licenciado sob a MIT License.
