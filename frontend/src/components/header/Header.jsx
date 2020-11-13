import React from 'react'
import { connect } from 'react-redux'
import './header.css'
import UserCard from './UserCard'

function Header({state}) {
    return <div className="header" >
        <div className="title">
            {state.page}
        </div>
        <UserCard />
    </div>
}

const mapState = (state, props) => ({ state: state.store, props })
export default connect(mapState)(Header)