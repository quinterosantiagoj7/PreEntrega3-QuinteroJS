// Entrega3 - JS


class Product {
    constructor(id, brand, model, color, category, price, img) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.color = color;
        this.category = category;
        this.price = price;
        this.img = img;
        this.quantity = 1;
    }
}

// objetos
const producto1 = new Product(1, "Diseño Original", "Rubi", "Rojo", "Bufanda 1", 100, "");
const producto2 = new Product(2, "Diseño Original", "Obsidian", "Negro", "Bufanda 2", 110, "");
const producto3 = new Product(3, "Diseño Original", "Gold", "Amarillo", "Bufanda 3", 120, "");
const producto4 = new Product(4, "Diseño Original", "Saphire", "Azul", "Bufanda 4", 130, "");
const producto5 = new Product(5, "Diseño Original", "Esmerald", "Verde", "Bufanda 5", 140, "");
const producto6 = new Product(6, "Diseño Original", "Gray", "Gris", "Bufanda 6", 150, "");
const producto7 = new Product(7, "Diseño Original", "Sky", "Celeste", "Bufanda 7", "");
const producto8 = new Product(8, "Diseño Original", "Onix", "Marron", "Bufanda 8", 170, "");
const producto9 = new Product(9, "Diseño Original", "Violet", "Purpura", "Bufanda 9", 180, "")

// array de productos
const products = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9]

// array con carrito, inicio vacío
let cart = []

// cargar carrito dsd localStorage
if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
}

// mostrar productos
const productContainer = document.getElementById("productContainer")

const showProducts = () => { // función flecha
    products.forEach(product => { // función de orden superior
        const card = document.createElement("div");

        card.innerHTML = ` 
                        <div class = "card-body">
                            <img src = "${product.img}" class = "card-img-top imgProductos" alt = "${product.brand}">
                            <h3> Producto "<b>${product.brand}</b> ${product.model}" </h3>                            
                            <h4>${product.category.toUpperCase()} </h4>
                            <p><b>Color:</b> ${product.color} <b>• Precio:</b> $${product.price}</p>
                            <button class = "btn colorBoton" id="button${product.id/*cada boton tiene id diferente*/}"><img src = "../img/header_mobile_carrito_blanco.png" class="imgCarrito" alt ="Agregar al carrito"></button>
                        </div>
                        `

        productContainer.appendChild(card) // card


        const button = document.getElementById(`button${product.id}`)
        button.addEventListener("click", () => { // evento funcion flecha
            addToCart(product.id)
        })
    })
}

// función para agregar al carrito
const addToCart = (id) => {
    const productInCart = cart.find(product => product.id === id)
    if (productInCart) {
        productInCart.quantity++; // si el producto ya está en carrito incrementa la cantidad
    } else {
        const product = products.find(product => product.id === id) // si producto no está en carrito agrega
        cart.push(product)

        //localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

    }
    calculateTotal(); // sumando total de la compra
}

showProducts();

// mostrar carrito

const cartContainer = document.getElementById("cartContainer")
const checkCart = document.getElementById("checkCart")

checkCart.addEventListener("click", () => { // evento c función flecha
    showCart();
})

// función mostrar carrito
const showCart = () => {
    cartContainer.innerHTML = "";
    cart.forEach(product => {
        const card = document.createElement("div");

        card.innerHTML = ` 
                        <div class = "card-body">
                            <img src = "${product.img}" class = "card-img-top imgProductos" alt = "${product.brand}">
                            <h4> ${product.brand} ${product.model} • ${product.color} • $${product.price} </h4>                          
                            <p>Cantidad:<b> ${product.quantity} </b></p> 
                            <button class = "btn colorBoton" id="eliminar${product.id}">Eliminar</button>
                        </div>
                        `

        cartContainer.appendChild(card);

        //eliminar productos del carrito

        const button = document.getElementById(`eliminar${product.id}`);
        button.addEventListener("click", () => {
            removeFromCart(product.id); //funcion eliminar
        })
    })
    calculateTotal(); // suma total de la compra
}

// eliminar productor

const removeFromCart = (id) => {
    const product = cart.find(product => product.id === id);
    const index = cart.indexOf(product);
    cart.splice(index, 1);
    // sweet alert eliminar producto de carrito
    Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Producto eliminado',
        showConfirmButton: false,
        color: 'black',
        timer: 1500
    })

    //actualizar carrito

    showCart();

    //localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
}

//vaciar carrito

const emptyCart = document.getElementById("emptyCart")

emptyCart.addEventListener("click", () => {
    deleteCart(); // eliminar carrito
})

const deleteCart = () => {
    cart = [];
    showCart();

    // sweet alert carrito vacío
    Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Carrito vacío',
        showConfirmButton: false,
        color: 'black',
        timer: 1500
    })

    //localStorage
    localStorage.clear("cart", JSON.stringify(cart)); // para borrar el storage cuando se vacia
}

// calculo total

const total = document.getElementById("total")

const calculateTotal = () => {
    let totalShop = 0;
    cart.forEach(product => {
        totalShop += product.price * product.quantity;
    })
    total.innerHTML = ` $${totalShop}`;
}