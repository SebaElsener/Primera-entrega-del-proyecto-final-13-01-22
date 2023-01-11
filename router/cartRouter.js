
const { Router: router } = require('express')
const apiCarts = require('../api/cart.js')

const routeCart = new router()

const carts = new apiCarts('carts.txt')

// devuelve todos los productos del carrito según id
routeCart.get('/:id/productos', async (req, res) => {
    const cart = await carts.getCartById(parseInt(req.params.id))
    res.json(cart)
})

// guarda un nuevo carrito con id y timestamp
routeCart.post('/', async (req, res) => {
    const newCart = await carts.save()
    res.json(newCart)
})

// guarda un nuevo producto según id de carrito e id de producto especificado
routeCart.post('/:id_cart/productos/:id_prod', async (req, res) => {
    const addProduct = await carts.addProductById(parseInt(req.params.id_cart), parseInt(req.params.id_prod))
    res.json(addProduct)
})

// borra un producto según id de carrito e id de producto
routeCart.delete('/:id_cart/productos/:id_prod', async (req, res) => {
    const productToDelete = await carts.deleteProductById(parseInt(req.params.id_cart), parseInt(req.params.id_prod))
    res.json(productToDelete)
})

// borrar carrito completo según id
routeCart.delete('/:id', async (req, res) => {
    const deletedCart = await carts.deleteCartById(parseInt(req.params.id))
    res.json(deletedCart)
})

// Renderizar carrito
routeCart.get('/', async (req, res) => {
    const cart = await carts.getCartById(1) || { productos: [] }
    res.render('./partials/cart',
        {
            cart: cart,
            productsQty: cart.productos.length
        }
    )
})

module.exports = routeCart