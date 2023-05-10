

async function dibujarProductos(){
  const productos = await fetch ("http://localhost:3000/Productos/showProductos")
  const data = await productos.json();

  

  // Recorremos el array de productos y por cada uno, creamos un elemento HTML que lo muestre
  data.forEach(producto => {
    const contenedorProductos = document.querySelector('#contenedorProductos')
    const productoHTML = document.createElement('div');
    productoHTML.classList.add('producto');
    
    // Creamos un elemento HTML para cada dato del producto y lo agregamos al elemento del producto
    const nombreHTML = document.createElement('h2');
    nombreHTML.textContent = producto.name;
    productoHTML.appendChild(nombreHTML);
    
    const cantidadHTML = document.createElement('p');
    cantidadHTML.textContent = `Cantidad: ${producto.cantidad}`;
    productoHTML.appendChild(cantidadHTML);
    
    const precioHTML = document.createElement('p');
    precioHTML.textContent = `Precio: ${producto.preciolidl} € (LIDL) / ${producto.preciomercadona} € (Mercadona) / ${producto.precioeroski} € (Eroski)`;
    productoHTML.appendChild(precioHTML);
    
    // Agregamos el elemento del producto al contenedor de productos
    contenedorProductos.appendChild(productoHTML);
  });
}

dibujarProductos()