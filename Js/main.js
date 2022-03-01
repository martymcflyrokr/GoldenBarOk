//VARIABLES GLOBALES
let seleccionBur
let totaltodalacompra = 0
let verResumen
let contador = 0
let listadoProductosDisponibles = 'Los productos disponibles son:\n '
let buscarBurga

//CLASE CONSTRUCTORA
class Producto {
    constructor(nombre, stock, precio, unidades, unidadesTotales, precioVenta, precioVentaTotal) {
        this.nombre = nombre.toUpperCase()
        this.stock = stock
        this.precio = precio
        this.unidades = unidades
        this.unidadesTotales = unidadesTotales
        this.precioVenta = precioVenta
        this.precioVentaTotal = precioVentaTotal
    }

    pedirUnidades() {
        this.unidades = parseInt(prompt('Ingrese la cantidad que desea comprar \nEl stock actual es de ' + this.stock))
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
            console.log('no se suma el valo total por que supera el stock.')
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
            console.log('Usuario eligió mas de lo que podia comprar.')
        }
    }
}

//OBJETOS
const producto1 = new Producto('CARNE', 10, 500, 0, 0, 0, 0)
const producto2 = new Producto('POLLO', 20, 400, 0, 0, 0, 0)
const producto3 = new Producto('VEGAN', 15, 450, 0, 0, 0, 0)

//ARRAY CON OBJETOS
const listaProdu = []
listaProdu.push(producto1)
listaProdu.push(producto2)
listaProdu.push(producto3)

//FUNCIONES
function totalizarPesos() {
    totaltodalacompra = totaltodalacompra + producto1.ventaTotalPesos + producto2.ventaTotalPesos + producto3.ventaTotalPesos
}

function sumarTotalesCompras() {
    totaltodalacompra = producto1.precioVentaTotal + producto2.precioVentaTotal + producto3.precioVentaTotal
    alert('Resumen compra total : \n - - - - - - - - - \n' +
        '\nCliente - ' + nombreUser.toUpperCase() +
        '\nBurgers Carne - ' + producto1.unidadesTotales + ' unidades: $' + producto1.precioVentaTotal +
        '\nBurgers Pollo - ' + producto2.unidadesTotales + ' unidades: $' + producto2.precioVentaTotal +
        '\nBurgers Vegan - ' + producto3.unidadesTotales + ' unidades: $' + producto3.precioVentaTotal +
        '\nPrecio Total: $' + totaltodalacompra)

    console.log('Resumen compra total : \n - - - - - - - - - \n' +
        '\nCliente - ' + nombreUser +
        '\nBurgers Carne - ' + producto1.unidadesTotales + ' unidades: $' + producto1.precioVentaTotal +
        '\nBurgers Pollo - ' + producto2.unidadesTotales + ' unidades: $' + producto2.precioVentaTotal +
        '\nBurgers Vegan - ' + producto3.unidadesTotales + ' unidades: $' + producto3.precioVentaTotal +
        '\nPrecio Total: $' + totaltodalacompra)
        
}

for (const producto of listaProdu) {
    contador++
    listadoProductosDisponibles += '\n ' + contador + '- ' + producto.nombre
}

//EJECUCIÓN
let nombreUser = prompt('Ingrese su nombre')
let quiereComprar = prompt('Hola ' + nombreUser.toUpperCase() + '\n¿Quiere realizar una compra?\nSi \nNo ')

while (quiereComprar.toUpperCase() === 'SI') {

    seleccionBur = prompt('Ingrese el tipo de hamburguesa que quiere comprar:\n' + listadoProductosDisponibles)
    let buscarBurga = listaProdu.find(losprodu => losprodu.nombre == seleccionBur.toUpperCase())
    // console.log('producto que busca el usuario: ' + buscarBurga.nombre)

    if (buscarBurga) {

        switch (buscarBurga.nombre) {
            case producto1.nombre:
                producto1.pedirUnidades(producto1.unidades)
                producto1.stockActual()
                producto1.ventaTotalPesos()
                producto1.ventaTotalunidades()
                producto1.mostrarCompraTotal()
                break

            case producto2.nombre:
                producto2.pedirUnidades(producto2.unidades)
                producto2.stockActual()
                producto2.ventaTotalPesos()
                producto2.ventaTotalunidades()
                producto2.mostrarCompraTotal()
                break

            case producto3.nombre:
                producto3.pedirUnidades(producto3.unidades)
                producto3.stockActual()
                producto3.ventaTotalPesos()
                producto3.ventaTotalunidades()
                producto3.mostrarCompraTotal()
                break

            default: alert('seleccionó un tipo de hamburgesa invalido')
        }
    }
    else {
        console.log('Ingresó un tipo de burger inexistente')
        alert('El producto ingresado no existe')
    }

    verResumen = prompt('¿Quiere ver el resumen de su carrito?')
    if (verResumen.toUpperCase() === 'SI') {
        sumarTotalesCompras()
    } else {
        console.log('User no quiere ver el resumen')
    }

    quiereComprar = prompt('¿Quiere agregar mas productos al carrito?')
}