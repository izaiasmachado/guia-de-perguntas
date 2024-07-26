## Como executar o projeto localmente

1. Clone o projeto na sua máquina local:

`````bash
git clone https://github.com/izaiasmachado/guia-de-perguntas.git
`````

2. Modifique o nome do arquivo `.env.example` para `.env`
3. Execute o seguinte comando para criar o container docker contendo o MySQL

````bash
docker compose up -d
````

4. Execute o seguinte comando para instalar as dependências do projeto

````bash
npm install
````

5. Execute o seguinte comando para executar as migrations e criar o banco de dados

````bash
npx prisma db push
````

6. Execute o seguinte comando para rodar a aplicação localmente

````bash
npm run dev
````