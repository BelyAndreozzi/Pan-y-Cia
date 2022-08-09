const cartItem = document.getElementById("cart-item")
const totalPriceUnits = document.getElementById("total-price-units")
const addItemAlertButton = document.getElementsByClassName("p_boton");
const reiniciarCarrito = document.getElementById("boton-reiniciar-carrito")
const finalizarCompra = document.getElementById("boton-finalizar-compra")



let cart = JSON.parse(localStorage.getItem("Carrito")) || [];
renderCart();

//   ======= Productos de la tienda ========
(async () => {

    try {
        const response = await fetch("../src/stock/database.json")
        const data = await response.json()
        localStorage.setItem("data", JSON.stringify(data))
        renderProducts(data)
    } catch (error) {
        swal({
            title: '¡ERROR!',
            text: 'Algo salió mal. Inténtalo de nuevo más tarde',
            icon: 'error',
            confirm: 'Ok',
            timer: 5000
        })
    }
})()



// Mostrar los productos en el DOM. 

function renderProducts(data) {

    const shop = document.getElementById("productos_tienda");


    data.forEach((item) => {
        let producto =
            `
            <div class="card border-warning" style="width: 18rem;">
                <img src="${item.img}" class="card-img-top p_foto" alt="imagen del producto">
                <div class="card-body">
                    <h5 class="card-title">${item.nombre}</h5>
                    <p class="card-text">$${item.precio}</p>
                    <button class="p_boton" id=${item.id}>Añadir al carrito</button>
                </div>
            </div>
        `

        shop.innerHTML += producto;
        eventRemoveItem()
    });
    eventAddToCart()
};


//   ======= Funciones del carrito. =========

// Evento de click para el botón de añadir al carrito
function eventAddToCart() {
    let buttons = document.getElementsByClassName('p_boton');
    for (const element of buttons) {
        element.addEventListener('click', () => {
            addToCart(element.id)

        })
    }

    for (const element of addItemAlertButton) {
        element.addEventListener('click', (e) => {
            Toastify({
                text: "Agregaste un producto al carrito",
                duration: 2000,
                gravity: "bottom",
                position: "left",
                style: { background: "#f6d365" },
                stopOnFocus: true,
                close: true,
            }).showToast();
        });
    }
};

//Agregar productos al carrito. 
function addToCart(id) {
    let data = JSON.parse(localStorage.getItem("data"))
    if (data) {
        if (cart.some((item) => item.id == id)) {
            quantityChangeInCart("plus", id)
        } else {
            const item = data.find((producto) => producto.id == id);

            cart.push({
                ...item,
                cantidad: 1,
            });
        }

        renderCart();
    }
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
        <h5 class="m-0 text-center">${item.nombre}</h5>
        <div class="m-0 card mb-3 border-warning" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${item.img}" alt="${item.nombre}" class="img-fluid rounded-start"> 
                </div>
                <div class="col-md-8 d-flex flex-col align-items-center">
                    <div class="card-body col-12 d-flex">   
                        <div class="btn minus m-0 p-0 col-3 border-danger" onclick="quantityChangeInCart('minus', ${item.id})">-</div>
                        <div class=" m-0 p-0 h5 col-3 text-center">${item.cantidad}</div>
                        <div class="btn plus m-0 p-0 col-3 border-success" onclick="quantityChangeInCart('plus', ${item.id})">+</div>
                        <div class="remove_item col-4 d-flex justify-content-center" id=${item.id}> <img src="../logos/eliminar.png" class="eliminar-item-logo"></div>
                    </div>
                    <p class="m-0"><small class="text-muted">Valor unidad: $${item.precio}</small></p>
                </div>
            </div>
        </div>
        `
    })

    eventRemoveItem();
}

// Incremento o decremento de unidades en el carrito. 
function quantityChangeInCart(action, id) {

    cart = cart.map((item) => {

        let cantidad = item.cantidad
        if (item.id == id) {
            if (action === "minus" && cantidad > 1) {
                cantidad--;
            } else if (action === "plus") {
                cantidad++
            }

        }

        return {
            ...item,
            cantidad: cantidad
        };
    });

    renderCart()
}

//Mostrar la cantidad y el precio total en el carrito.
function renderTotalPrice() {
    let totalPrice = 0;
    let totalItems = 0;

    cart.forEach((item) => {
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

//Eliminación de un producto del carrito AYUDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
function eventRemoveItem() {
    
    const removeItemButton = document.getElementsByClassName('remove_item');
    for (const element of removeItemButton) {
        element.addEventListener('click', () => {
            removeItem(element.id)
        })
    }
}

function removeItem(id) {
    cart = cart.filter((item) => item.id !== id) //Mira los items y se queda con los de la id distinta al eliminado

    renderCart()
}

//Reset carrito de compra
function cartReset() {
    cart = [];
    renderCart();
};

reiniciarCarrito.addEventListener("click", cartReset);



//Finalización de compra
finalizarCompra.addEventListener("click", checkout);

function checkout() {
    if (cart.length >= 1) {
        swal({
            title: 'Genial',
            text: '¡Haz realizado la compra con exito!',
            icon: 'success',
            confirm: 'Ok',
            timer: 3000
        });

        cartReset();
    } else {
        swal({
            title: '¡Cuidado!',
            text: 'No tienes ningún producto en el carrito',
            icon: 'error',
            confirm: 'Ok',
            timer: 3000
        })
    }

}
