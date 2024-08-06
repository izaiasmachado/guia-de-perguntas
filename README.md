<h1 align="center"><img width="500px" src="docs/img/logo-full.svg"></h1>

<p align="center">
  <strong>O mais novo guia de perguntas!</strong>
</p>

O projeto consiste em um fórum, em que podem ser postadas perguntas e feitas respostas. A aplicação foi hospedada em um [ambiente de testes](https://queueunderflow-test.izaias.me) e também em um [ambiente de produção](https://queueunderflow.izaias.me). Além disso, foi disponizado [um relatório técnico da aplicação](./docs/relatorio.pdf).

## Arquitetura da Solução

![Arquitetura da solução](./docs/img/architecture.png)

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes componentes instalados em sua máquina.

- **Node.js** (versão 20.9.0): [Download Node.js](https://nodejs.org/)
- **MySQL**: [Download MySQL](https://dev.mysql.com/downloads/)
- **Docker** (Download alternativo ao MySQL): [Download Docker](https://www.docker.com/get-started)

## Tecnologias Utilizadas

- BCrypt
- JSONWebToken
- Prisma.js
- EJS
- Bootstrap 5.3
- Express.js

## Como executar o projeto localmente

1. Clone o projeto na sua máquina local `git clone https://github.com/izaiasmachado/guia-de-perguntas.git`
2. Modifique o nome do arquivo `.env.example` para `.env`
3. Caso deseje usar Docker para rodar o banco execute `docker compose up -d`
4. Instale as dependências do projeto `npm install`
5. Execute as migrations no banco de dados `npx prisma db push`
6. Execute o comando para rodar a aplicação localmente `npm run dev`
7. Acesse a aplicação em `http://localhost:3333`

**Obs:** Caso deseje hospedar um banco próprio, altere o arquivo `.env` com as credenciais desse banco.

## Equipe

| <img src="https://avatars0.githubusercontent.com/u/108894922?v=3&s=115" width = "120px"><br><strong>Gabriel Vasconcelos</strong> | <img src="https://avatars0.githubusercontent.com/u/47287096?v=3&s=115" width = "120px" ><br><strong>Izaias Machado</strong> | <img src="https://avatars.githubusercontent.com/u/66041553?v=4" width = "120px" ><br><strong>Marcos Vinícius</strong> | <img src="https://avatars0.githubusercontent.com/u/70725719?v=3&s=115" width = "120px"><br><strong>William Lima</strong> | <img src="https://avatars0.githubusercontent.com/u/112739407?v=3&s=115" width = "120px"><br><strong>Yann Lucca</strong> |
| :------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------: |
|                                [LinkedIn](https://www.linkedin.com/in/gabrielvasconcelossantos/)                                 |                                   [LinkedIn](https://www.linkedin.com/in/izaiasmachado/)                                    |                         [LinkedIn](https://www.linkedin.com/in/marcosvinciusandradedesousa/)                          |                               [LinkedIn](https://www.linkedin.com/in/william-bruno-sales/)                               |                                    [LinkedIn](https://linkedin.com/in/yann-miranda)                                     |
|                                               [GitHub](https://github.com/GabVS4)                                                |                                         [GitHub](https://github.com/izaiasmachado)                                          |                                      [GitHub](https://github.com/MarcosVini9999)                                      |                                        [GitHub](https://github.com/williambrunos)                                        |                                          [GitHub](https://github.com/yannluk4)                                          |
