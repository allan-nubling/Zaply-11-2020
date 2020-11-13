import React from 'react'
import { connect } from 'react-redux'
import './about.css'

import img1 from '../../assets/screenshot1.png'
import img2 from '../../assets/screenshot2.png'
import img3 from '../../assets/screenshot3.png'

function About({state}) {
    return (
        <div className="about">
            <p>Olá{state.user.auth ? ` ${state.user.name}` : ''}, seja bem-vindo(a)! Eu  sou o Allan Nubling e este é a minha aplicação de Dashboard para desafio da Zaply.</p>
            <p className="desafio">
                <h4>O desafio:</h4>
                <span>
                    “Fazer um dashboard para consulta e edição de produtos.
                    <br/>O principal do dashboard é um campo que pesquisa e a possibilidade de edição em uma base de produtos com imagem, nome, preço, marca e categoria. Outras features são bem vindas e diferenciais.
                    <br/>A tecnologia principal é o React e não é obrigatório ter back-end, mas outras tecnologias de front-end e back-end serão diferenciais.”
                </span>
            </p>
            <p>
                Bem, definido o desafio eu comecei a criar esta aplicação. Nas tecnologias sugeridas haviam diversas ferramentas bem legais, porém, eu decidi escolher React.js para o frontend pois eu penso que um dashboard acaba sendo uma aplicação para administrar outras aplicações, o react puro traz diversas vantagens porque fica fácil construir uma SPA ( single page application ) utilizando a renderização dos componentes no lado do cliente e por consequência utilizando menos o servidor.
            </p>
            <p>
                <h4>Principais páginas do desafio:</h4>
            </p>
            <div>
                <h5>Produtos &gt; Ver Todos:</h5>
                <div className="img">
                    <img src={img1} alt="imagem"/>
                </div>
                <br/>Está é a principal página do desafio, nela é possível filtrar todos produtos por qualquer atributo, reorganiza-los por qualquer coluna, definir a quantidade disposta na página, editar ou excluir. Aqui eu tentei fazer com que fique o mais fácil possível encontrar um produto no banco de dados.
            </div>
            <div>
                <br/><h5>Produtos &gt; Adicionar/Editar:</h5>
                <div className="img">
                    <img src={img2} alt="imagem"/>
                </div>
                <br/>Aqui nesta página podemos adicionar ou editar produtos, o app vai definir qual ação será feita com base no estado atual e por qual link você navegou até aqui. Nesta página nós temos uma validação dos dados antes de enviar para o backend e a possibilidade de manter os campos “marca” e “categoria” preenchidos para que caso o usuário possua uma lista de produtos similares para cadastrar. A ideia aqui é agilizar ao máximo o cadastro de produtos.
            </div>
            <div>
                <br/><h5>Produtos &gt; Importar:</h5>
                <div className="img">
                    <img src={img3} alt="imagem"/>
                </div>
                <br/>Aqui é possível enviar arquivos CSV como os que nos foi passado no desafio.
            </div>
            <br/>
            <p>
                <h4>O backend:</h4>
                No backend eu decidi fazer uma api usando Node.js, Express para gerenciamento de rotas,permissões e provimento de conteúdo. Também usei knex para querys no banco de dados. 
                <br/>Utilizei os serviços de banco mySQL e App Engine do google cloud para hospedar os serviços.
                <br/>Eu fiz a api de forma que ela faça diferentes formatos de querys no banco dependendo dos parâmetros da requisição e também fiz o cadastro de novos dados no banco de dados aceitar mais de um produto por vez, assim possibilitando a construção de uma feature de carregar um csv na aplicação frontend, ela validar os dados do csv e enviar todos de um  vez ( ou separar em partes) e enviar para o backend.
                <br/>É bom salientar que por hora a aplicação está fazendo hard-delete dos dados, então eu decidi deixar uma verificação na hora da exclusão.
            </p>
        </div>
    )
}
const mapState = (store) => ({ state: store.store})
export default connect(mapState)(About)