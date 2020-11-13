import Axios from 'axios'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import products from '../../redux/reducers/products'
import { pageTitle } from '../../redux/reducers/store'
import { API_AUTH, API_URL } from '../../tools/constants'
import './import-products.css'

class ImportProducs extends Component {
    state ={
        products: []
    }
    readFile(){
        const file = document.getElementById('product-file').files[0]
        const reader = new FileReader()
        reader.onload = evt => {
            let products = evt.target.result.split('\n').map(row => {
                let [id, image, name, categories, price, brand] = row.split(';')
                return { id, image, name, categories, price, brand }
            })
            this.setState({ products })
        }
        file && file.name.split('.')[1] == 'csv' && reader.readAsText(file)
    }

    deleteProduct(index) {
        this.setState((state) => {
            let _products = state.products
            _products.splice(index, 1)
            return {
                products: _products
            }
        })
        
    }

    submitForm(){
        this.setState({err: false}) //preparando para enviar o produto

        //Enviando produto para o backend
        this.setState({loading: true})
        Axios({ 
            method: this.state.id ? 'put' : 'post',
            url: `${API_URL}/products${this.state.id ? `/${this.state.id}` : ''}`,
            headers: {'Authorization': API_AUTH},
            data: { data: this.state.products }
        })
        .then(resp => {
            this.setState({
                loading: false,
                success: `Produtos adicionados com sucesso!`,
                products: []
            })
        })
        .catch(err => {
            this.setState({err: '*não foi possivel salvar as alterações'}) //erro no envio
        })
    }

    componentDidMount(){
        this.props.dispatch(pageTitle('Importar Produtos'))
    }

    render(){
        return (
            <div className="products import-products">
                <h4>Importar arquivo</h4>
                <div className={`load-file`}>
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="product-file" />
                        <label className="custom-file-label" for="product-file">Escolher o arquivo.csv</label>
                    </div>
                    <button className="flat-button" onClick={e => this.readFile()}>Carregar</button>
                </div>
                {
                    //Tratar erro e loading do componente
                    this.state.err 
                    ? <h3 className="error">Ops... Algo deu Errado!</h3>
                    : this.state.loading 
                        ? <div className="loading"><div className="spinner"></div>carregando</div>
                    //Montar a lista
                    : this.state.products.length > 0
                        ? <table>
                            <tbody>
                                <tr>
                                    <th name="id">id</th>
                                    <th name="name">nome</th>
                                    <th name="categories">categoria</th>
                                    <th name="price">preço</th>
                                    <th name="brand">marca</th>
                                    <th>ações</th>
                                </tr>
                                {
                                    Array.isArray(this.state.products)
                                        ? this.state.products.map((product, index) => (
                                            <tr key={product.id}>
                                                <td>{product.id}</td>
                                                <td>{product.name}</td>
                                                <td>{product.categories}</td>
                                                <td>R$ {`${product.price}`.replace('.', ',')}</td>
                                                <td>{product.brand}</td>
                                                <td className="actions">
                                                    <i className="fa fa-trash" onClick={e => this.deleteProduct(index)} ></i>
                                                </td>
                                            </tr>
                                        ))
                                        : <tr />
                                }
                            </tbody>
                        </table>
                        : ''
                }
                {
                    this.state.products.length > 0
                    ? <button className="flat-button" onClick={e => this.submitForm() }> ENVIAR </button>
                    : ''
                }
            </div>
        )
    }
}

export default connect()(ImportProducs)