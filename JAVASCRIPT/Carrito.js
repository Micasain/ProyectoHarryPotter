// carrito.js

// Función para agregar un producto al carrito
function agregarAlCarrito(boton) {
    // 1. Obtener la información del producto desde los atributos 'data-' del botón
    const id = boton.dataset.id;
    const nombre = boton.dataset.nombre;
    const precio = parseFloat(boton.dataset.precio); // Convertimos el precio a número
    const imagen = boton.dataset.imagen;

    // 2. Obtener el carrito actual del LocalStorage
    let carritoGuardado = localStorage.getItem('carrito');
    let carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

    // 3. Verificar si el producto ya existe en el carrito
    const productoExistente = carrito.find(item => item.id === id);

    // 4. Si el producto existe, aumentar su cantidad. Si no, agregarlo al carrito.
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ id: id, nombre: nombre, precio: precio, imagen: imagen, cantidad: 1 });
    }

    // 5. Guardar el carrito actualizado en el LocalStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // 6. Mostrar un mensaje al usuario (puedes personalizar esto)
    alert(`"${nombre}" ha sido agregado al carrito!`);
}

// Función para obtener el carrito del LocalStorage
function obtenerCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

// Función para mostrar los productos en la página del carrito
function mostrarCarrito() {
    const carrito = obtenerCarrito();
    const listaCarrito = document.getElementById('lista-carrito'); // Debes tener un elemento con este ID en tu página del carrito

    // Limpiar la lista del carrito antes de mostrar los elementos
    if (listaCarrito) {
        listaCarrito.innerHTML = '';

        if (carrito.length === 0) {
            listaCarrito.innerHTML = '<p>El carrito está vacío.</p>';
        } else {
            carrito.forEach(producto => {
                const listItem = document.createElement('div');
                listItem.classList.add('item-carrito'); // Puedes agregar clases para estilos CSS

                listItem.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}" width="50">
                    <div class="info-carrito">
                        <h4>${producto.nombre}</h4>
                        <p>Precio: $${producto.precio.toLocaleString()}</p>
                        <p>Cantidad: ${producto.cantidad}</p>
                        <button onclick="eliminarDelCarrito('${producto.id}')">Eliminar</button>
                    </div>
                `;
                listaCarrito.appendChild(listItem);
            });
        }
    }
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(id) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(item => item.id !== id); // Filtra el array, dejando solo los productos con ID diferente al que se quiere eliminar
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito(); // Volvemos a mostrar el carrito actualizado
}

// (Opcional por ahora) Función para actualizar la cantidad de un producto
function actualizarCantidad(id, nuevaCantidad) {
    let carrito = obtenerCarrito();
    const productoEncontrado = carrito.find(item => item.id === id);
    if (productoEncontrado) {
        productoEncontrado.cantidad = parseInt(nuevaCantidad);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito(); // Volvemos a mostrar el carrito actualizado
    }
}