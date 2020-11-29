# Zaply-11-2020
### Projeto/Desafio Zaply
Olá, seja bem-vindo(a)! Eu  sou o Allan Nubling e essa é a minha aplicação de dashboard para desafio da Zaply.

[Você pode encontrar o app neste link hospedado do gCloud](https://zaply-295212.rj.r.appspot.com/#/)

### O desafio:
> “Fazer um dashboard para consulta e edição de produtos.
O principal do dashboard é um campo que pesquisa e a possibilidade de edição em uma base de produtos com imagem, nome, preço, marca e categoria. Outras features são bem vindas e diferenciais.
A tecnologia principal é o React e não é obrigatório ter back-end, mas outras tecnologias de front-end e back-end serão diferenciais.”

Bem, definido o desafio, eu comecei a criar essa aplicação. Nas tecnologias sugeridas havia diversas ferramentas bem legais, porém, eu decidi escolher React.js para o frontend, pois eu penso que um dashboard acaba sendo uma aplicação para administrar outras aplicações. O react puro traz diversas vantagens, porque fica fácil construir uma SPA ( single page application ) utilizando a renderização dos componentes no lado do cliente e, por consequência, utilizando menos o servidor.

### Principais páginas do desafio:
#### Produtos > Ver Todos:
![](https://zaply-295212.rj.r.appspot.com/static/media/screenshot1.e1f7d148.png)

Esta é a principal página do desafio. Nela é possível filtrar todos produtos por qualquer atributo, reorganizá-los por qualquer coluna, definir a quantidade disposta na página, editar ou excluir. Aqui eu tentei fazer com que fique o mais fácil possível de encontrar um produto no banco de dados.

#### Produtos > Adicionar/Editar:
![](https://zaply-295212.rj.r.appspot.com/static/media/screenshot2.e976d01c.png)

Aqui nesta página podemos adicionar ou editar produtos, o app vai definir qual ação será feita com base no estado atual e por qual link você navegou até aqui. Nesta página nós temos uma validação dos dados antes de enviar para o backend e a possibilidade de manter os campos “marca” e “categoria” preenchidos para o caso de o usuário possuir uma lista de produtos similares para cadastrar. A ideia aqui é agilizar ao máximo o cadastro de produtos.

#### Produtos > Importar:

![](https://zaply-295212.rj.r.appspot.com/static/media/screenshot3.d9a28861.png)

Aqui é possível enviar arquivos CSV como os que nos foram passados no desafio.


### O backend:

No backend eu decidi fazer uma api usando Node.js, Express para gerenciamento de rotas,permissões e provimento de conteúdo. Também usei knex para querys no banco de dados. 
Utilizei os serviços de banco mySQL e App Engine do google cloud para hospedar os serviços.
Eu fiz a api de forma que ela faça diferentes formatos de querys no banco dependendo dos parâmetros da requisição, e também fiz o cadastro de novos dados no banco de dados aceitar mais de um produto por vez, assim possibilitando a construção de uma feature de carregar um csv na aplicação frontend, que vai validar os dados do csv e enviar todos de uma  vez ( ou separar em partes) e enviar para o backend.
É bom salientar que, por hora, a aplicação está fazendo hard-delete dos dados, então eu decidi deixar uma verificação na hora da exclusão.



##### Para rodar localmente:
Precisamos configurar um banco de dados mySQL com um schema utf-8 general e cadastrar o endereço, nome do banco e usuario/senha no arquivo do tipo .env que deve ficar dentro de /backend/configs/.env

O arquivo deve ter este formato: [.env file](https://github.com/allan-nubling/Zaply-11-2020/blob/env-arquivo/backend/configs/.env)

Para configurar as tabelas e executar o projeto devemos entar na pasta /backend pelo console e executar os seguintes comandos:
 
$ npm install //para baixar todas dependencias

$ npx knex migrate:latest //(se não funcionar esse comando talvez seja necessário instalar o knex globalmente)
 
$ npm start //Inicia o servidor (atualmente configurado para porta 3031 pode ser alterado no arquivo index.js)

ou

$ npm run dev //Inicia o servidor no modo de desenvolvimento com nodemon
 
 
 
