alert("login.js loaded");

// 🔹 Registro de usuario
document.getElementById("btnRegistro").addEventListener("click", async () => {
  const nombre = document.getElementById("regNombre").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const contraseña = document.getElementById("regPassword").value.trim();

  alert("Nombre: " + nombre + " Email: " + email + " Password: " + contraseña);

  if (!nombre || !email || !contraseña) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/usuarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, contraseña })
    });

    if (!response.ok) throw new Error("Error al registrar usuario");

    const data = await response.json();
    alert(`Usuario registrado: ${data.nombre}`);

    // Limpiar campos
    document.getElementById("regNombre").value = "";
    document.getElementById("regEmail").value = "";
    document.getElementById("regPassword").value = "";

  } catch (error) {
    console.error(error);
    alert("No se pudo registrar el usuario. Intente nuevamente.");
  }
});

// 🔹 Login de usuario
document.getElementById("btnLogin").addEventListener("click", async () => {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    alert("Debe ingresar email y contraseña.");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/API/usuarios`);
    if (!response.ok) throw new Error("Error al consultar usuarios");

    const usuarios = await response.json();

    // Validar email y contraseña
    const usuario = usuarios.find(u => u.email === email && u.contraseña === password);
    if (usuario) {
      alert(`Bienvenido ${usuario.nombre}!`);
      // Aquí puedes redirigir a la tienda o guardar sesión
    } else {
      alert("Email o contraseña incorrectos.");
    }

  } catch (error) {
    console.error(error);
    alert("Error al iniciar sesión.");
  }
});
