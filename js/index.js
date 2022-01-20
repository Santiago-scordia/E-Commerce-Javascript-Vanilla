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

let totalCarrito = 0;
let modelos = [];

document.getElementsByClassName("text-total")[0].innerHTML = "$"+totalCarrito;

function actualizarCarrito(){
    document.getElementsByClassName("text-total")[0].innerHTML = "$"+totalCarrito;
    document.getElementsByClassName("text-items")[0].innerHTML = modelos.join(" - ");

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
    actualizarCarrito();   
}



