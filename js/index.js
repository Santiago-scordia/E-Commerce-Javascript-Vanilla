class procesador{
    constructor(modelo,precio){
        this.modelo = modelo;
        this.precio = precio;
    }
}


const procesador0 = new procesador("Ryzen 3",23000);
const procesador1 = new procesador("Ryzen 5",46000);
const procesador2 = new procesador("Ryzen 7",75000);
const procesador3 = new procesador("Intel i5",39500);
const procesador4 = new procesador("Intel i7",67250);


let listaProcesadores = [procesador0,procesador1,procesador2,procesador3,procesador4];

let i=0;

for(const proce of listaProcesadores){
        document.getElementsByClassName("card-title")[i].innerHTML = proce.modelo;
        document.getElementsByClassName("card-price")[i].innerHTML = "$"+proce.precio;
        i++;
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
    totalCarrito += listaProcesadores[num].precio;
    modelos.push(listaProcesadores[num].modelo);
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




