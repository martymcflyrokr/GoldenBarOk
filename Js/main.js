document.addEventListener('DOMContentLoaded', () => {
    let elCarrito = []
    const DOMcatalogo = document.getElementById('catalogo')
    const DOMcarro = document.querySelector('#listaDelCarro')
    const DOMtotal = document.querySelector('#mostrarTotal')
    const DOMbotonVaciarCarro = document.querySelector('#botonVaciarCarro')
    const DOMbotonfinalizarCompra = document.querySelector('#finalizarCompra')
    const miLocalStorage = window.localStorage
    const styleCarro = document.getElementById('listaDelCarro')
    styleCarro.classList.add('d-flex')
    styleCarro.classList.add('gap-3')
    styleCarro.classList.add('align-items-center')

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

    const listaProdu = []
    listaProdu.push(new Producto('BUENOS AIRES', 10, 500, 0, 0, 0, 0, 'CARNE', 1, "./Images/compressImg/a.png"))
    listaProdu.push(new Producto('MADRID', 20, 400, 0, 0, 0, 0, 'CARNE', 2, "./Images/compressImg/b.png"))
    listaProdu.push(new Producto('LONDRES', 15, 450, 0, 0, 0, 0, 'POLLO', 3, "./Images/compressImg/c.png"))
    listaProdu.push(new Producto('LIMA', 10, 500, 0, 0, 0, 0, 'POLLO', 4, "./Images/compressImg/d.png"))
    listaProdu.push(new Producto('CANCUN', 20, 400, 0, 0, 0, 0, 'VEGANA', 5, "./Images/compressImg/e.png"))
    listaProdu.push(new Producto('MIAMI', 15, 450, 0, 0, 0, 0, 'VEGANA', 6, "./Images/compressImg/a.png"))

    let filtroCarne = document.getElementById('btnCarne')
    let filtroVegana = document.getElementById('btnVegana')
    let filtroPollo = document.getElementById('btnPollo')
    let filtroVerTodas = document.getElementById('btnVerTodas')
    let btnBuscar = document.getElementById('btnBuscar')
    let formulario = document.querySelector('#formulario')
    let verCarritoBtn = document.getElementById('botonCarrillo')

    filtroCarne.classList.add('btn-dark')
    filtroPollo.classList.add('btn-dark')
    filtroVegana.classList.add('btn-dark')
    filtroVerTodas.classList.add('btn-dark')
    btnBuscar.classList.add('btn-dark')
    verCarritoBtn.classList.add('btn-warning')
    DOMbotonVaciarCarro.classList.add('btn-danger')
    DOMbotonfinalizarCompra.classList.add('btn-success')
    
    filtroVerTodas.addEventListener('click', filtradoParaTodas)
    filtroVegana.addEventListener('click', function () { rendearSegunCat('VEGANA') })
    filtroCarne.addEventListener('click', function () { rendearSegunCat('CARNE') })
    filtroPollo.addEventListener('click', function () { rendearSegunCat('POLLO') })
    btnBuscar.addEventListener('click', buscarDelInput)
   
    function buscarDelInput(e) {
        e.preventDefault()
        textoIngresado = formulario.value.toUpperCase()
        rendearSegunBuscar(textoIngresado)
    }

    function burgaInexistente() {
        Swal.fire({
            icon: 'error',
            title: 'Oops...Algo anda mal!',
            text: 'El producto ingresado no existe',
            confirmButtonColor: '#FFCC00',
            confirmButtonText: 'Reintentar',
        })
            formulario.value = ''
    }

    function rendearSegunBuscar(nombre) {
        DOMcatalogo.innerHTML = ''
        const listaSegunBusqueda = listaProdu.filter(elnombre => elnombre.nombre == nombre.toUpperCase())

        if (listaSegunBusqueda != '') {

            listaSegunBusqueda.forEach((info) => {
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
                const efectoOver = document.createElement('div')
                efectoOver.classList.add('overlay')
                const textoEfectoOver = document.createElement('div')
                textoEfectoOver.classList.add('text')
                textoEfectoOver.textContent = `${info.categoria}`
                const botonCards = document.createElement('button')
                botonCards.classList.add('btn', 'btn-success')
                botonCards.textContent = '+'
                botonCards.setAttribute('marcador', info.id)
                botonCards.addEventListener('click', agregarAlCarro)
                botonCards.addEventListener('click', () => {
                    Toastify({
                        text: "Producto agregado al Carrito!",
                        duration: 2000,
                        gravity: 'botom',
                        position: 'right',
                        style: {
                            background: "linear-gradient(to right, #00b09b, #96c93d)",
                        }
                    }).showToast()
                })
                nodoCatalogo.appendChild(efectoOver)
                efectoOver.appendChild(textoEfectoOver)
                cuerpoCards.appendChild(tituloCards)
                cuerpoCards.appendChild(preciosCards)
                cuerpoCards.appendChild(imgCards)
                cuerpoCards.appendChild(botonCards)
                nodoCatalogo.appendChild(cuerpoCards)
                DOMcatalogo.appendChild(nodoCatalogo)
            })
        }
        else {
            burgaInexistente()
            rendearTodos()
        }
    }

    function rendearTodos() {
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
            const efectoOver = document.createElement('div')
            efectoOver.classList.add('overlay')
            const textoEfectoOver = document.createElement('div')
            textoEfectoOver.classList.add('text')
            textoEfectoOver.textContent = `${info.categoria}`
            const botonCards = document.createElement('button')
            botonCards.classList.add('btn', 'btn-success')
            botonCards.textContent = '+'
            botonCards.setAttribute('marcador', info.id)
            botonCards.addEventListener('click', agregarAlCarro)
            botonCards.addEventListener('click', () => {
                Toastify({
                    text: "Producto agregado al Carrito!",
                    duration: 2000,
                    gravity: 'botom',
                    position: 'right',
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }
                }).showToast()
            })
            nodoCatalogo.appendChild(efectoOver)
            efectoOver.appendChild(textoEfectoOver)
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
            const efectoOver = document.createElement('div')
            efectoOver.classList.add('overlay')
            const textoEfectoOver = document.createElement('div')
            textoEfectoOver.classList.add('text')
            textoEfectoOver.textContent = `${info.categoria}`
            const botonCards = document.createElement('button')
            botonCards.classList.add('btn', 'btn-success')
            botonCards.textContent = '+'
            botonCards.setAttribute('marcador', info.id)
            botonCards.addEventListener('click', agregarAlCarro)
            botonCards.addEventListener('click', () => {
                Toastify({
                    text: "Producto agregado al Carrito!",
                    duration: 2000,
                    gravity: 'botom',
                    position: 'right',
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }
                }).showToast()
            })
            nodoCatalogo.appendChild(efectoOver)
            efectoOver.appendChild(textoEfectoOver)
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
            const efectoOver = document.createElement('div')
            efectoOver.classList.add('overlay')
            const textoEfectoOver = document.createElement('div')
            textoEfectoOver.classList.add('text')
            textoEfectoOver.textContent = `${info.categoria}`
            const botonCards = document.createElement('button')
            botonCards.classList.add('btn', 'btn-success')
            botonCards.textContent = '+'
            botonCards.setAttribute('marcador', info.id)
            botonCards.addEventListener('click', agregarAlCarro)
            botonCards.addEventListener('click', () => {
                Toastify({
                    text: "Producto agregado al Carrito!",
                    duration: 2000,
                    gravity: 'botom',
                    position: 'right',
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }
                }).showToast()
            })
            nodoCatalogo.appendChild(efectoOver)
            efectoOver.appendChild(textoEfectoOver)
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
        const carroSinDuplicados = [...new Set(elCarrito)]

        carroSinDuplicados.forEach((item) => {
            const miItem = listaProdu.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item)
            })

            const unitItems = elCarrito.reduce((total, itemId) => {
                return itemId === item ? total += 1 : total
            }, 0)

            const elNodoCarro = document.createElement('div')
            elNodoCarro.classList.add('card', 'col-sm-2')
            const TituloCard = document.createElement('p')
            TituloCard.textContent = `${unitItems} x ${miItem[0].nombre} - $${miItem[0].precio}`
            const cuerpoCardsCarro = document.createElement('div')
            cuerpoCardsCarro.classList.add('card-body')
            const botonBorrar = document.createElement('button')
            botonBorrar.classList.add('btn', 'btn-danger', 'mx-9')
            botonBorrar.textContent = 'X'
            botonBorrar.dataset.item = item;
            botonBorrar.addEventListener('click', borrarItemCarro)
            botonBorrar.addEventListener('click', () => {
                Toastify({
                    text: "Producto eliminado del Carrito!",
                    duration: 2000,
                    gravity: 'botom',
                    position: 'right',
                    style: {
                        background: "linear-gradient(to right, #800080, #FF0000)",
                    }
                }).showToast()

            })
            const imgMiniatura = document.createElement('IMG')
            imgMiniatura.setAttribute('width', '100%')
            imgMiniatura.setAttribute('src', miItem[0].img)
            cuerpoCardsCarro.appendChild(TituloCard)
            cuerpoCardsCarro.appendChild(imgMiniatura)
            cuerpoCardsCarro.appendChild(botonBorrar)
            elNodoCarro.appendChild(cuerpoCardsCarro)
            DOMcarro.appendChild(elNodoCarro)
        })

        DOMtotal.textContent = `PRECIO TOTAL: $${calculoTotalCarro()}`
    }

    function borrarItemCarro(e) {
        const id = e.target.dataset.item
        elCarrito = elCarrito.filter((carritoId) => {
            return carritoId !== id
        })
        rendearCarro()
        guardarCarroLocalSt()
    }

    function calculoTotalCarro() {
        return elCarrito.reduce((total, item) => {
            const miItem = listaProdu.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            return total + miItem[0].precio;
        }, 0).toFixed(2);

    }

    function vaciarCarrito() {
        elCarrito = [];
        rendearCarro();
        localStorage.clear();
    }

    function guardarCarroLocalSt() {
        miLocalStorage.setItem('carro', JSON.stringify(elCarrito))
    }

    function cargarCarritoDeLocalStorage() {
        if (miLocalStorage.getItem('carro') !== null) {
            elCarrito = JSON.parse(miLocalStorage.getItem('carro'))
        }
    }

    DOMbotonVaciarCarro.addEventListener('click', vaciarCarrito)
    DOMbotonVaciarCarro.addEventListener('click', () => {
        Toastify({
            text: "Vaciaste el Carrito correctamente",
            duration: 2000,
            gravity: 'botom',
            position: 'right',
            style: {
                background: "linear-gradient(to right, #800080, #FF0000)",
            }
        }).showToast()
    })

    DOMbotonfinalizarCompra.addEventListener('click', () => {
        console.log(elCarrito)
        if(elCarrito != '') {
            Swal.fire({
                icon: 'success',
                title: 'Su compra se finalizó correctamente!',
                text: 'Gracias por confiar en GoldenBAR',
                confirmButtonText: 'Cerrar',
            })
            vaciarCarrito()
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Su carrito esta vacio!',
                text: 'Puedes intentar agregar productos en el catalogo.',
                confirmButtonText: 'Cerrar',
            })
        }
    } )
    //main
    cargarCarritoDeLocalStorage()
    rendearTodos()
    rendearCarro()
})