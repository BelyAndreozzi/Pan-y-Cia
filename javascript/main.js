const cartItem = document.getElementById("cart-item")
const totalPriceUnits = document.getElementById("total-price-units")

let cart =  JSON.parse(localStorage.getItem("Carrito")) || [];
renderCart(); 

//   ======= Productos de la tienda ========

const products = [
    {
        "id": 1,
        "nombre": "pan",
        "precio": 260,
        "peso": 1,
        "img": "../fotos/pan.jpg",
    },
    {
        "id": 2,
        "nombre": "galleta de nuez",
        "precio": 280,
        "peso": 1,
        "img": "./fotos/-----",
    },
    {
        "id": 3,
        "nombre": "pan rallado",
        "precio": 200,
        "peso": 1,
        "img": "./fotos/----",
    },
    {
        "id": 4,
        "nombre": "bizcochos",
        "precio": 800,
        "peso": 1,
        "img": "./fotos/-----",
    },
    {
        "id": 5,
        "nombre": "grisines",
        "precio": 400,
        "peso": 1,
        "img": "./fotos/-----",
    },
    {
        "id": 6,
        "nombre": "masitas",
        "precio": 1000,
        "peso": 1,
        "img": "./fotos/-----",
    },
    {
        "id": 7,
        "nombre": "tiramisu",
        "precio": 1400,
        "peso": 1,
        "img": "./fotos/-----",
    },
    {
        "id": 8,
        "nombre": "milhoja",
        "precio": 1400,
        "peso": 1,
        "img": "./fotos/-----",
    },
    {
        "id": 9,
        "nombre": "merengues",
        "precio": 1600,
        "peso": 1,
        "img": "./fotos/-----",
    },
    /* {
        "id": 10,
        "nombre": "facturas",
        "precio": 600,
        "docena": 1,
        "img": "./fotos/-----",
    },
    {
        "id": 11,
        "nombre": "sandwich de miga",
        "precio": 1200,
        "docena": 1,
        "img": "./fotos/-----",
    }, */
];

// Mostrar los productos en el DOM. 
function renderProducts() {

    const shop = document.getElementById("productos_tienda");

    products.forEach((product) => {
        let producto =
            `
            <div class="card">
                <img class="p_foto" src="${product.img}">
                <div class="card_info"
                    <p class="p_nombre"> ${product.nombre} </p>
                    <p class="p_precio"> $${product.precio} </p>
                    <button class="p_boton" onclick="addToCart(${product.id})">Añadir al carrito</button>
                </div>
            </div>
        `

        shop.innerHTML += producto;
    });
}

renderProducts();

//   ======= Funciones del carrito. =========

//Agregar productos al carrito. 
function addToCart(id) {
    //Revisión de la existencia del item. 
    if (cart.some((item) => item.id === id)) {
        quantityChangeInCart("plus", id)
    } else {
        const item = products.find((producto) => producto.id === id);

        cart.push({
            ...item,
            cantidad: 1,
        });
    }

    renderCart();
}

//Mostrar el carrito en el DOM.
function renderCart(params) {
    renderCartItem()
    renderTotalPrice()

    //Local Storage
    localStorage.setItem("Carrito", JSON.stringify(cart));
}


//Mostrar los items en el carrito
function renderCartItem() {
    cartItem.innerHTML = "";
    cart.forEach((item) => {
        cartItem.innerHTML += `
        <li class="nav-link d-flex flex-wrap flex-row">
                <div class="col-12 text-light h5 text-center p-0">${item.nombre}</div>
                <div class="col-4 p-0"> <img class="img-fluid" src="${item.img}" alt="${item.nombre}"> </div>
            <div class="col-2 bg-primary text-light justify-content-around d-flex flex-column">
                <div class="btn minus" onclick="quantityChangeInCart('minus', ${item.id})">-</div>
                <div class="product-quantity m-0 p-0 h5">${item.cantidad}</div>
                <div class="btn plus" onclick="quantityChangeInCart('plus', ${item.id})">+</div>
            </div>
            <div class="sidecart-price pl-0 col-6 bg-primary text-right d-flex flex-wrap text-light">
                <div onclick="removeItem(${item.id})">
                    <img src="../logos/eliminar.png" class="footer_logos_info">
                </div>
                <div class="product-price">$${item.precio}</div>
                
            </div>
        </li>
        `
    })
}

// Incremento o decremento de unidades en el carrito. 
function quantityChangeInCart(action, id) {
    cart = cart.map((item) =>{
        let cantidad = item.cantidad
        if (item.id === id) {
            if (action === "minus" && cantidad > 1) {
                cantidad--;
            } else if (action === "plus") {
                cantidad++
            }
            
        }

        return {...item,
        cantidad: cantidad};
    });

    renderCart()
}

//Mostrar la cantidad y el precio total en el carrito.
function renderTotalPrice() {
    let totalPrice = 0;
    let totalItems = 0;
    
    cart.forEach((item) =>{
        totalPrice += item.precio * item.cantidad;
        totalItems += item.cantidad;
    });

    totalPriceUnits.innerHTML = ` 
    <div class="text-light h5 text-left mx-3">Cantidad de productos: <span class="text-success"
    id="sidecart-total">${totalItems}</span></div>
    <div class="p-2">
    <div class="text-light h5 text-left mx-3">Valor total: <span class="text-success"
    id="sidecart-total">$${totalPrice}</span></div>
    <div class="p-2">
`
} 

//Eliminación de un producto del carrito
function removeItem(id) {
    cart = cart.filter((item) => item.id !== id ) //Mira los items y se queda con los de la id distinta al eliminado

    renderCart()
}

//Side cart (predeterminado)
function toggleCart() {
    document.querySelector('.sidecart').classList.toggle('open-cart');
}

toggleCart();