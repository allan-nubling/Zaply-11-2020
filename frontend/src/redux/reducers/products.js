//Store de produtos

//Estado inicial
const initialState = {
    product: {
        id: '',
        name: '',
        categories: '',
        image: '',
        price: '',
        brand: '',
    }
}

const products = (state = initialState, action) => {
    switch (action.type){
        case 'SET_PRODUCT':
            state = Object.assign(state, action.payload)
            return { ...state }
        default:
            return { ...state }
    }
}
        
  
export default products
  
  
  
export const setProduct = payload => {
    return ({
        type: 'SET_PRODUCT',
        payload: { product: payload }
    })
}