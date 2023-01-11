
const express = require('express')
const { Server: HttpServer } = require('http')
const productsRouter = require('./router/productsRouter.js')
const cartRouter = require('./router/cartRouter.js')

const app = express()
const httpServer = new HttpServer(app)

app.set('view engine', 'ejs')
app.set('views', __dirname + '/public/views');

app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use('/api/productos', productsRouter)
app.use('/api/carrito', cartRouter)
// Middleware para mostrar error al intentar acceder a una ruta/método no implementados
app.use((req, res) => {
    res.status(404).json({
        error: -1,
        descripcion: `ruta '${req.path}' método '${req.method}' no implementada`
    })
})

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`http server escuchando en puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))