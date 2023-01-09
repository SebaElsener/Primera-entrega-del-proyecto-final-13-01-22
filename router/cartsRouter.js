
const { Router: router } = require('express')
const apiCarts = require('../api/carts.js')

const routeCarts = new router()

const carts = new apiCarts('carts.txt')

// devuelve todos los productos del carrito según id
routeCarts.get('/:id/productos', async (req, res) => {
    const cart = await carts.getCartById(parseInt(req.params.id))
    res.json(cart)
})

// guarda un nuevo carrito con id y timestamp
routeCarts.post('/', async (req, res) => {
    const newCart = await carts.save()
    res.json(newCart)
})

// guarda un nuevo producto según id de carrito e id de producto especificado
routeCarts.post('/:id_cart/productos/:id_prod', async (req, res) => {
    const addProduct = await carts.addProductById(parseInt(req.params.id_cart), parseInt(req.params.id_prod))
    res.json(addProduct)
})

// borra un producto según id de carrito e id de producto
routeCarts.delete('/:id_cart/productos/:id_prod', async (req, res) => {
    const productToDelete = await carts.deleteProductById(parseInt(req.params.id_cart), parseInt(req.params.id_prod))
    res.json(productToDelete)
})

// borrar carrito completo según id
routeCarts.delete('/:id', async (req, res) => {
    const deletedCart = await carts.deleteCartById(parseInt(req.params.id))
    res.json(deletedCart)
})

// Renderizar carritos guardados
routeCarts.get('/carritos', async (req, res) => {
    const allCarts = await carts.getAll()
    res.render('./partials/carts',
        {
            allCarts: allCarts,
            cartsQty: allCarts.length
        }
    )
})

module.exports = routeCarts