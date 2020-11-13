import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { setProduct } from '../../redux/reducers/products'



function ProductsList({ products, deleteProduct }){
    const history = useHistory()
    const dispatch = useDispatch()

    function editProduct(_product) {
        dispatch(setProduct(_product))
        history.push('/product')
    }

    return (
        <Fragment>
            {
                Array.isArray(products)
                ? products.map(product => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.categories}</td>
                        <td>R$ {`${product.price}`.replace('.', ',')}</td>
                        <td>{product.brand}</td>
                        <td className="actions">
                            <i className="fa fa-edit" onClick={e => editProduct(product)} ></i>  
                            <i className="fa fa-trash" onClick={e => deleteProduct(product)} ></i>
                        </td>
                    </tr>
                ))
                : <tr />
            }
        </Fragment>
    )
}

export default ProductsList