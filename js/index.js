class producto{
    constructor(modelo,precio,imagen,tipo,id,cantidad){
        this.modelo = modelo;
        this.precio = precio;
        this.imagen = imagen;
        this.tipo = tipo;
        this.id = id;
        this.cantidad = cantidad;
    }
}

//Procesadores
const procesador0 = new producto("Ryzen 3",23000,"assets/ryzen3.png","proces");
const procesador1 = new producto("Ryzen 5",46000,"assets/ryzen5.png","proces");
const procesador2 = new producto("Ryzen 7",75000,"assets/ryzen7.png","proces");
const procesador3 = new producto("Intel i5",39500,"assets/inteli5.png","proces");
const procesador4 = new producto("Intel i7",67250,"assets/inteli7.png","proces");

//Mothers
const mother0 = new producto("AsRock A320M",6800,"assets/asrocka320m.png","mother");
const mother1 = new producto("Asus Prime Z590",9500,"assets/asusprimez590.png","mother");
const mother2 = new producto("Asus TUF F560",17250,"assets/asustuf560.png","mother");
const mother3 = new producto("NZXT B550",12600,"assets/b550.png","mother");

//Placa de video
const placadevideo0 = new producto("Nvidia Rtx 3070",85000,"assets/3070.png","placasdevideo");
const placadevideo1 = new producto("Nvidia Rtx 3090",125600,"assets/3090.png","placasdevideo");
const placadevideo2 = new producto("Amd 6700Xt",105850,"assets/6700xt.png","placasdevideo");
const placadevideo3 = new producto("Amd 6500Xt",96200,"assets/6500xt.png","placasdevideo");
const placadevideo4 = new producto("Nvidia Rtx 3060",79000,"assets/3060.png","placasdevideo");
const placadevideo5 = new producto("Amd 5600Xt",68500,"assets/5600xt.png","placasdevideo");

//Rams
const ram0 = new producto("Corsair Pro 32Gb",19000,"assets/vengancepro32gb.png","rams");
const ram1 = new producto("Hyperx Fury 8Gb",8000,"assets/hyperxfury8gb.png","rams");
const ram2 = new producto("Crucial 4Gb",3700,"assets/crucial4gb.png","rams");
const ram3 = new producto("Xpg 8Gb",6900,"assets/xpg8gb.png","rams");
const ram4 = new producto("Corsair Vengance 8Gb",9520,"assets/corsairvengance8gb.png","rams");
const ram5 = new producto("Spetrix 16Gb",10200,"assets/spetrix16gb.png","rams");

//Gabinetes
const gabinete0 = new producto("Gigabyte C200",9750,"assets/gigabytec200.png","gabinetes");
const gabinete1 = new producto("Aorus 300G",14500,"assets/aorus300g.png","gabinetes");
const gabinete2 = new producto("Cooler Master Q300",8060,"assets/coolermasterq300.png","gabinetes");
const gabinete3 = new producto("Kolink Void",4500,"assets/kolink.png","gabinetes");

let listaProductos = [placadevideo0,placadevideo1,placadevideo2,placadevideo3,placadevideo4,placadevideo5,procesador0,mother0,procesador2,gabinete3,procesador1,procesador3,procesador4,mother1,mother2,mother3,ram0,ram1,ram2,ram3,ram4,ram5,gabinete0,gabinete1,gabinete2];

listaProductos.sort(function (a, b){
    return (a.precio - b.precio)
})



//Se crean las cards con jquery
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
}

//Carrito ------------------------------------------------------------------------------------------------

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
    $(`#cartcart`).append( ` <div>
                            <img src=${produ.imagen} alt="cart" class="cart-img">
                            <p class="cart__price__item">$${produ.precio}</p>
                            <p class="cart__price__item">${produ.cantidad}</p>
                            <p class="cart__price__item">$${(produ.precio)*(produ.cantidad)}</p>
                        </div>`).find('div:last').addClass('card-carrito-items');
}

function actualizarCarrito(){
    localStorage.setItem("total-name", totalCarrito);
    document.getElementsByClassName("name-total")[0].innerHTML = "$"+totalCarrito;
}

function sumarcarrito(num){ 
    if(modelos.includes(listaProductos[num]) === false){
        modelos.push(listaProductos[num]);
        localStorage.setItem("hijos", JSON.stringify(modelos));
        totalCarrito += listaProductos[num].precio;  
        localStorage.setItem("total-storage", totalCarrito);
    }  else if(modelos.includes(listaProductos[num]) === true) {
        (modelos[0].cantidad)++;
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

/*function traerProductos(){
    $.getJSON(URLProductos, function (respuesta, estado){
        if (estado === "success"){
            let misDatos = respuesta;
            for(const producto of misDatos){
                listaProductos.push(producto);
            }
        }
    ordenarListaProductos();
    crearCards();
    });
}*/