let elCarrito = []
const DOMcatalogo = document.getElementById('catalogo')
const DOMcarro = document.querySelector('#listaDelCarro')
const DOMtotal = document.querySelector('#mostrarTotal')
const miLocalStorage = window.localStorage
const listaSegunCategoria = []


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

const producto1 = new Producto('BUENOS AIRES', 10, 500, 0, 0, 0, 0, 'CARNE', 1, "./Images/compressImg/a.png")
const producto2 = new Producto('MADRID', 20, 400, 0, 0, 0, 0, 'CARNE', 2, "./Images/compressImg/b.png")
const producto3 = new Producto('LONDRES', 15, 450, 0, 0, 0, 0, 'POLLO', 3, "./Images/compressImg/c.png")
const producto4 = new Producto('LIMA', 10, 500, 0, 0, 0, 0, 'POLLO', 4, "./Images/compressImg/d.png")
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
let filtroCarne = document.getElementById('btnCarne')
let filtroVegana = document.getElementById('btnVegana')
let filtroPollo = document.getElementById('btnPollo')
let filtroVerTodas = document.getElementById('btnVerTodas')
let verCarritoBtn = document.getElementById('botonCarrillo')
let inputBarraBusqueda = document.getElementById('inputBarraBusqueda')

filtroCarne.classList.add('btn-dark')
filtroPollo.classList.add('btn-dark')
filtroVegana.classList.add('btn-dark')
filtroVerTodas.classList.add('btn-dark')
verCarritoBtn.classList.add('btn-warning')

filtroVerTodas.addEventListener('click', filtradoParaTodas)
filtroVegana.addEventListener('click', function () { rendearSegunCat('VEGANA') })
filtroCarne.addEventListener('click', function () { rendearSegunCat('CARNE') })
filtroPollo.addEventListener('click', function () { rendearSegunCat('POLLO') })

let inputBusqueda = document.getElementById("inputBarraBusqueda")
inputBusqueda.addEventListener('input', () => {
    console.log(inputBusqueda.value)
})

function rendearprodus() {

    listaProdu.forEach((info) => {

        const nodoCatalogo = document.createElement('div')
        nodoCatalogo.classList.add('card', 'col-sm-4')

        const cuerpoCards = document.createElement('div')
        cuerpoCards.classList.add('card-body')

        const tituloCards = document.createElement('h2')
        tituloCards.classList.add('card-title')
        tituloCards.textContent = info.nombre

        const preciosCards = document.createElement('p')
        preciosCards.classList.add('card-text')
        preciosCards.textContent = `$${info.precio}`

        const imgCards = document.createElement('IMG')
        imgCards.setAttribute('width', '100%')
        imgCards.setAttribute('src', info.img)

        const botonCards = document.createElement('button')
        botonCards.classList.add('btn', 'btn-primary')
        botonCards.textContent = '+'
        botonCards.setAttribute('marcador', info.id)
        botonCards.addEventListener('click', agregarAlCarro)

        cuerpoCards.appendChild(tituloCards)
        cuerpoCards.appendChild(preciosCards)
        cuerpoCards.appendChild(imgCards)
        cuerpoCards.appendChild(botonCards)
        nodoCatalogo.appendChild(cuerpoCards)
        DOMcatalogo.appendChild(nodoCatalogo)
    })
}

function filtradoParaTodas() {
    DOMcatalogo.innerHTML = ''

    listaProdu.forEach((info) => {

        const nodoCatalogo = document.createElement('div')
        nodoCatalogo.classList.add('card', 'col-sm-4')

        const cuerpoCards = document.createElement('div')
        cuerpoCards.classList.add('card-body')

        const tituloCards = document.createElement('h2')
        tituloCards.classList.add('card-title')
        tituloCards.textContent = info.nombre

        const preciosCards = document.createElement('p')
        preciosCards.classList.add('card-text')
        preciosCards.textContent = `$${info.precio}`

        const imgCards = document.createElement('IMG')
        imgCards.setAttribute('width', '100%')
        imgCards.setAttribute('src', info.img)

        const botonCards = document.createElement('button')
        botonCards.classList.add('btn', 'btn-primary')
        botonCards.textContent = '+'
        botonCards.setAttribute('marcador', info.id)
        botonCards.addEventListener('click', agregarAlCarro)

        cuerpoCards.appendChild(tituloCards)
        cuerpoCards.appendChild(preciosCards)
        cuerpoCards.appendChild(imgCards)
        cuerpoCards.appendChild(botonCards)
        nodoCatalogo.appendChild(cuerpoCards)
        DOMcatalogo.appendChild(nodoCatalogo)
    })
}

function rendearSegunCat(categoria) {
    DOMcatalogo.innerHTML = ''
    const listaSegunCategoria = listaProdu.filter(lacategoria => lacategoria.categoria == categoria)
    listaSegunCategoria.forEach((info) => {

        const nodoCatalogo = document.createElement('div')
        nodoCatalogo.classList.add('card', 'col-sm-4')

        const cuerpoCards = document.createElement('div')
        cuerpoCards.classList.add('card-body')

        const tituloCards = document.createElement('h2')
        tituloCards.classList.add('card-title')
        tituloCards.textContent = info.nombre

        const preciosCards = document.createElement('p')
        preciosCards.classList.add('card-text')
        preciosCards.textContent = `$${info.precio}`

        const imgCards = document.createElement('IMG')
        imgCards.setAttribute('width', '100%')
        imgCards.setAttribute('src', info.img)

        const botonCards = document.createElement('button')
        botonCards.classList.add('btn', 'btn-primary')
        botonCards.textContent = '+'
        botonCards.setAttribute('marcador', info.id)
        botonCards.addEventListener('click', agregarAlCarro)

        cuerpoCards.appendChild(tituloCards)
        cuerpoCards.appendChild(preciosCards)
        cuerpoCards.appendChild(imgCards)
        cuerpoCards.appendChild(botonCards)
        nodoCatalogo.appendChild(cuerpoCards)
        DOMcatalogo.appendChild(nodoCatalogo)
    })
}

function agregarAlCarro(e) {
    elCarrito.push(e.target.getAttribute('marcador'))
    rendearCarro()
    guardarCarroLocalSt()
}

function rendearCarro() {
    DOMcarro.textContent = ''
    console.log(elCarrito)
    const carroSinDuplicados = [...new Set(elCarrito)]

    carroSinDuplicados.forEach((item) => {
        const itemElegido = listaProdu.filter((itemBD) => {
            return itemBD.id === parseInt(item)
        })

        const unitItems = elCarrito.reduce((total, itemId) => {
            return itemId === itemElegido ? total += 1 : total
        }, 0)

        const elNodoCarro = document.createElement('div')
        elNodoCarro.classList.add('card', 'col-sm-2')

        const TituloCard = document.createElement('p')
        TituloCard.textContent = `${unitItems} x ${itemElegido[0].nombre} - $${itemElegido[0].precio}`

        const cuerpoCardsCarro = document.createElement('div')
        cuerpoCardsCarro.classList.add('card-body')

        const botonBorrar = document.createElement('button')
        botonBorrar.classList.add('btn', 'btn-danger', 'mx-5')
        botonBorrar.textContent = 'X'
        botonBorrar.dataset.item = item;
        botonBorrar.addEventListener('click', borrarItemCarro)

        const imgMiniatura = document.createElement('IMG')
        imgMiniatura.setAttribute('width', '100%')
        imgMiniatura.setAttribute('src', itemElegido[0].img)

        elNodoCarro.appendChild(TituloCard)
        elNodoCarro.appendChild(cuerpoCardsCarro)
        elNodoCarro.appendChild(imgMiniatura)
        elNodoCarro.appendChild(botonBorrar)
        DOMcarro.appendChild(elNodoCarro)


        /*
        const elNodo = document.createElement('li')
        elNodo.classList.add('list-group-item', 'text-rigth', 'mx-2')
        elNodo.textContent = `${unitItems} x ${itemElegido[0].nombre} - $${itemElegido[0].precio}`
        
        const imgMiniatura = document.createElement('IMG')
        imgMiniatura.setAttribute('width','10%')
        imgMiniatura.setAttribute('src', itemElegido[0].img )

        const botonBorrar = document.createElement('button')
        botonBorrar.classList.add('btn', 'btn-danger', 'mx-5')
        botonBorrar.textContent = 'X'
        botonBorrar.dataset.item = item;
        botonBorrar.addEventListener('click', borrarItemCarro)

        elNodo.appendChild(imgMiniatura)
        elNodo.appendChild(botonBorrar)
        DOMcarro.appendChild(elNodo)
        */
    })

    DOMtotal.textContent = calculoTotalCarro()
}

function guardarCarroLocalSt() {
    miLocalStorage.setItem('carro', JSON.stringify(elCarrito))
}

function borrarItemCarro() {
    const id = e.target.dataset.item
    elCarrito = elCarrito.filter((carritoId) => {
        return carritoId !== id
    })
    rendearCarro()
    guardarCarroLocalSt()
}

function calculoTotalCarro() {
//pendiente
}

//main
rendearprodus()
rendearCarro()