//Estado inicial
const initialState = {
    listView: {
        err: false,
        loading : true,
        page: 1,
        lt: 'small',
    },

}



export const update = payload => {
    return ({
        type: 'LOAD_PRODUCTS',
        payload
    })
}


const user = (state = initialState, action) => {
    switch (action.type){
        case 'LOAD_PRODUCTS':
            return { ...Object.assign(state, action.payload) }
        default:
            return state
    }
}

export default user