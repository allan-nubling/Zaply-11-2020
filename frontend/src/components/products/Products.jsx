import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { API_URL, API_AUTH } from '../../tools/constants'
import './products.css'
import { connect } from 'react-redux'
import ProductsList from './ProductsList'
import { pageTitle } from '../../redux/reducers/store'
import { existsOrFalse } from '../../tools/validation'
import { deleteProduct } from '../Product/Product'


//Retorna um array de paginas para contruir a paginação
function _pagination(p, m) {
    if(!p || !m) return false
    if(p + 1 <= m && p - 1 > 0)
        return [p-1, p, p+1]
    
    else if(m < 3)
        return m === 2 ? [1, 2] : false

    else return p === m ? [p-2, p-1, p] : [p, p+1, p+2]
}

class Products extends Component {
    // constructor(props){
    //     super(props)
    //     this.pagination = this.pagination.bind(this)
    //     this.setOrder = this.setOrder.bind(this)
    // }
    state = { 
        err: false,
        loading : true,
        page: 1,
        lt: 'medium',
        qry: 'name',
        val: '',
        products: [],
        pageCount: 1,
        allowDelete: false,
        order: 'asc',
        by: 'id',
    }

    updateList() {
        this.setState({loading: true})
        axios({
            method: 'get',
            url: API_URL + '/products',
            params: {
                page: this.state.page,
                lt: this.state.lt,
                qry: this.state.qry,
                val: this.state.val,
                order: this.state.order,
                by: this.state.by,
            },
            headers: {'Authorization': API_AUTH}
        })
        .then(resp => {
            this.setState({
                loading: false,
                products: resp.data.products,
                pageCount: resp.data.count
            })
        })
        .catch(err => {
            this.setState({err: true})
        })
    }

        
    setFilter(e){
        this.setState({ [e.target.name]: e.target.value })
    }
    
    setOrder(col){
        if(col === this.state.by) this.setState((state) => ({ order: state.order === 'asc' ? 'desc' : 'asc' }), () => { this.updateList() })
        else this.setState({ by: col, order:'asc' }, () => { this.updateList() })
        
    }
    
    search(){
        this.setState({ page: 1 }, () => { this.updateList() })
    }

    allowDelete(target){
        this.setState((state) => {
            if(state.allowDelete) return { allowDelete: target.checked }
            if(window.confirm("Isso permitirá excluir produtos sem confirmação")) return { allowDelete: target.checked }
        })
    }

    pagination(n){
        if(this.state.page === n) return
        this.setState({ page: n }, () => { this.updateList() })
    }
    
    _deleteProduct(product){
        if(this.state.allowDelete || window.confirm("Tem certeza?\nEste produto sera excluido permanentemente.")){
            deleteProduct(product.id)
            .then(this.updateList())
            .catch(this.updateList())
        }
    }
    
    componentDidMount(){
        this.props.dispatch(pageTitle('Produtos'))
        this.updateList()
    }
    
    render(){
        const paginator = _pagination(this.state.page, this.state.pageCount)
        return (
            <div className='products'>
                <h4>Filtrar</h4>
                <div className="filters">
                    <select defaultValue={'name'} name="qry" id="query-col" onChange={e => this.setFilter(e)}>
                        <option value="id">id</option>
                        <option value="name" >nome</option>
                        <option value="categories">categoria</option>
                        <option value="brand">marca</option>
                    </select>
                    <input type="text" name="val" id="query-value" onChange={e => this.setFilter(e)} onKeyDown={e => e.keyCode === 13 && this.search()} />
                    <button className="flat-button" onClick={_ => this.search()} >Procurar</button>
                </div>
                {
                    //Tratar erro e loading do componente
                    this.state.err 
                    ? <h3 className="error">Ops... Algo deu Errado!</h3>
                    : this.state.loading 
                        ? <div className="loading"><div className="spinner"></div>carregando</div>
                    //Montar a lista
                        : existsOrFalse(this.state.products)
                            ? <Fragment>
                                <div className="options">
                                    <label htmlFor="allowDelete">
                                        exluir:
                                    </label>
                                    <input type="checkbox" name="allowDelete" id="allowDelete" onChange={e => this.allowDelete(e.target) }/>
                                    <label htmlFor="lt">exibir: 
                                    </label>
                                    <select name="lt" id="lt" defaultValue={this.state.lt} onChange={e => this.setState({ lt: e.target.value}, () => this.updateList())  }>
                                        <option value="small">10</option>
                                        <option value="medium">20</option>
                                        <option value="large">30</option>
                                    </select>
                                </div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th name="id" onClick={e => this.setOrder('id')} >
                                                <div>
                                                    <span>id</span>    
                                                    {
                                                        this.state.by === 'id'
                                                        ? <i className={`fa fa-chevron-${this.state.order === 'asc' ? 'down' : 'up'}`}></i>
                                                        : ''
                                                    }
                                                </div>
                                            </th>
                                            <th name="name" onClick={e => this.setOrder('name')} >
                                                <div>
                                                    <span>nome</span>    
                                                    {
                                                        this.state.by === 'name'
                                                        ? <i className={`fa fa-chevron-${this.state.order === 'asc' ? 'down' : 'up'}`}></i>
                                                        : ''
                                                    }
                                                </div>
                                            </th>
                                            <th name="categories" onClick={e => this.setOrder('categories')} >
                                                <div>
                                                    <span>categoria</span>    
                                                    {
                                                        this.state.by === 'categories'
                                                        ? <i className={`fa fa-chevron-${this.state.order === 'asc' ? 'down' : 'up'}`}></i>
                                                        : ''
                                                    }
                                                </div>
                                            </th>
                                            <th name="price" onClick={e => this.setOrder('price')} >
                                                <div>
                                                    <span>preço</span>    
                                                    {
                                                        this.state.by === 'price'
                                                        ? <i className={`fa fa-chevron-${this.state.order === 'asc' ? 'down' : 'up'}`}></i>
                                                        : ''
                                                    }
                                                </div>
                                            </th>
                                            <th name="brand" onClick={e => this.setOrder('brand')} >
                                                <div>
                                                    <span>marca</span>    
                                                    {
                                                        this.state.by === 'brand'
                                                        ? <i className={`fa fa-chevron-${this.state.order === 'asc' ? 'down' : 'up'}`}></i>
                                                        : ''
                                                    }
                                                </div>
                                            </th>
                                            <th>ações</th>
                                        </tr>
                                        <ProductsList products={this.state.products} deleteProduct={product => this._deleteProduct(product)}/>
                                    </tbody>
                                </table>
                                {paginator && 
                                    <nav className="nav-footer">
                                        <div className="flat-button" onClick={e => this.pagination(1)} >&laquo;</div>
                                        {paginator.map(pag => 
                                            <div key={`page-${pag}`} className={`flat-button ${this.state.page === pag ? 'active' : ''}`} onClick={e => this.pagination(pag)} >{pag}</div>
                                        )}
                                        <div className="flat-button" onClick={e => this.pagination(this.state.pageCount)} >&raquo;</div>
                                    </nav>
                                }
                            </Fragment>
                            : <h3 className="error">Não encontramos nada! :(</h3>
                }
            </div>
        )
    }
}

export default connect()(Products)