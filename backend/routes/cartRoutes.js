import express from 'express'
import { addItemToCart, deleteItem, getItems } from '../controllers/cartController.js'


const router = express.Router()

//POST item to cart (route)
router.post('/', addItemToCart)


//GET item from cart (route)
router.get('/:id', getItems)

//delete item from cart(route)
router.delete('/:id', deleteItem)


export default router