import React from 'react'
import { connect } from 'react-redux'
import './user-card.css'

function UserCard({ state }) {
    if(!state.user.auth) return <div></div>
    return <div className="user-card">
        <div className="img"><img src="https://zaply.com.br/favicon-32x32.png" alt="ico"/></div>
        {state.user.name}
        </div>
}

const mapState = (store) => ({ state: store.store})
export default connect(mapState)(UserCard)