# Primera entrega del proyecto final backend

Para probar la funcionalidad se desarrolló una interfaz sencilla de frontend con dos rutas principales, *'/api/productos'* y *'/api/carrito/carritos'*.
Tanto los productos como los carritos quedan guardados haciendo uso de *fs*.


## '/api/productos'
Renderiza un formulario para nuevos ingresos de productos además de las cards de cada producto, en las que se pueden modificar los items o eliminar el producto completo.
Tanto el alta, modificación o eliminación de la información dependen del valor *true* o *false* de la constante *administrador* declarada en *productsRouter.js*, modificando el valor permitirá o no estas acciones, mostrando por consola un objeto de error si está en *false*.
Asimismo, se encuentra un link *Ver carritos* que dirige a la vista de los carritos guardados.

## '/api/carrito/carritos'
Muestra todos los carritos guardados.  Haciendo click en *Agregar carrito* se pueden añadir nuevos carritos.  Haciendo click en alguno de los carritos se habilitan las opciones de *Eliminar carrito* y *Agregar productos al carito*.  Este último link muestra los productos en forma de cards y los va agregando a la vista del carrito.  A su vez, cada producto en el carrito tiene un botón *Eliminar* para quitarlo del carrito.

## Comentarios
* El puerto de escucha en localhost es *8080*.
* El puerto de escucha para glitch es *process.env.PORT*.
* Todos los métodos *get, post, put y delete* son enviados utilizando *fetch*.

### Link al repositorio en GitHub: 
### Link al repositorio en Glitch: 