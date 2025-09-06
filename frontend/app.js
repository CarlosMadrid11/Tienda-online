// 🔹 URL base de la API
const API_URL = "http://localhost:4000/api";

// 🔹 Array global para guardar los productos agregados al carrito
let carrito = [];

/** 
 * 🔹 Función: cargarProductos
 * Trae los productos desde la API y los dibuja en el DOM.
 * Cada producto se muestra en una "tarjeta" con nombre, descripción, precio, stock y botón de agregar.
 */
async function cargarProductos() {
  try {
    const response = await fetch(`${API_URL}/productos`);
    if (!response.ok) throw new Error("Error HTTP: " + response.status);

    const productos = await response.json(); // convierte la respuesta a JSON

    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = ""; // limpia contenedor antes de mostrar productos

    // Recorremos los productos y los dibujamos
    productos.forEach(prod => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${prod.nombre}</h3>
        <p>${prod.descripcion}</p>
        <p><strong>Precio:</strong> $${prod.precio}</p>
        <p><strong>Stock:</strong> ${prod.stock}</p>
        <button onclick="agregarAlCarrito(${prod.id}, '${prod.nombre}', ${prod.precio}, ${prod.stock})">Agregar</button>
      `;

      contenedor.appendChild(card);
    });
  } catch (error) {
    console.error("Error cargando productos:", error);
    alert("No se pudieron cargar los productos. Revisa la API.");
  }
}

/**
 * 🔹 Función: agregarAlCarrito
 * @param {number} id - ID del producto
 * @param {string} nombre - Nombre del producto
 * @param {number} precio - Precio unitario
 * @param {number} stock - Stock disponible
 *
 * Agrega un producto al carrito. Si ya existe, aumenta la cantidad.
 * Verifica que no se supere el stock disponible.
 */
function agregarAlCarrito(id, nombre, precio, stock) {
  const itemExistente = carrito.find(item => item.id === id);

  if (itemExistente) {
    if (itemExistente.cantidad < stock) {
      itemExistente.cantidad += 1; // incrementa cantidad
    } else {
      alert("No hay más stock disponible para este producto");
      return;
    }
  } else {
    carrito.push({ id, nombre, precio, cantidad: 1 }); // agrega producto al carrito
  }

  actualizarTicket(); // actualiza la vista del ticket lateral
}

/**
 * 🔹 Función: actualizarTicket
 * Dibuja los productos que están en el carrito en el ticket lateral.
 * Muestra el nombre, cantidad, subtotal y un botón para eliminar.
 * Calcula y muestra el total del carrito.
 */
function actualizarTicket() {
  const lista = document.getElementById("listaTicket");
  lista.innerHTML = ""; // limpia lista antes de dibujar

  let total = 0;
  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}
      <button onclick="eliminarDelCarrito(${index})">❌</button>
    `;
    lista.appendChild(li);
    total += item.precio * item.cantidad; // suma al total
  });

  document.getElementById("total").textContent = total.toFixed(2);
}

/**
 * 🔹 Función: eliminarDelCarrito
 * @param {number} index - índice del producto en el array carrito
 *
 * Elimina un producto del carrito y actualiza el ticket.
 */
function eliminarDelCarrito(index) {
  carrito.splice(index, 1); // elimina el producto
  actualizarTicket();       // refresca el ticket
}

/**
 * 🔹 Evento: botón pagar
 * Al hacer click, crea un pedido en la API con todos los productos del carrito.
 * Luego crea los detalles del pedido para cada producto.
 * Finalmente limpia el carrito y recarga los productos para actualizar stock.
 */
document.getElementById("pagarBtn").addEventListener("click", async () => {
  if (carrito.length === 0) {
    alert("El carrito está vacío!");
    return;
  }

  try {
    // 1️⃣ Crear pedido en backend
    const pedidoResponse = await fetch(`${API_URL}/pedidos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usuario_id: 1, // Usuario fijo por ahora, se puede hacer dinámico
        total: carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0)
      })
    });

    if (!pedidoResponse.ok) throw new Error("Error al crear pedido");

    const pedidoData = await pedidoResponse.json();
    const pedidoId = pedidoData.id;

    // 2️⃣ Crear detalle de pedido para cada producto
    for (const item of carrito) {
      const detalleResponse = await fetch(`${API_URL}/detallePedidos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pedido_id: pedidoId,
          producto_id: item.id,
          cantidad: item.cantidad,
          precio_unitario: item.precio
        })
      });

      if (!detalleResponse.ok) throw new Error(`Error en detalle pedido: ${item.nombre}`);
    }

    // 3️⃣ Limpiar carrito y actualizar ticket
    carrito = [];
    actualizarTicket();

    alert(`¡Compra realizada con éxito! Pedido ID: ${pedidoId}`);

    // 4️⃣ Recargar productos para reflejar stock actualizado
    cargarProductos();

  } catch (error) {
    console.error("Error al procesar el pago:", error);
    alert("Hubo un error al procesar tu compra, intenta de nuevo.");
  }
});

// 🔹 Inicializar página al cargar
cargarProductos();
