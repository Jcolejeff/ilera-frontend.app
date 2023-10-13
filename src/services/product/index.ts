import API from '../index';
import {getProductInterface} from './product.types'

const getProduct = async(params: getProductInterface)=>{
    const {data} = await API.get(`/products`, {
        params: {
            ...params
        }
    })
    return data
}


const productService = {
    getProduct
}

export default productService