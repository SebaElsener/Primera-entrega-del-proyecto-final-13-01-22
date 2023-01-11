# Primera entrega del proyecto final backend

Para probar la funcionalidad se desarrolló una interfaz sencilla de frontend con dos rutas principales, *'/api/productos'* y *'/api/carrito'*.
Tanto los productos como el carrito quedan guardados haciendo uso de *fs*.


## '/api/productos'
Renderiza un formulario para nuevos ingresos de productos además de las cards de cada producto, en las que se pueden modificar los items o eliminar el producto completo.
Tanto el alta, modificación o eliminación de la información dependen del valor *true* o *false* de la constante *administrador* declarada en *productsRouter.js*, modificando el valor permitirá o no estas acciones, mostrando por consola un objeto de error si está en *false*.  Además las cards muestran o no las opciones de *actualizar* o *eliminar* dependiendo del valor de *administrador*.

Debajo del formulario de ingreso de productos se encuentra el link del *CARRITO* que dirige a la vista del carrito guardado.  A la derecha de este link se muestra la cantidad de productos que contiene el carrito, que va variando si compramos o eliminamos productos.  En caso de no existir ningún carrito, es creado automáticamente con id "1" al hacer click en *COMPRAR* en cualquiera de las cards de productos.

## '/api/carrito'
Muestra los productos del carrito guardado.  Se puede eliminar el carrito completo y cada producto en el carrito tiene un botón *Eliminar* para quitarlo del carrito.

## Comentarios
* El puerto de escucha en localhost es *8080*.
* El puerto de escucha para glitch es *process.env.PORT*.
* Todos los métodos *get, post, put y delete* son enviados utilizando *fetch*.

### Link al repositorio en GitHub: https://github.com/SebaElsener/Primera-entrega-del-proyecto-final-13-01-22
### Link al deploy en Glitch: https://glitch.com/edit/#!/messy-hungry-cairnsmore
### Link al live site desplegado en Glitch: https://messy-hungry-cairnsmore.glitch.me/api/productos