<img alt="GoStack" src="https://storage.googleapis.com/golden-wind/bootcamp-gostack/header-desafios.png" />

<h3 align="center">
  Desafio: Banco de dados e upload de arquivos NodeJS
</h3>

# Índice

- [Sobre](#sobre)
- [Como usar](#como-usar)
- [Critérios de aceite](#criterios)

<a id="sobre"></a>

## :memo: Sobre

O **Desafio** é uma API desenvolvida para realização de cadastro e listagem de transações bancárias que são salvas no banco de dados utilizando Postgres, também existe a execução dos métodos HTTP desenvolvidos com NodeJS, Typescript, Express e Multer para o envio de um arquivo .CSV que é configurado para falicitar o envio das transações do usuário.

A API foi construída durante o **Bootcamp GoStack** realizado pela [Rocketseat](https://rocketseat.com.br/).

<a id="como-usar"></a>

## :computer: Como usar

1 - Faça o download ou clone do projeto:

```sh
  $ git clone https://github.com/felipedesenna/gostack-typeorm-upload.git
```

2 - Executando o projeto:

```sh
  # Instale as dependências da aplicação
  $ npm install / yarn

  ## Back-end / API
  $ npm run dev:server / yarn dev:server

  ## Rodar migration DB
  $ npm run typeorm migration:run / yarn typeorm migration:run

  ## Executar test
  $ npm run test / yarn test
```
<a id="criterios"></a>

## :white_check_mark: Critérios de aceite

Para esse desafio os seguintes testes foram utilizados como critérios de aceite:

<strong>Antes de rodar os testes, crie um banco de dados com o nome "gostack_desafio06_tests" para que todos os testes possam executar corretamente</strong>

- **`should be able to create a new transaction`**: Para que esse teste passe, sua aplicação deve permitir que uma transação seja criada, e retorne um json com a transação criado.

* **`should create tags when inserting new transactions`**: Para que esse teste passe, sua aplicação deve permitir que ao criar uma nova transação com uma categoria que não existe, essa seja criada e inserida no campo category_id da transação com o `id` que acabou de ser criado.

- **`should not create tags when they already exists`**: Para que esse teste passe, sua aplicação deve permitir que ao criar uma nova transação com uma categoria que já existe, seja atribuído ao campo category_id da transação com o `id` dessa categoria existente, não permitindo a criação de categorias com o mesmo `title`.

* **`should be able to list the transactions`**: Para que esse teste passe, sua aplicação deve permitir que seja retornado um array de objetos contendo todas as transações junto ao balanço de income, outcome e total das transações que foram criadas até o momento.

- **`should not be able to create outcome transaction without a valid balance`**: Para que esse teste passe, sua aplicação não deve permitir que uma transação do tipo `outcome` extrapole o valor total que o usuário tem em caixa (total de income), retornando uma resposta com código HTTP 400 e uma mensagem de erro no seguinte formato: `{ error: string }`.

* **`should be able to delete a transaction`**: Para que esse teste passe, você deve permitir que a sua rota de delete exclua uma transação, e ao fazer a exclusão, ele retorne uma resposta vazia, com status 204.

- **`should be able to import transactions`**: Para que esse teste passe, sua aplicação deve permitir que seja importado um arquivo csv, contendo o seguinte [modelo](./assets/file.csv). Com o arquivo importado, você deve permitir que seja criado no banco de dados todos os registros e categorias que estavam presentes nesse arquivo, e retornar todas as transactions que foram importadas.

- ### **Observação**

  - É **necessário** possuir o **[Node.js](https://nodejs.org/en/download/)** instalado na máquina e para gerenciar os pacotes da aplicação o **[NPM](https://www.npmjs.com/get-npm)** ou **[Yarn](https://yarnpkg.com/getting-started/install)**.

  - Também é **importante** ter instalado o **[Docker](https://docs.docker.com/docker-for-windows/install/)** e **[DBeaver](https://dbeaver.io/download/)** para rodar e consultar o banco de dados do aplicativo.
