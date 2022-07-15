const cartItem = document.getElementById("cart-item")
const totalPriceUnits = document.getElementById("total-price-units")

let cart =  JSON.parse(localStorage.getItem("Carrito")) || [];
renderCart(); 

//   ======= Productos de la tienda ========

const products = [
    {
        "id": 1,
        "nombre": "Pan - 1 kg",
        "precio": 260,
        "peso": 1,
        "img": "../fotos/pan.jpg",
    },
    {
        "id": 2,
        "nombre": "Galleta de nuez - 1 kg",
        "precio": 280,
        "peso": 1,
        "img": "../fotos/galletadenuez.jpg",
    },
    {
        "id": 3,
        "nombre": "Pan rallado - 1 kg",
        "precio": 200,
        "peso": 1,
        "img": "../fotos/panrallado.jpg",
    },
    {
        "id": 4,
        "nombre": "Bizcochos - 1 kg",
        "precio": 800,
        "peso": 1,
        "img": "../fotos/bizcochos.jpeg",
    },
    {
        "id": 5,
        "nombre": "Grisines - 1 kg",
        "precio": 400,
        "peso": 1,
        "img": "../fotos/grisines.jpg",
    },
    {
        "id": 6,
        "nombre": "Masitas - 1 kg",
        "precio": 1000,
        "peso": 1,
        "img": "../fotos/masitas.jpg",
    },
    {
        "id": 7,
        "nombre": "Masas finas - 1 kg",
        "precio": 1400,
        "peso": 1,
        "img": "../fotos/masasfinas.jpg",
    },
    {
        "id": 8,
        "nombre": "Tiramisú - 1 kg",
        "precio": 1400,
        "peso": 1,
        "img": "../fotos/tiramisu.jpg",
    },
    {
        "id": 9,
        "nombre": "Milhoja - 1 kg",
        "precio": 1400,
        "peso": 1,
        "img": "../fotos/milhojas.jpeg",
    },
    {
        "id": 10,
        "nombre": "Merengues - 1 kg",
        "precio": 1600,
        "peso": 1,
        "img": "../fotos/merengues.jpg",
    },
    {
        "id": 11,
        "nombre": "Facturas - 1 docena",
        "precio": 600,
        "docena": 1,
        "img": "../fotos/facturas.png",
    },
    {
        "id": 12,
        "nombre": "Sándwich de miga - 1 docena",
        "precio": 1200,
        "docena": 1,
        "img": "../fotos/sandwichdemiga.jpg",
    },
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

//Actualizar el carrito en el DOM.
function renderCart() {
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
        <li class="p_cart_info nav-link d-flex flex-wrap flex-row">
            <div class="p-top-cart">        
                <div class="col-12 text-dark text-center p-0">${item.nombre}</div>
                <div onclick="removeItem(${item.id})"> <img src="../logos/eliminar.png" class="footer_logos_info"></div>
            </div>
        
            <div class="col-4 p-0 p-img-cart"> <img class="img-fluid" src="${item.img}" alt="${item.nombre}"> </div>
            <div class="col-8">
                <div class="col-12 text-dark d-flex">
                    <div class="btn minus m-0 p-0 col-4" onclick="quantityChangeInCart('minus', ${item.id})">-</div>
                    <div class=" m-0 p-0 h5 col-4">${item.cantidad}</div>
                    <div class="btn plus m-0 p-0 col-4" onclick="quantityChangeInCart('plus', ${item.id})">+</div>
                </div>

                <div class="sidecart-price pl-0 col-12  text-right d-flex flex-wrap text-light">
                    <div class="product-price text-dark">Valor unidad: $${item.precio}</div> 
                </div>
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
    <div class="text-dar h5 text-left mx-3">Cantidad de productos: <span class=
    id="sidecart-total">${totalItems}</span></div>
    <div class="p-2">
    <div class="text-dark h5 text-left mx-3">Valor total: <span class="text-success"
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

//Esto es porque ya no sabía qué hacer para finalizar la compra. Al menos por esta entrega jajaja (acepto sugerencias):
const finalizarCompra = document.getElementById("boton-finalizar-compra")

finalizarCompra.onclick = () => {alert("Nadie había llegado tan lejos.")}