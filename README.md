# Zaply-11-2020
### Projeto/Desafio Zaply
Olá, seja bem-vindo(a)! Eu  sou o Allan Nubling e este é a minha aplicação de dashboard para desafio da Zaply.

### O desafio:
> “Fazer um dashboard para consulta e edição de produtos.
O principal do dashboard é um campo que pesquisa e a possibilidade de edição em uma base de produtos com imagem, nome, preço, marca e categoria. Outras features 	são bem vindas e diferenciais.
A tecnologia principal é o React e não é obrigatório ter back-end, mas outras tecnologias de front-end e back-end serão diferenciais.”

Bem, definido o desafio eu comecei a criar esta aplicação. Nas tecnologias sugeridas haviam diversas ferramentas bem legais, porém, eu decidi escolher React.js 	para o frontend pois eu penso que um dashboard acaba sendo uma aplicação para administrar outras aplicações, o react puro traz diversas vantagens porque fica	 	fácil construir uma SPA ( single page application ) utilizando a renderização dos componentes no lado do cliente e por consequência utilizando menos o servidor.

### Principais páginas do desafio:
#### Produtos > Ver Todos:
![](https://zaply-295212.rj.r.appspot.com/static/media/screenshot1.e1f7d148.png)

Está é a principal página do desafio, nela é possível filtrar todos produtos por qualquer atributo, reorganiza-los por qualquer coluna, definir a quantidade disposta na página, editar ou excluir. Aqui eu tentei fazer com que fique o mais fácil possível encontrar um produto no banco de dados.

#### Produtos > Adicionar/Editar:
![](https://zaply-295212.rj.r.appspot.com/static/media/screenshot2.e976d01c.png)

Aqui nesta página podemos adicionar ou editar produtos, o app vai definir qual ação será feita com base no estado atual e por qual link você navegou até aqui. Nesta página nós temos uma validação dos dados antes de enviar para o backend e a possibilidade de manter os campos “marca” e “categoria” preenchidos para que caso o usuário possua uma lista de produtos similares para cadastrar. A ideia aqui é agilizar ao máximo o cadastro de produtos.

#### Produtos > Importar:

![](https://zaply-295212.rj.r.appspot.com/static/media/screenshot3.d9a28861.png)

Aqui é possível enviar arquivos CSV como os que nos foi passado no desafio.

### O backend:

No backend eu decidi fazer uma api usando Node.js, Express para gerenciamento de rotas,permissões e provimento de conteúdo. Também usei knex para querys no banco de dados. 
Utilizei os serviços de banco mySQL e App Engine do google cloud para hospedar os serviços.
Eu fiz a api de forma que ela faça diferentes formatos de querys no banco dependendo dos parâmetros da requisição e também fiz o cadastro de novos dados no banco de dados aceitar mais de um produto por vez, assim possibilitando a construção de uma feature de carregar um csv na aplicação frontend, ela validar os dados do csv e enviar todos de um  vez ( ou separar em partes) e enviar para o backend.
É bom salientar que por hora a aplicação está fazendo hard-delete dos dados, então eu decidi deixar uma verificação na hora da exclusão.
