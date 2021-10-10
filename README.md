<h1 align="center">rest-tdd-knex-sqlite</h1>

<p align="center">
  <img src=".github/banner.png" alt="Página inicial">
</p>

## Tópicos 

[Sobre](#sobre)

[Tecnologias](#tecnologias)

[Instalação e uso](#instalação-e-uso)

[Endpoints](#endpoints)

[Licença](#licença)

  
## 💻 Sobre

Um crud básico feito em API REST com express, Node.js e SQLite, com o intuito de praticar os princípios de TDD nos endpoints.


## ✨ Tecnologias

As seguintes tecnologias foram utilizadas no desenvolvimento do projeto:

- [JavaScript](https://www.javascript.com/)
- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [SQLite3](https://www.sqlite.org/index.html)
- [Knex](http://knexjs.org/)
- [Jest](https://jestjs.io/pt-BR/)
- [Supertest](https://www.npmjs.com/package/supertest)
- [JWT](https://jwt.io/)


## 🚀 Instalação e uso


```bash
# Abra um terminal e copie este repositório com o comando
$ git clone https://github.com/jnorberto23/rest-tdd-knex-sqlite.git
# ou use a opção de download.

# Entre na pasta  
$ cd rest-tdd-knex-sqlite

# Instale as dependências
$ yarn install

# Execute as migrations do SQLite 
$ yarn knex:migrate 
# Execute o rollback das migrations do SQLite
$ yarn knex:migrate:rollback 

# Execute os testes dos endpoints com o Jest
$ yarn test

# Rode o servidor
$ yarn start
```


## Endpoints

  

### POST /user

  

Esse endpoint é responsável por inserir um usuario.

  

#### Parametros

  

name: nome do usuário.

  

email: e-mail do usuário.

  

nationality: nacionalidade do usuário.

  

password: senha do usuário.

  

Exemplo:

  

```
{
"name": "Nikola Tesla",
"email": "nikola.tesla@email.com",
"nationality": "austríaco",
"password": "nikolarocks"
}
```

  

#### Respostas

  

##### :heavy_check_mark: OK! 200  

  

Caso essa resposta aconteça você vai receber uma mensagem de sucesso, além do id gerado do usuario.

  

Exemplo de resposta:

  

```
{
"message": "Usuario cadastrado com sucesso!",
"id": 1
}
```

  

##### :x: Bad Request! 400 

  

Caso essa resposta aconteça, isso significa que esse e-mail informado já esta cadastrado no sistema.

  

Exemplo de resposta:

  

```
{
"error": "O e-mail já está cadastrado"
}
```

  

### POST /auth


Esse endpoint é responsável por retornar fazer o processo de login.

  

#### Parametros

  

email: e-mail do usuário cadastrado no sistema.

  

password: senha do usuário cadastrado no sistema, com aquele determinado e-mail.

  

Exemplo:

  

```
{
"email": "nikola.tesla@email.com",
"password": "nikolarocks"
}
```

  

#### Respostas

  

#####  :heavy_check_mark: OK! 200

  

Caso essa resposta aconteça você vai receber o token JWT para conseguir acessar endpoints protegidos na API.

  

Exemplo de resposta:

  

```
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pa29sYS50ZXNsYUBlbWFpbC5jb20iLCJpZCI6MSwiaWF0IjoxNjMzODIwMTU5fQ.5JkC-YmES8c7PcmCshRcRBw43KrEzO10miupCmtASVI"
}
```

  

##### :x: Not Found! 404

  

Caso essa resposta aconteça, significa que o e-mail informado não está cadastrado no sistema.

  

Exemplo de resposta:

  

```
{
"error": "O e-mail não está cadastrado"
}
```

  

#####  :x: Bad Request! 400

  

Caso essa resposta aconteça, significa que a senha informado não é a mesma do e-mail cadastrado no sistema.

  

Exemplo de resposta:

  

```
{
"error": "A senha está incorreta."
}
```

  

### GET /user/:id

  

Esse endpoint é responsável por retornar um usuario cadastrado.

  

#### Parametros

  

Nenhum

  

#### Respostas

  

##### :heavy_check_mark: OK! 200

  

Caso essa resposta aconteça você vai recebar a listagem do usuário em questáo.

  

Exemplo de resposta:

  

```
{
"result": {
"id": 1,
"name": "Nikola Tesla",
"email": "nikola.tesla@email.com",
"nationality": "austríaco",
"date_created": "2021-10-09 22:43:54"
}
```

  

##### :x: Not Found! 404

  

Caso essa resposta aconteça, isso significa que o id de usuário informado não existe ou foi apagado.

  

Exemplo de resposta:

  

```
{
"error": "Nenhum usuário encontrado"
}
```

  

### Put /user/

  

Esse endpoint é responsável por alterar um usuario cadastrado.

  

#### Parametros

  

id: id do usuário.
name: Nome do usuário.  
email: E-mail do usuário.  
nationality: Nacionalidade do usuário.

  

Exemplo:

  
```
{
"id" : 1,
"name": "Nikola Tesla dos Santos",
"email": "nikola_tesla.santos@email.com",
"nationality": "brasileiro",
"password": "nikolarocks"
}
```

  

#### Respostas

  

##### :heavy_check_mark: OK! 200

  

Caso essa resposta aconteça, o usuario foi alterado com sucesso.

  

Exemplo de resposta:

  

```
{
"message": "Dados do usuario alterado com sucesso!"
}
```

  

##### :x: Bad Request! 400

  

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token nào informado ou token inválido.

  

Exemplo de resposta:

  

```
{
"error": "Token inválido ou não informado"
}
```

  

##### :x: Unauthorized! 401

  

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token não autorizado (O usuário autenticado não é o proprietario do token).

  

Exemplo de resposta:

  

```
{
"error": "Token com autorização inválida"
}
```

  

### Delete /user/:id

  

Esse endpoint é responsável por alterar um usuario cadastrado.

  

#### Parametros

  

Nenhum

  

#### Respostas

  

##### :heavy_check_mark: OK! 200

  

Caso essa resposta aconteça, o usuario foi apagado com sucesso.

  

Exemplo de resposta:

  

```
{
"message": "Usuário apagado com sucesso"
}
```

  

##### :x: Bad Request! 400

  

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token nào informado ou token inválido.

  

Exemplo de resposta:

  

```
{
"error": "Token inválido ou não informado"
}
```

  

##### :x: Unauthorized! 401

  

Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token não autorizado (O usuário autenticado não é o proprietario do token).

  

Exemplo de resposta:

  

```
{
"error": "Token com autorização inválida"
}
```

<br>

## 📄 Licença

<a href="https://opensource.org/licenses/MIT">
    <img alt="License" src="https://img.shields.io/badge/license-MIT-04D361?style=flat-square">
</a>

<br>

Esse projeto está sob a licença MIT.

---

by [João Norberto](https://github.com/jnorberto23)