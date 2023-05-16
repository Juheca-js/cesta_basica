

    async function mostrarProductos() {
        try {
            const peticion = await fetch(`http://localhost:3000/productos/showProductos`);
            const productos = await peticion.json();
            const container = document.getElementsByClassName('container')[0];
            const divPadre = document.querySelector('#divPadre');
            console.log(peticion);
                    
            productos.forEach((producto) => {
            // Div padre donde se muestra el nombre del producto, cantidad y precio.
            const divProducto = document.createElement('div');
            divProducto.classList.add('divproducto');

            const primerasLetras = producto.name.substring(0, 3).toLowerCase();
  
            // Div que contiene el nombre y cantidad de cada producto.
            const contenedorDescripcionProducto = document.createElement('div');
            contenedorDescripcionProducto.classList.add('nombre-descripcion-producto');
            contenedorDescripcionProducto.classList.add(`type-${primerasLetras}`);
    
            const nombreProducto = document.createElement('h2');
            nombreProducto.textContent = producto.name;
    
            const cantidadProducto = document.createElement('span');
            cantidadProducto.textContent = `Cantidad: ${producto.cantidad}`;
    
            // Agregar los elementos h2 y span al Div contenedorDescripcionProducto.
            contenedorDescripcionProducto.appendChild(nombreProducto);
            contenedorDescripcionProducto.appendChild(cantidadProducto);

            divProducto.appendChild(contenedorDescripcionProducto)
    
            // Div contenedor de los tres supermercados y precio
            const contenedorSupermercadosPrecio = document.createElement('div');
            contenedorSupermercadosPrecio.classList.add('contenedor-supermercados-precio');
    
            // Crear divs para cada supermercado
            const lidlDiv = document.createElement('div');
            lidlDiv.classList.add('supermercado');
    
            const mercadonaDiv = document.createElement('div');
            mercadonaDiv.classList.add('supermercado');
    
            const eroskiDiv = document.createElement('div');
            eroskiDiv.classList.add('supermercado');
    
            // Agregar imagen y precio para Lidl
            const contenerimglidl = document.createElement('div')
            contenerimglidl.classList.add('contenidosupermercado')
            const lidlImg = document.createElement('img');
            lidlImg.src = 'imagenes/lidlimg.png';
            lidlImg.classList.add('lidl-img');
            contenerimglidl.appendChild(lidlImg)
            lidlDiv.appendChild(contenerimglidl);

            const contenerpreciolidl = document.createElement('div')
            contenerpreciolidl.classList.add('contenidosupermercado')
            const lidlPrecio = document.createElement('span');
            lidlPrecio.textContent = `${producto.preciolidl} €`;
            lidlPrecio.classList.add('spanpreciolidl');
            contenerpreciolidl.appendChild(lidlPrecio)
            lidlDiv.appendChild(contenerpreciolidl)
    
            // Agregar imagen y precio para Mercadona
            const contenerimgmercadona = document.createElement('div');
            contenerimgmercadona.classList.add('contenidosupermercado');
            const mercadonaImg = document.createElement('img');
            mercadonaImg.src = 'imagenes/mercadonagris.png'; 
            mercadonaImg.classList.add('mercadona-img');
            contenerimgmercadona.appendChild(mercadonaImg )
            mercadonaDiv.appendChild(contenerimgmercadona);

            const contenerpreciomercadona = document.createElement('div');
            contenerpreciomercadona.classList.add('contenidosupermercado');
            const mercadonaPrecio = document.createElement('span');
            mercadonaPrecio.textContent = `${producto.preciomercadona} €`;
            mercadonaPrecio.classList.add('spanpreciomercadona');
            contenerpreciomercadona.appendChild(mercadonaPrecio);
            mercadonaDiv.appendChild(contenerpreciomercadona);

    
            // Agregar imagen y precio para Eroski
            const contenerimgeroski = document.createElement('div');
            contenerimgeroski.classList.add('contenidosupermercado');
            const eroskiImg = document.createElement('img');
            eroskiImg.src = 'imagenes/eroski.png'; 
            eroskiImg.classList.add('eroski-img');
            contenerimgeroski.appendChild(eroskiImg)
            eroskiDiv.appendChild(contenerimgeroski);
    
            const contenerprecioeroski = document.createElement('div')
            contenerprecioeroski.classList.add('contenidosupermercado')
            const eroskiPrecio = document.createElement('span');
            eroskiPrecio.textContent = `${producto.precioeroski} €`;
            eroskiPrecio.classList.add('spanprecioeroski');
            contenerprecioeroski.appendChild(eroskiPrecio);
            eroskiDiv.appendChild(contenerprecioeroski);
    
            // Agregar los divs de los supermercados al contenedor principal contenedorSupermercadosPrecio
            contenedorSupermercadosPrecio.appendChild(lidlDiv);
            contenedorSupermercadosPrecio.appendChild(mercadonaDiv);
            contenedorSupermercadosPrecio.appendChild(eroskiDiv);

            divProducto.appendChild(contenedorSupermercadosPrecio)
    

            
            divPadre.appendChild(divProducto);

           });
          
      } catch (error) {
          console.log(error);
      }
      }
    
      mostrarProductos(); 
  
      function limpiarForm(){
        document.getElementById("name").value = ""
        document.getElementById("cantidad").value =""
        document.getElementById("preciomercadona").value =""
        document.getElementById("preciolidl").value = ""
        document.getElementById("precioeroski").value = ""
      }
      
      document.querySelector('#btnAgregar').addEventListener('click', () => {
        const formAnadir = document.querySelector("#formAnadir");
          limpiarForm()
          formAnadir.style.display = "block";
          document.getElementsByClassName('add')[0].style.display = "block";
          document.querySelector('#edit').style.display = "none";
          
          
        
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
        cargarDatosProducto();
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
          
          console.log(document);
          
          // Asignar un identificador único al botón
          botonBorrar.id = `botonBorrar-${index}`;
          
          productoHTML.appendChild(botonBorrar);
          // Agregar el evento click al botón para llamar a la función de borrado
          botonBorrar.addEventListener('click', () => {
            borrarProducto(producto.name);
          });
          
          // Agregar el botón al elemento del producto
      
          const botonEditar = document.createElement('button');
          botonEditar.textContent = 'Editar';
          botonEditar.classList.add('actionedit')
      
      // Asignar un identificador único al botón
          botonEditar.id = `botonEditar-${index}`;
      
      // Agregar el evento click al botón para llamar a la función de edición
          botonEditar.addEventListener('click', () => {
            const formAnadir = document.querySelector(".form-anadir");
            formAnadir.style.display = "block";
            document.querySelector('.add').style.display="none";
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
          body: JSON.stringify({name: nameProducto})
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
          
          const formAnadir = document.querySelector("#formAnadir");
          formAnadir.style.display = "none";
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
  
  