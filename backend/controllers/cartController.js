import mongoose from "mongoose";
import cartModels from "../models/cart.js";

//POST item to cart

const addItemToCart = async (req, res) => {

    try {

        let {
            user_id,
            bagName,
            description,
            image,
            price,
            quantity = 1
        } = req.body;

        const item = await cartModels.create({ user_id, bagName, description, image, price, quantity })
        res.status(200).json({ item, message: 'item is added into cart' })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}


//GET items form cart

const getItems = async (req, res) => {

    const { id } = req.params
    try {
        const items = await cartModels.find({ user_id: id }).sort({ createdAt: -1 })
        res.status(200).json(items)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//delete items from cart

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)

        const cartItem = await cartModels.findOneAndDelete({ _id: id })

        if (!cartItem) {
            return res.status(400).json({ error: "No such item in the wishlist" })
        }

        res.status(200).json({ cartItem, message: `item ${cartItem._id} deleted successfully` })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


export { addItemToCart, getItems, deleteItem }