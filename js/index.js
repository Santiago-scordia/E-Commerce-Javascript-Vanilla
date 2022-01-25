class producto{
    constructor(id,modelo,precio,imagen,tipo){
        this.id = id;
        this.modelo = modelo;
        this.precio = precio;
        this.imagen = imagen;
        this.tipo = tipo;
    }
}


//Procesadores
const procesador0 = new producto(0,"Ryzen 3",23000,"assets/ryzen3.png","proces");
const procesador1 = new producto(1,"Ryzen 5",46000,"assets/ryzen5.png","proces");
const procesador2 = new producto(2,"Ryzen 7",75000,"assets/ryzen7.png","proces");
const procesador3 = new producto(3,"Intel i5",3950,"assets/inteli5.png","proces");
const procesador4 = new producto(4,"Intel i7",67250,"assets/inteli7.png","proces");

//Mothers
const mother0 = new producto(5,"AsRock A320M",6800,"assets/asrocka320m.png","mother");
const mother1 = new producto(6,"Asus Prime Z590",9500,"assets/asusprimez590.png","mother");
const mother2 = new producto(7,"Asus TUF F560",17250,"assets/asustuf560.png","mother");
const mother3 = new producto(8,"NZXT B550",12600,"assets/b550.png","mother");

//Rams

const ram0 = new producto(9,"Corsair Pro 32Gb",19000,"assets/vengancepro32gb.png","rams");
const ram1 = new producto(10,"Hyperx Fury 8Gb",8000,"assets/hyperxfury8gb.png","rams");
const ram2 = new producto(11,"Crucial 4Gb",3700,"assets/crucial4gb.png","rams");
const ram3 = new producto(12,"Xpg 8Gb",6900,"assets/xpg8gb.png","rams");
const ram4 = new producto(13,"Corsair Vengance 8Gb",9520,"assets/corsairvengance8gb.png","rams");
const ram5 = new producto(14,"Spetrix 16Gb",10200,"assets/spetrix16gb.png","rams");

//Gabinetes
const gabinete0 = new producto(15,"Gigabyte C200",9750,"assets/gigabytec200.png","gabinetes");
const gabinete1 = new producto(16,"Aorus 300G",14500,"assets/aorus300g.png","gabinetes");
const gabinete2 = new producto(17,"Cooler Master Q300",8060,"assets/coolermasterq300.png","gabinetes");
const gabinete3 = new producto(18,"Kolink Void",4500,"assets/kolink.png","gabinetes");

let listaProductos = [procesador0,procesador1,procesador2,procesador3,procesador4,mother0,mother1,mother2,mother3,ram0,ram1,ram2,ram3,ram4,ram5,gabinete0,gabinete1,gabinete2,gabinete3];

//Se crean las cards
for(const produ of listaProductos){
    let contenedor = document.createElement("div");
    contenedor.classList.add('card');
    contenedor.innerHTML= ` 
                            <h3 class="card-title"> ${produ.modelo}</h3>
                            <img src=${produ.imagen} class="card-img" alt="pc">
                            <p class="card-price"> $${produ.precio}</p>
                            <button onclick="sumarcarrito(${produ.id})" class="card-button" >Añadir al carrito</button>`;              
     document.getElementById(produ.tipo).appendChild(contenedor);
}

if(localStorage.getItem("total-name") === null){
    localStorage.setItem("total-name", 0);
}

let totalCarrito = parseInt(localStorage.getItem("total-name"));
let modelos = [];
modelos.push(localStorage.getItem("total-modelos"));

document.getElementsByClassName("name-total")[0].innerHTML = "$"+localStorage.getItem("total-name");
document.getElementsByClassName("name-items")[0].innerHTML = localStorage.getItem("total-modelos");

function actualizarCarrito(){
    localStorage.setItem("total-name", totalCarrito);
    localStorage.setItem("total-modelos", modelos.join(" - "));
    document.getElementsByClassName("name-total")[0].innerHTML = "$"+totalCarrito;
    document.getElementsByClassName("name-items")[0].innerHTML = modelos.join(" - ");
}
    
function sumarcarrito(num){
    totalCarrito += listaProductos[num].precio;
    modelos.push(listaProductos[num].modelo);
    actualizarCarrito();
        return totalCarrito;
}

function vaciarCarrito(){
    modelos = [];
    totalCarrito=0;
    localStorage.setItem("total-name", totalCarrito);
    localStorage.setItem("total-modelos", modelos.join(" - "));
    actualizarCarrito();   
}




