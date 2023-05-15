function limpiarForm(){
  document.getElementById("nombre").value = ""
  document.getElementById("cantidad").value =""
  document.getElementById("precioMercadona").value =""
  document.getElementById("precioLidl").value = ""
  document.getElementById("precioEroski").value = ""
  document.getElementById("precioAldi").value = ""
}

document.querySelector('#btnAgregar').addEventListener('click', () => {
  const formAnadir = document.querySelector("#formAnadir");
    formAnadir.style.display = "block";
    document.getElementsByClassName('add')[0].style.display = "none";
    document.querySelector('#edit').style.display = "block";
    
  
});

document.getElementById('btnCerrar').addEventListener('click', (e) => {
  e.preventDefault()
  const formAnadir = document.querySelector(".form-anadir");
  formAnadir.style.display = "none";
})

document.querySelector('#edit').addEventListener('click', async (e) => {
  e.preventDefault();


  const Id = document.getElementById('productoId');
  const nombreInput = document.getElementById('name');
  const cantidadInput = document.getElementById('cantidad');
  const preciolidlInput = document.getElementById('preciolidl');
  const preciomercadonaInput = document.getElementById('preciomercadona');
  const precioeroskiInput = document.getElementById('precioeroski');


  const productoActualizado = { 
    id: Id.value,
    name: nombreInput.value,
    cantidad: cantidadInput.value,
    preciolidl: preciolidlInput.value,
    preciomercadona: preciomercadonaInput.value,
    precioeroski: precioeroskiInput.value
  };

  // Llamar a la función editarProducto() con el ID y los datos actualizados del producto
  editarProducto(productoActualizado);
});

document.querySelector('.add').addEventListener('click', () =>{
  const formAnadir = document.querySelector(".form-anadir");
  cargarDatosProducto(producto);
  formAnadir.style.display = "none";
})








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
    botonBorrar.classList.add('actiondelete')
    
    
    
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
    botonEditar.classList.add('actionedit')

// Asignar un identificador único al botón
    botonEditar.id = `botonEditar-${index}`;

// Agregar el evento click al botón para llamar a la función de edición
    botonEditar.addEventListener('click', () => {
      const formAnadir = document.querySelector(".form-anadir");
      formAnadir.style.display = "block";
      document.getElementsByClassName('add').style.display="none";
      document.querySelector('#edit').style.display="block";
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

async function editarProducto(producto) {

    console.log('entro en editar producto')
    console.log(producto.name)

    const response = await fetch("/productos/editProducto", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: producto.name, cantidad: producto.cantidad, preciomercadona: producto.preciomercadona, preciolidl: producto.preciolidl, precioeroski: producto.precioeroski, _id: producto.id })
    });

      // El producto se actualizó correctamente
      dibujarProductos();

}

function cargarDatosProducto(producto) {
    console.log(producto.name)
    // Utiliza los datos del producto para cargar el formulario de edición
    const Id = document.getElementById('productoId');
    const nombreInput = document.getElementById('name');
    const cantidadInput = document.getElementById('cantidad');
    const preciolidlInput = document.getElementById('preciolidl');
    const preciomercadonaInput = document.getElementById('preciomercadona');
    const precioeroskiInput = document.getElementById('precioeroski');

    nombreInput.value = producto.name;
    cantidadInput.value = producto.cantidad;
    preciolidlInput.value = producto.preciolidl;
    preciomercadonaInput.value = producto.preciomercadona;
    precioeroskiInput.value = producto.precioeroski;
    Id.value = producto._id

  

}




dibujarProductos()

