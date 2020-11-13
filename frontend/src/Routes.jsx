import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import About from './components/about/About'
import Home from './components/home/Home'
import ImportProducs from './components/importProducts/ImportProducts'
import Product from './components/Product/Product'
import Products from './components/products/Products'

export default function Routes(props) {
    return(
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/products' component={Products} />
            <Route exact path='/product' component={Product} />
            <Route exact path='/product/import' component={ImportProducs} />
            <Route exact path='/about' component={About} />
            <Redirect path='/*' to='/' />
        </Switch>
    )
} 