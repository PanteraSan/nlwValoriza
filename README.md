# Nlw Valoriza

## Sobre o projeto:

API Rest para cadastro de elogios e feedbacks positivos entre colaboradores de um time.

## Extra miles (y)

[ **X** ] Usuário que recebe um elogio é notificado via email<br> 
[ **X** ] ErrorHandler para jogar erros customizados<br>
[ - ] Criar uma rota para filtrar elogios por tag usando routeParams<br>
[ - ] Possibilidade de enviar "Likes" para os elogios


## EmailHandler:
**Essa classe ainda não tem implementada nenhum sistema de criptografia ou segurança. Atenção para usar apenas um email de uso de testes e que não forneça dados sensíveis.**

Por questões de segurança, o email e senha estão em branco na classe 'EmailHandler.ts'. É necessário preencher os dados do objeto emailConfig com o email e senha para configurar o email remetente.<br>

**Exemplo:**
```ts
emailConfig = {
  host: 'smtp.gmail.com',
  port: 587, 
  secure: false,
  auth: {
   user: 'seuEmail@email.com',
   pass: 'suaSenha'
  }
 }
 ```
## ErrorHandler

Classe que extende a classe ```Error``` e que permite customizar um erro para jogar para camadas superiores da aplicação tratar.
**Exemplo:**

```ts
//throw error object to upper layer with custom parameters
const err = {
 name: 'ReceiverDontExistsError',
 message: "User receiver doesn't exists",
 statusCode: 419,
 description: "User receiver doesn't exists. Try to compliment an existant person next time."
}

throw new ErrorHandler(err)
```
É possível enriquecer mais ainda o erro retornado, adicionando mais propriedades opcionais dentro da interface ```IErrorHandler```, sem medo de quebrar a aplicação.
Se uma propriedade obrigatória for adicionada, é necessário refatorar as funções que a utilizam para começar a enviar o novo parâmetro também.