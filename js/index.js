let productsList = [];

const URLProducts = "js/productos.json";

function sortProducts(){
    productsList.sort(function (a, b){
        return (a.precio - b.precio)
    })}

function renderProducts(){
    let i = 0;
    for(const produ of productsList){
        produ.id = i++;
        produ.cantidad = 0;
        $(`#${produ.tipo}`).append( ` <div>
                                <h3 class="card-title"> ${produ.modelo}</h3>
                                <img src=${produ.imagen} class="card-img" alt="pc">
                                <p class="card-price"> $${produ.precio}</p>
                                <button onclick="agregarcarrito(${produ.id})"  class="card-button" >Añadir al carrito</button>
                                </div>`).find('div:last').addClass('card').css("display","none").fadeIn(1000);     
    }}


function getProducts(){
    $.getJSON(URLProducts, function (respuesta, estado){
        if (estado === "success"){
            let misDatos = respuesta;
            for(const producto of misDatos){
                productsList.push(producto);
            }
        }
    sortProducts();
    renderProducts();
    });
}

$(document).ready(function(){
    getProducts();
});





//Cart------------------------------------------------------------------------------------------------

let shoppingCart;

const popupbtn = document.querySelector('.popupbtn');
const popup = document.querySelector('.popup-wrapper');
const close = document.querySelector('.popup-close');


if(localStorage.getItem("total-storage") === null){
    localStorage.setItem("total-storage", 0);
}

let cartTotal = parseInt(localStorage.getItem("total-storage"));

if(localStorage.getItem('cart-storage') === null){
    shoppingCart = [];
    $(".buybtn").remove();
}
else {
    shoppingCart=JSON.parse(localStorage.getItem('cart-storage'));
}

document.getElementsByClassName("name-total")[0].innerHTML = "$"+localStorage.getItem("total-storage");

function renderCarrito(){
for(const product of shoppingCart){
    if(product != null){
    $(`#cartcart`).append( ` <div>
                            <img src=${product.imagen} alt="cart" class="cart-img">
                            <p class="cart__price__item">$${product.precio}</p>
                            <p class="cart__price__item"><img onclick="restarcarrito(${product.id})" src="assets/minus.png"" alt="plus" class="plus-img">${product.cantidad}<img onclick="sumarcarrito(${product.id})" src="assets/plus.png"" alt="plus" class="plus-img"></p>
                            <p class="cart__price__item">$${(product.precio)*(product.cantidad)}</p>
                        </div>`).find('div:last').addClass('card-carrito-items');
}}}

renderCarrito();

function restarcarrito(num){
    if(shoppingCart[num].cantidad === 1){
        cartTotal -= shoppingCart[num].precio; 
        shoppingCart[num] = null;
        localStorage.setItem("cart-storage", JSON.stringify(shoppingCart));
        localStorage.setItem("total-storage", cartTotal);
        $(".card-carrito-items").remove();
        actualizarCarrito();
        renderCarrito();
    }
    else{
    shoppingCart[num].cantidad--;
    cartTotal -= shoppingCart[num].precio; 
    localStorage.setItem("cart-storage", JSON.stringify(shoppingCart));
    localStorage.setItem("total-storage", cartTotal);
    $(".card-carrito-items").remove();
    
    actualizarCarrito();
    renderCarrito();
}}

function sumarcarrito(num){
    shoppingCart[num].cantidad++;
    cartTotal += shoppingCart[num].precio; 
    localStorage.setItem("cart-storage", JSON.stringify(shoppingCart));
    localStorage.setItem("total-storage", cartTotal);
    $(".card-carrito-items").remove();
    actualizarCarrito();
    renderCarrito();
}

function actualizarCarrito(){
    localStorage.setItem("total-name", cartTotal);
    document.getElementsByClassName("name-total")[0].innerHTML = "$"+cartTotal;
}


function agregarcarrito(num){ 
    if(!shoppingCart.includes(productsList[num])){
        shoppingCart[num] = productsList[num];
        shoppingCart[num].cantidad++;
        localStorage.setItem("cart-storage", JSON.stringify(shoppingCart));
        cartTotal += productsList[num].precio;  
        localStorage.setItem("total-storage", cartTotal);
    }  else if(shoppingCart.includes(productsList[num])) {
        shoppingCart[num].cantidad++;
        localStorage.setItem("cart-storage", JSON.stringify(shoppingCart));
        cartTotal += productsList[num].precio; 
        localStorage.setItem("total-storage", cartTotal);
        console.log("Se agrego un elemento");
    }
        return cartTotal;
}

function vaciarCarrito(){
    cartTotal=0;
    localStorage.clear();
    $(".card-carrito-items").remove();
    $(".buybtn").remove();
    actualizarCarrito();   
}


 

