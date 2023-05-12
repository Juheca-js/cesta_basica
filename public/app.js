

document.getElementById("btnAgregar").addEventListener("click", (e) =>{
  e.preventDefault()
  const formAnadir = document.querySelector(".form-anadir");
  formAnadir.style.display = "block";
});

document.getElementById('btnCerrar').addEventListener('click', (e) => {
  e.preventDefault()
  const formAnadir = document.querySelector(".form-anadir");
  formAnadir.style.display = "none";
})

document.querySelector('#edit').addEventListener('click', async (e) => {
  e.preventDefault();



  // Obtener el ID del producto
  const productoId = document.getElementById('productoId').value;
  

  // Obtener los valores actualizados del formulario
  const nombreInput = document.getElementById('name');
  const cantidadInput = document.getElementById('cantidad');
  const preciolidlInput = document.getElementById('preciolidl');
  const preciomercadonaInput = document.getElementById('preciomercadona');
  const precioeroskiInput = document.getElementById('precioeroski');

  const productoActualizado = {
    name: nombreInput.value,
    cantidad: parseInt(cantidadInput.value),
    preciolidl: parseFloat(preciolidlInput.value),
    preciomercadona: parseFloat(preciomercadonaInput.value),
    precioeroski: parseFloat(precioeroskiInput.value)
  };

  // Llamar a la función editarProducto() con el ID y los datos actualizados del producto
  editarProducto(productoId, productoActualizado);
});








async function dibujarProductos(){
  const productos = await fetch ("http://localhost:3000/Productos/showProductos")
  const data = await productos.json();

  limpiarProductos();

  // Recorremos el array de productos y por cada uno, creamos un elemento HTML que lo muestre
  data.forEach((producto, index) => {
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

    const botonBorrar = document.createElement('button');
    botonBorrar.textContent = 'Borrar';
    
    
    // Asignar un identificador único al botón
    botonBorrar.id = `botonBorrar-${index}`;
    
    // Agregar el evento click al botón para llamar a la función de borrado
    botonBorrar.addEventListener('click', () => {
      borrarProducto(producto.name);
    });
    
    // Agregar el botón al elemento del producto
    productoHTML.appendChild(botonBorrar);

    const botonEditar = document.createElement('button');
    botonEditar.textContent = 'Editar';

// Asignar un identificador único al botón
    botonEditar.id = `botonEditar-${index}`;

// Agregar el evento click al botón para llamar a la función de edición
    botonEditar.addEventListener('click', () => {
      cargarDatosProducto(producto);
    });

// Agregar el botón al elemento del producto
productoHTML.appendChild(botonEditar);

    
    // Agregamos el elemento del producto al contenedor de productos
    contenedorProductos.appendChild(productoHTML);
  });
}

function limpiarProductos() {
  const contenedorProductos = document.querySelector('#contenedorProductos');
  contenedorProductos.innerHTML = '';
}


async function borrarProducto(nameProducto) {
  const res = await fetch('/productos/deleteproducto', {
    method: "DELETE",
    headers: {
      "content-Type": "application/json"
    },
    body: JSON.stringify({nameProducto})
  });

  // Llamar a dibujarProductos() después de eliminar el producto
  dibujarProductos();
}

async function editarProducto(productoId, updatedProduct) {
  try {
    const response = await fetch(`/editProducto/${productoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedProduct)
    });

    if (response.ok) {
      // El producto se actualizó correctamente
      dibujarProductos();
      cerrarFormulario();
    } else {
      // Error al editar el producto
      console.log('Error al editar el producto');
    }
  } catch (error) {
    console.log(error);
  }
}


dibujarProductos()

