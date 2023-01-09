const cartLink = document.getElementsByClassName('cartLink')
const cartName = document.getElementsByClassName('cartName')
const products = document.getElementsByClassName('products')
const addProducts = document.getElementsByClassName('addProducts')
const addCart = document.getElementsByClassName('addCart')

// Evento para los links a carritos
for (let i=0; i < cartLink.length; i++) {
    cartLink[i].addEventListener('click', () => {
        // Fetch para mostrar productos del carrito según su id
        fetch(`/api/carrito/${cartLink[i].id}/productos`)
            .then(res => res.json())
            .then(cart => {
                const cartProds = cart.productos.map(product => {
                    return `<div class='productDiv'>
                                <div class='productContainer'>
                                    <p class='productContainerP'><span class='productContainerSpan'>Producto: </span>${product.product}</p>
                                    <p class='productContainerP'><span class='productContainerSpan'>Precio: </span>$${product.price}</p>
                                    <p class='productContainerP'><span class='productContainerSpan'>Descripción: </span>${product.description}</p>
                                    <p class='productContainerP'><span class='productContainerSpan'>Stock: </span>${product.stock}</p>
                                </div>
                                <div class='thumbnailContainer'>
                                    <img class='thumbnail' src='${product.thumbnail}' alt='imagen producto' width='60px'>
                                </div>
                                <div class='deleteProductBtnContainer'>
                                    <button class='deleteProductBtn' id='${product.id}'>Eliminar</button>
                                </div>
                            </div>
                            `
                })
                cartName[0].innerHTML = 
                    `<p class='cartTitle'>Carrito ${cart.id}</p>
                     <button class='deleteCartBtn'>Eliminar carrito</button>
                    `
                products[0].innerHTML = cartProds.join('') || `<p class='emptyCart'>Carrito vacío</p>`
                const deleteProductBtn = document.getElementsByClassName('deleteProductBtn')
                const deleteCartBtn = document.getElementsByClassName('deleteCartBtn')
                // Llamado a funciones borrar producto, borrar carrito y comprar producto
                deleteProduct(deleteProductBtn, cartLink[i].id)
                deleteCart(deleteCartBtn, cartLink[i].id)
                addProductToCart(cartLink[i].id)
            })
    })
}

// Función evento botón para comprar productos
const addProductToCart = (cartId) => {
    addProducts[0].innerHTML = `<button id='addProductBtn'>Agregar productos al carrito</button>`
    const addProductBtn = document.getElementById('addProductBtn')
    addProductBtn.addEventListener('click', () => {
        fetch('/api/productos/arrayproductos').then(res => res.json())
            .then(productos => addProduct(productos, cartId))
    })
}

// Función mostrar cards de productos para comprar
const addProduct = (productos, cartId) => {
    const productCards = productos.map(product => {
        return `<div class='productCard'>
                    <p class='cardInput productInput'>${product.product}</p>
                    <div class='priceContainer'>
                        <span class='priceSign'>$ </span>
                        <p class='cardInput cartPrice'>${product.price}</p>
                    </div>
                    <div class='thumbContainer'>
                        <img class='thumbnail' src='${product.thumbnail}' alt='imagen producto' width='60px'>
                    </div>
                    <p class='cardInput descriptionInput'>${product.description}</p>
                    <div class='stockContainer'>
                        <span class='priceSign'>Stock: </span>
                        <p class='cardInput cartStock'>${product.stock}</p>
                    </div>
                    <div class='buyBtnContainer'>
                        <button class='buyBtn' id='${product.id}'>COMPRAR</button>
                    </div>
                    <input class='codeInput' type='hidden' value='${product.code}'>
                </div>`
    })
    const newDiv = document.createElement('div')
    newDiv.className = 'cardContainer'
    addProducts[0].appendChild(newDiv)
    const cardContainer = document.getElementsByClassName('cardContainer')
    cardContainer[0].innerHTML = productCards.join('')
    const buyBtn = document.getElementsByClassName('buyBtn')
    buyProduct(buyBtn, productos, cartId)
}

// Evento comprar producto
const buyProduct = (buyBtn, productos, cartId) => {
    for (let i=0;i < buyBtn.length;i++) {
        buyBtn[i].addEventListener('click', () => {
            const selectedProduct = productos.find(product => product.id === parseInt(buyBtn[i].id))
            fetch(`/api/carrito/${cartId}/productos/${buyBtn[i].id}`,
                {
                    method: 'POST',
                    body: JSON.stringify(selectedProduct),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
                .then(cart => {
                    console.log(cart)
                    const productHTML =
                        `<div class='productDiv'>
                            <div class='productContainer'>
                                <p class='productContainerP'><span class='productContainerSpan'>Producto: </span>${selectedProduct.product}</p>
                                <p class='productContainerP'><span class='productContainerSpan'>Precio: </span>$${selectedProduct.price}</p>
                                <p class='productContainerP'><span class='productContainerSpan'>Descripción: </span>${selectedProduct.description}</p>
                                <p class='productContainerP'><span class='productContainerSpan'>Stock: </span>${selectedProduct.stock}</p>
                            </div>
                            <div class='thumbnailContainer'>
                                <img class='thumbnail' src='${selectedProduct.thumbnail}' alt='imagen producto' width='60px'>
                            </div>
                            <div class='deleteProductBtnContainer'>
                                <button class='deleteProductBtn' id='${selectedProduct.id}'>Eliminar</button>
                            </div>
                         </div>`
                    const emptyCart = document.getElementsByClassName('emptyCart')
                    emptyCart[0] === undefined ? false : emptyCart[0].style.display = 'none'
                    products[0].innerHTML += productHTML
                    const deleteProductBtn = document.getElementsByClassName('deleteProductBtn')
                    deleteProduct(deleteProductBtn, cartId)
                })
        })
    }
}

// Evento agregar nuevo carrito
addCart[0].addEventListener('click', () => {
    fetch('/api/carrito', { method: 'POST' }).then(res => res.json())
        .then(json => {
            console.log('ID nuevo carrito:', json)
            document.location.reload()
        })
})

// Función borrar carrito
const deleteCart = (deleteCartBtn, cartId) => {
    deleteCartBtn[0].addEventListener('click', () => {
        fetch(`/api/carrito/${cartId}`, { method: 'DELETE'}).then(res => res.json())
            .then(json => {
                console.log(json)
                document.location.reload()
            })
    })
}

// Función borrar producto según su id e id de carrito
const deleteProduct = (deleteProductBtn, cartId) => {
    for (let i=0;i < deleteProductBtn.length;i++) {
        deleteProductBtn[i].addEventListener('click', () => {
            fetch(`/api/carrito/${cartId}/productos/${deleteProductBtn[i].id}`, { method: 'DELETE'})
                .then(res => res.json())
                .then(cart => {
                    console.log(cart)
                    const cartProds = cart.productos.map(product => {
                            return `<div class='productDiv'>
                                        <div class='productContainer'>
                                            <p class='productContainerP'><span class='productContainerSpan'>Producto: </span>${product.product}</p>
                                            <p class='productContainerP'><span class='productContainerSpan'>Precio: </span>$${product.price}</p>
                                            <p class='productContainerP'><span class='productContainerSpan'>Descripción: </span>${product.description}</p>
                                            <p class='productContainerP'><span class='productContainerSpan'>Stock: </span>${product.stock}</p>
                                        </div>
                                        <div class='thumbnailContainer'>
                                            <img class='thumbnail' src='${product.thumbnail}' alt='imagen producto' width='60px'>
                                        </div>
                                        <div class='deleteProductBtnContainer'>
                                            <button class='deleteProductBtn' id='${product.id}'>Eliminar</button>
                                        </div>
                                    </div>
                                    `
                    })
                    products[0].innerHTML = cartProds.join('') || `<p class='emptyCart'>Carrito vacío</p>`
                    const deleteProductBtn = document.getElementsByClassName('deleteProductBtn')
                    deleteProduct(deleteProductBtn, cartId)
                })
        })
    }
}