
const { Router: router } = require('express')
const apiProducts = require('../api/contenedor.js')

const routeProducts = new router()

const products = new apiProducts('products.txt')
// Var para habilitar la modificación o alta de productos
const administrador = false

// Renderiza todos los productos y el form de nuevos ingresos
routeProducts.get('/', async (req, res) => {
    const productsList = await products.getAll()
    res.render('index', {
        admin: administrador,
        allProducts: productsList,
        productsQty: productsList.length
    })
})

// devuelve un producto según su id
routeProducts.get('/:id', async (req, res) =>{
    if (req.params.id === 'arrayproductos') {
        const allProducts = await products.getAll()
        res.json(allProducts)
    } else {
    const productById = [await products.getById(parseInt(req.params.id))]
    productById[0] === null
        ? res.json({ Error:  'Producto no encontrado' })
        : res.json(productById)
    }
})

// recibe y agrega un producto, y lo devuelve con su id asignado
routeProducts.post('/', async (req, res) =>{
    if (administrador) {
        const savedProduct = await products.save(req.body)
        res.json(savedProduct)
    } else {
        res.json({ error : -1, descripcion: 'Sólo administradores' })
    }
})

// recibe y actualiza un producto según su id
routeProducts.put('/:id', async (req, res) =>{
    if (administrador) {
        const updateInfo = req.body
        const productsList = await products.getAll()
        regToUpdate = productsList.findIndex(product => product.id === parseInt(req.params.id))
        if (regToUpdate === -1) {
            return res.send({ Error:  'Producto no encontrado' })
        }
        productsList[regToUpdate] = { ...updateInfo, id: parseInt(req.params.id) }
        await products.saveData(productsList)
        res.json({ ...updateInfo, id: parseInt(req.params.id) })
    } else {
        res.json({ error : -1, descripcion: 'Sólo administradores' })
    }
})

// elimina un producto según su id
routeProducts.delete('/:id', async (req, res) =>{
    if (administrador) {
        // almaceno el resultado de buscar el id para mostrar éxito o fallo al buscar id para eliminar
        const deletedId = await products.getById(parseInt(req.params.id))
        await products.deleteById(parseInt(req.params.id))
        deletedId === null
            ? res.json( {'Producto con ID': `${parseInt(req.params.id)} no encontrado`} )
            : res.json( {'Producto eliminado': deletedId.product} )
    } else {
        res.json({ error : -1, descripcion: 'Sólo administradores' })
    }
})

module.exports = routeProducts