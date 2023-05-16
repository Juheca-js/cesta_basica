

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
            lidlPrecio.textContent = `${producto.precioldl} €`;
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
  
        
  
  