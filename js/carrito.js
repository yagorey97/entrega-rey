document.addEventListener("DOMContentLoaded", () => {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const cartCount = document.getElementById("cart-count");
  const vaciarBtn = document.getElementById("vaciar-carrito");
  const carritoContainer = document.getElementById("carrito-container");
  const carritoTotal = document.getElementById("carrito-total");

  // Actualiza el contador del carrito
  function actualizarContador() {
    cartCount.textContent = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
  }

  // Guarda en localStorage
  function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  // Muestra los productos en carrito.html
  function mostrarCarrito() {
    if (!carritoContainer) return; // Estamos en otra página
    carritoContainer.innerHTML = "";

    if (carrito.length === 0) {
      carritoContainer.innerHTML = "<p>No hay productos en el carrito.</p>";
      carritoTotal.textContent = "$0";
      return;
    }

    let total = 0;

    carrito.forEach(prod => {
      const item = document.createElement("div");
      item.classList.add("card", "mb-3");
      item.innerHTML = `
        <div class="card-body d-flex justify-content-between align-items-center">
          <div>
            <h5 class="card-title mb-1">${prod.nombre}</h5>
            <p class="mb-0">Precio: $${prod.precio}</p>
            <p class="mb-0">Cantidad: ${prod.cantidad}</p>
          </div>
        </div>
      `;
      carritoContainer.appendChild(item);
      total += prod.precio * prod.cantidad;
    });

    carritoTotal.textContent = `$${total.toLocaleString("es-AR")}`;
  }

  // Botón "Agregar al carrito" en indumentaria.html
  const botonesAgregar = document.querySelectorAll(".agregar-al-carrito");
  botonesAgregar.forEach(boton => {
    boton.addEventListener("click", () => {
      const id = boton.dataset.id;
      const nombre = boton.dataset.nombre;
      const precio = parseInt(boton.dataset.precio);

      const productoExistente = carrito.find(prod => prod.id === id);
      if (productoExistente) {
        productoExistente.cantidad++;
      } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
      }

      guardarCarrito();
      actualizarContador();
    });
  });

  // Botón "Vaciar carrito"
  if (vaciarBtn) {
    vaciarBtn.addEventListener("click", () => {
      carrito.length = 0;
      guardarCarrito();
      actualizarContador();
      mostrarCarrito();
    });
  }

  actualizarContador();
  mostrarCarrito();
});
