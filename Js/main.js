let elCarrito = []


class Producto {
    constructor(nombre, stock, precio, unidades, unidadesTotales, precioVenta, precioVentaTotal, categoria, id, img) {
        this.nombre = nombre.toUpperCase()
        this.stock = stock
        this.precio = precio
        this.unidades = unidades
        this.unidadesTotales = unidadesTotales
        this.precioVenta = precioVenta
        this.precioVentaTotal = precioVentaTotal
        this.categoria = categoria
        this.id = id
        this.img = img
    }

    pedirUnidades() {
        this.unidades = parseInt(prompt('Ingrese la cantidad que desea mostrarTodo \nEl stock actual es de ' + this.stock))
        if (this.unidades <= this.stock) {
            console.log('Usuario eligió ' + this.unidades + ' unidades tipo ' + this.nombre + ': $' + this.valorVenta())
        }
        else {
            console.log('Usuario eligio mayor cantidad de la que disponemos. reintentar compra')
        }
    }

    stockActual() {
        if (this.unidades <= this.stock) {
            this.stock -= this.unidades
            console.log('El stock actual es: ' + this.stock)
        }
        else {
            alert('La cantidad supera al stock. elija menos unidades.')
            console.log('Supera el stock')
        }
        return this.stock
    }

    valorVenta() {
        if (this.unidades <= this.stock) {
            this.precioVenta = this.precio * this.unidades
        }
        else {
            alert('Está superando la cantidad que disponemos. Ingrese menor cantidad.')
            this.pedirUnidades()
        }
        return this.precioVenta
    }

    ventaTotalPesos() {
        if (this.unidades <= this.stock) {
            this.precioVentaTotal += this.precioVenta
        }
        else {
            console.log('no se suma el producto el precio elegido por que supera el stock.')
        }
    }

    ventaTotalunidades() {
        if (this.unidades <= this.stock) {
            this.unidadesTotales += this.unidades
        }
        else {
            console.log('no se suma el valor total por que supera el stock.')
        }
    }

    stockEsInsuficiente() {
        if ((this.stock < this.unidades) || (this.stock < this.ventaTotalunidades)) {
            console.log('No hay stock suficiente. contamos con ' + this.stock + ' unidades disponibles')
        } else {
            console.log('El stock es suficiente.')
        }
    }

    mostrarCompraTotal() {
        if (this.unidades <= this.stock) {
            console.log('---------- \nCompra: \nBurgers ' + this.nombre + ' - ' + this.unidadesTotales + ' unidades - $' + this.precioVentaTotal + '\n-------------')
        }
        else {
            console.log('Usuario eligió mas de lo que podia mostrarTodo.')
        }
    }
}

const producto1 = new Producto('BUENOS AIRES', 10, 500, 0, 0, 0, 0,'CARNE', 1, "./Images/compressImg/a.png")
const producto2 = new Producto('MADRID', 20, 400, 0, 0, 0, 0, 'CARNE', 2, "./Images/compressImg/b.png")
const producto3 = new Producto('LONDRES', 15, 450, 0, 0, 0, 0, 'POLLO', 3, "./Images/compressImg/c.png")
const producto4 = new Producto('LIMA', 10, 500, 0, 0, 0, 0,'POLLO', 4, "./Images/compressImg/d.png")
const producto5 = new Producto('CANCUN', 20, 400, 0, 0, 0, 0, 'VEGANA', 5, "./Images/compressImg/e.png")
const producto6 = new Producto('MIAMI', 15, 450, 0, 0, 0, 0, 'VEGANA', 6, "./Images/compressImg/a.png")

const listaProdu = []
listaProdu.push(producto1)
listaProdu.push(producto2)
listaProdu.push(producto3)
listaProdu.push(producto4)
listaProdu.push(producto5)
listaProdu.push(producto6)

let elBuscador = document.getElementById('buscador')
let cardCarne = document.querySelector('.cardCarne')
let cardVegana = document.querySelector('.cardVegana')
let cardPollo = document.querySelector('.cardPollo')

/*
cardCarne.addEventListener('click',renderCarne)
cardVegana.addEventListener('click',renderVegana)
cardPollo.addEventListener('click',renderPollo)
*/
cardCarne.addEventListener('click',function(){renderizarProductos('CARNE')})
cardPollo.addEventListener('click',function(){renderizarProductos('POLLO')})
cardVegana.addEventListener('click',function(){renderizarProductos('VEGANA')})

let catalogoloco = document.querySelector(".catalogo")
catalogoloco.innerHTML=""
    for (const producto of listaProdu) {
        let contenedor = document.createElement("div")
        contenedor.className="card border-0 col-lg-3 bg-dark pb-3"

        contenedor.innerHTML = `<img src=${producto.img}></img>
                                <h4>${producto.nombre}</h4>
                                <p>Precio: $${producto.precio}</p>
                                <button id="btnmas${producto.id}" class="btnmas${producto.id}" >+</button>
                                `
        catalogoloco.appendChild(contenedor)
    }

let botonmostrarTodo = document.querySelector('.btnVerTodas')
botonmostrarTodo.addEventListener('click', desplegarProdus)

function desplegarProdus() {
    let catalogoloco = document.querySelector(".catalogo")
    catalogoloco.innerHTML=""

    for (const producto of listaProdu) {
        let contenedor = document.createElement("div")
        contenedor.className="card border-0 col-lg-3 bg-dark pb-3"

        contenedor.innerHTML = `<img src=${producto.img}></img>
                                <h4>${producto.nombre}</h4>
                                <p>Precio: $${producto.precio}</p>
                                <button id="btnmas${producto.id}" class="btnmas${producto.id}" >+</button>
                                `
        catalogoloco.appendChild(contenedor)
    }
}


function renderizarProductos (categoria) {

    const listaSegunCategoria = listaProdu.filter(lacategoria => lacategoria.categoria == categoria)

    let catalogoloco = document.querySelector(".catalogo")
    catalogoloco.innerHTML=""
    for (const producto of listaSegunCategoria) {
        let contenedor = document.createElement("div")
        contenedor.className="card border-0 col-lg-3 bg-dark pb-3"

        contenedor.innerHTML = `<img src=${producto.img}></img>
                                <h4>${producto.nombre}</h4>
                                <p>Precio: $${producto.precio}</p>
                                <button id="btnmas${producto.id}" class="btnmas${producto.id}" >+</button>
                                `
                            
        catalogoloco.appendChild(contenedor)
    }
}


for(const producto of desplegarProdus) { 
    let btnComprar = document.getElementById(`btnmas${producto.id}`)
        btnComprar.onclick = function(sumarAlCarro){
            
        }
}


function sumarAlCarro() {

    let sumarProdusAlCarro = document.querySelector(".offcanvas-body")
    let contenedorCarro = document.createElement("div")
    contenedorCarro.innerHTML = `<img src=${producto.img}></img>
                                <h4>${producto.nombre}</h4>
                                <p>Precio: $${producto.precio}</p>`
    sumarProdusAlCarro.appendChild(contenedorCarro)
    
}


let inputBusqueda = document.getElementById("inputBarraBusqueda")
inputBusqueda.addEventListener('input', () => {
    console.log(inputBusqueda.value)
})
