import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { authUser, signOut, pageTitle } from '../../redux/reducers/store'
import './home.css'

class Home extends Component{

    state= { ...this.props.state.user }

    signUp(){
        this.props.dispatch(authUser(this.state.name))
        this.setState({ auth: true })
    }

    signOut(){
        this.props.dispatch(signOut())
        this.setState({ auth: false, name: '' })
    }

    componentDidMount() {
        this.props.dispatch(pageTitle('Início'))
    }

    render(){
        return (
            <div className="home">
                <h3>Bem-Vindo(a){this.state.auth ? `, ${this.state.name}` : ''}!</h3>
                {
                    this.state.auth
                    ? <button className="flat-button" onClick={ e => this.signOut() } >SAIR</button>
                    : <Fragment>
                        <input type="text" name="name" id="name" onChange={e => this.setState({name: e.target.value}) } value={this.state.name}/>
                        <h6>Digite seu Nome</h6>
                        {
                            this.state.name 
                            ? <button className="flat-button" onClick={ e => this.signUp() } >SALVAR</button>
                            : ''
                        }
                    </Fragment>
                }
            </div>
            )
    
    } 
}


const mapState = (store) => ({ state: store.store})
export default connect(mapState)(Home)