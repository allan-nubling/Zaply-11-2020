import React from 'react'
import { connect } from 'react-redux'
import { update } from '../../redux/reducers/products'


const Filters = ({ state, update }) => {
    function queryText(e){
        update(e.target.value)
    }
    return (
        <div className="filters">
            <input type="text" name="query-value" id="query-value" onChange={e => queryText(e)}/>
        </div>
    )
}

const mapState = (state, props) => ({ state: state.products })
export default connect(mapState, { update })(Filters)