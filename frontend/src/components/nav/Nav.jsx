import React from 'react'
import './nav.css'

import { Link } from 'react-router-dom'

export default function Nav({props, dispatch}) {
    return <div className="nav" >
        <div className="accordion" id="nav">
            <Link to="/" className="link">Início</Link>
            <div id="products" className="link" data-toggle="collapse" data-target="#collapseProduct" aria-expanded="false" aria-controls="collapseProduct">Produtos</div>
            <div id="collapseProduct" className="collapse" aria-labelledby="products" data-parent="#nav">
                <Link to="/products" className="link sub-link">Ver Todos</Link>
                <Link to="/product" className="link sub-link">Adicionar</Link>
                <Link to="/product/import" className="link sub-link">Importar</Link>
            </div>
            <Link to="/about" className="link">Sobre</Link>
            {/* <div id="Eiusmod" className="link" data-toggle="collapse" data-target="#collapseEiusmod" aria-expanded="false" aria-controls="collapseEiusmod">Eiusmod High Life</div>
            <div id="collapseEiusmod" className="collapse" aria-labelledby="Eiusmod" data-parent="#nav">
                    <Link to="/" className="link sub-link">Adicionar</Link>
                    <Link to="/" className="link sub-link">Excluir</Link>
            </div>
            <div id="pariatur" className="link" data-toggle="collapse" data-target="#collapsePariatur" aria-expanded="false" aria-controls="collapsePariatur">Anim Pariatur</div>
            <div id="collapsePariatur" className="collapse" aria-labelledby="pariatur" data-parent="#nav">
                    <Link to="/" className="link sub-link">Adicionar</Link>
                    <Link to="/" className="link sub-link">Excluir</Link>
            </div> */}
        </div>
    </div>
}