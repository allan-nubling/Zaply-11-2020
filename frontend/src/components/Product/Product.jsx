import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { API_URL, API_AUTH } from '../../tools/constants'
import './product.css'
import { pageTitle } from '../../redux/reducers/store'
import { existsOrError, minorOrError } from '../../tools/validation'
import { Redirect } from 'react-router'
import { setProduct } from '../../redux/reducers/products'

const defaultProductValues = {
    id: '',
    name: '',
    categories: '',
    image: '',
    price: '',
    brand: ''
}


export const deleteProduct = (id) => {
    return axios({ 
        method: 'delete',
        url: API_URL + '/products/' + id,
        headers: {'Authorization': API_AUTH},
    })
}

class Product extends Component {

    state = this.props.state.product


    onChangeInput(e){
        this.setState({
            [e.target.name]: e.target.value,
            //limpar campo de alertas
            dataError: false,
            success: false, 
            err: false 
        })
    }

    submitForm(){
        this.setState({err: false}) //preparando para enviar o produto

        const _product = {
            id: this.state.id || `${parseInt(Math.random()*1e8)}`,
            name: this.state.name,
            categories: this.state.categories,
            image: this.state.image,
            price: parseFloat(`${this.state.price}`.replace(',', '.')),
            brand: this.state.brand,
        }

        try {
            //validação dos dados
            existsOrError(_product.categories, ['categories'])
            existsOrError(_product.name, ['name'])
            existsOrError(_product.image, ['image'])
            existsOrError(_product.brand, ['brand'])
            existsOrError(_product.price, ['price'])
            minorOrError(1e6)(_product.price, ['price', '*O preço deve ser inferior a R$999999,00']) // Validação para o limite atual do banco de dados

            //Enviando produto para o backend
            this.setState({loading: true})
            axios({ 
                method: this.state.id ? 'put' : 'post',
                url: `${API_URL}/products${this.state.id ? `/${this.state.id}` : ''}`,
                headers: {'Authorization': API_AUTH},
                data: this.state.id ? { product: _product } : { data: _product }
            })
            .then(resp => {
                this.setState({
                    loading: false,
                    success: `Produto ${this.state.id ? 'alterado' : 'adicionado'} com sucesso!`
                })
                if(this.state.keepValues){
                    this.setState({
                        id: '',
                        name: '',
                        image: '',
                        price: '',
                    })
                } else {
                    this.setState({ ...defaultProductValues })
                }
            })
            .catch(err => {
                this.setState({err: '*não foi possivel salvar as alterações'}) //erro no envio
            })
        } catch(err) {
            this.setState({ dataError: err[0], err: err[1] || '*todos campos devem ser preenchidos corretamente'}) //erro nos dados
        }
    }

    cancelSubmit(){
        this.setState({ ...defaultProductValues, dataError: false, err: false })
        this.props.dispatch(pageTitle('Adicionar Produto'))
    }

    delete(){
        this.setState({err: false}) //preparando para enviar o produto
        deleteProduct(this.state.id)
        .then(res => {
            this.setState({ loading: false, success: 'Produto excluido com sucesso!', ...defaultProductValues })
        })
        .catch(this.setState({err: '*não foi possivel excluir o produto'})) //erro no envio)
    }
    
    componentDidMount(){
        this.props.dispatch(pageTitle(this.state.id ? 'Editar Produto' : 'Adicionar Produto'))
    }

    componentWillUnmount(){
        this.props.dispatch(setProduct(defaultProductValues))
    }
    
    render(){
        if(this.state.redirect) return <Redirect to="product" />
        return (
            <div className="product">
                    <div className="img-wrap">
                        {
                            this.state.image
                            ? <img src={this.state.image} alt="imagem não encontrada"/>
                            : <div>Imagem...</div>
                        }
                    </div>
                    {
                        this.state.id 
                            ? <span className="id" >id: <span>{this.state.id}</span></span>
                            : <span className="id" >Novo Produto</span>
                    }
                    <label className={`categories ${this.state.dataError === 'categories' ? 'color-error' : ''}`} htmlFor="product-categories">
                        Categoria:
                        <input className={this.state.dataError === 'categories' ? 'border-error' : ''} type="text" name="categories" id="product-categories" onChange={e => this.onChangeInput(e)} value={this.state.categories}/>
                    </label>
                    <label className={`name ${this.state.dataError === 'name' ? 'color-error' : ''}`} htmlFor="product-name">
                        Nome:
                        <input className={this.state.dataError === 'name' ? 'border-error' : ''} type="text" name="name" id="product-name" onChange={e => this.onChangeInput(e)} value={this.state.name}/>
                    </label>
                    <label className={`image ${this.state.dataError === 'image' ? 'color-error' : ''}`} htmlFor="product-image">
                        Url da imagem:
                        <input className={this.state.dataError === 'image' ? 'border-error' : ''} type="text" name="image" id="product-image" onChange={e => this.onChangeInput(e)} value={this.state.image}/>
                    </label>
                    <label className={`brand ${this.state.dataError === 'brand' ? 'color-error' : ''}`} htmlFor="product-brand">
                        Marca:
                        <input className={this.state.dataError === 'brand' ? 'border-error' : ''} type="text" name="brand" id="product-brand" onChange={e => this.onChangeInput(e)} value={this.state.brand}/>
                    </label>
                    <label className={`price ${this.state.dataError === 'price' ? 'color-error' : ''}`} htmlFor="product-price">
                        Preço:
                        <input className={this.state.dataError === 'price' ? 'border-error' : ''} type="text" name="price" id="product-price" onChange={e => this.onChangeInput(e)} value={this.state.price}/>
                    </label>

                    {/* Ações */}
                    <div className="actions"> 
                        {
                            this.state.id &&
                        <button className="flat-button delete" onClick={e => this.delete()}>
                        {
                            this.state.loading
                            ? <div className="spinner-border spinner-border-sm text-light" role="status"></div>
                            : 'Excluir'
                        }
                        </button>
                        }
                        <label htmlFor="keepValues">
                            <input type="checkbox" name="keepValues" id="keepValues" onChange={e => this.setState({ [e.target.name]: e.target.checked })} />
                            Manter Valores
                        </label>
                        <button className="flat-button" onClick={e => this.cancelSubmit()}>
                            Cancelar
                        </button>
                        <button className="flat-button" onClick={e => this.submitForm()}>
                            {
                                this.state.loading
                                ? <div className="spinner-border spinner-border-sm text-light" role="status"></div>
                                : 'Salvar'
                            }
                        </button>
                    </div>

                {/* Alertas */}
                {
                    // this.state.dataError
                    // ? <span className="alert-field error" >*todos campos devem ser preenchidos corretamente</span>
                    this.state.err 
                    ? <span className="alert-field error" >{this.state.err}</span>
                    : ''
                }
                {
                    this.state.success
                    ? <span className="alert-field succes" >produto salvo com sucesso!</span>
                    : ''
                }
                {/* Fim dos alertas */}
            </div>
        )
    }
}


const mapState = (state, props) => ({ state: state.products, props })
export default connect(mapState)(Product)