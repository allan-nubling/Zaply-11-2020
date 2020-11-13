import React from 'react'
import './logo.css'
import { connect } from 'react-redux'
import { toggleNav } from '../../redux/reducers/store'


function Logo({props, dispatch}) {
    function _toggleNav(){
        console.log('toggle')
        dispatch(toggleNav())
    }
    return (
    <div className="logo" >
        <i className="fa fa-bars" onClick={e => _toggleNav()}></i>
        <img src="https://zaply.com.br/logo.svg" alt="Logo"/>
    </div>
    )
}

export default connect()(Logo)