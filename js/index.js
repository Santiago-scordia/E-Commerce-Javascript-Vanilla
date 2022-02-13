let listaProductos = [];

const URLProductos = "js/productos.json";

function ordenarProductos(){
    listaProductos.sort(function (a, b){
        return (a.precio - b.precio)
    })}

function renderProducts(){
    let i = 0;
    for(const produ of listaProductos){
        produ.id = i++;
        produ.cantidad = 1;
        $(`#${produ.tipo}`).append( ` <div>
                                <h3 class="card-title"> ${produ.modelo}</h3>
                                <img src=${produ.imagen} class="card-img" alt="pc">
                                <p class="card-price"> $${produ.precio}</p>
                                <button onclick="sumarcarrito(${produ.id})" class="card-button" >Añadir al carrito</button>
                                </div>`).find('div:last').addClass('card');     
    }}
    
function traerProductos(){
    $.getJSON(URLProductos, function (respuesta, estado){
        if (estado === "success"){
            let misDatos = respuesta;
            for(const producto of misDatos){
                listaProductos.push(producto);
            }
        }
    ordenarProductos();
    renderProducts();
    });
}

$(document).ready(function(){
    traerProductos();
});


//Cart------------------------------------------------------------------------------------------------


if(localStorage.getItem("total-storage") === null){
    localStorage.setItem("total-storage", 0);
}


let totalCarrito = parseInt(localStorage.getItem("total-storage"));

let modelos;
if(localStorage.getItem('hijos') === null){
    modelos = [];
}
else {
    modelos=JSON.parse(localStorage.getItem('hijos'));
}

document.getElementsByClassName("name-total")[0].innerHTML = "$"+localStorage.getItem("total-storage");

for(const produ of modelos){
    if(produ != null){
    $(`#cartcart`).append( ` <div>
                            <img src=${produ.imagen} alt="cart" class="cart-img">
                            <p class="cart__price__item">$${produ.precio}</p>
                            <p class="cart__price__item">${produ.cantidad}</p>
                            <p class="cart__price__item">$${(produ.precio)*(produ.cantidad)}</p>
                        </div>`).find('div:last').addClass('card-carrito-items');
}}

function actualizarCarrito(){
    localStorage.setItem("total-name", totalCarrito);
    document.getElementsByClassName("name-total")[0].innerHTML = "$"+totalCarrito;
}


function sumarcarrito(num){ 
    if(!modelos.includes(listaProductos[num])){
        modelos[num] = listaProductos[num];
        localStorage.setItem("hijos", JSON.stringify(modelos));
        totalCarrito += listaProductos[num].precio;  
        localStorage.setItem("total-storage", totalCarrito);
    }  else if(modelos.includes(listaProductos[num])) {
        (modelos[num].cantidad)++;
        localStorage.setItem("hijos", JSON.stringify(modelos));
        totalCarrito += listaProductos[num].precio; 
        localStorage.setItem("total-storage", totalCarrito);
        console.log("Se sumo uno");
    }
    
        return totalCarrito;
}

function vaciarCarrito(){
    totalCarrito=0;
    localStorage.clear();
    $(".card-carrito-items").remove();
    actualizarCarrito();   
}

