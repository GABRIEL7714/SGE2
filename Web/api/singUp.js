document.getElementById("singUp-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const telefono = document.getElementById("telefono").value;
  const correo = document.getElementById("correo").value;
  const contrasena = document.getElementById("contraseña").value;
  const tipodoc = document.getElementById("tipodoc").value;
  const numerodoc = document.getElementById("numerodoc").value;

  try {
    const res = await fetch("http://localhost:5000/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        nombre,
        apellido,
        telefono,
        correo,
        contrasena,
        tipodoc,
        numerodoc,
      }),
    });

    if (!res.ok) {
      const errorResponse = await res.json(); // Obtiene el mensaje de error del backend
      const mensajeError = document.getElementById("mensajeError");
      mensajeError.textContent =
        errorResponse.errorMessage || "Error desconocido al crear el usuario.";
      mensajeError.classList.remove("escondido");
      mensajeError.style.display = "block";
      return;
    }

    const reJson = await res.json();

    if (reJson.redirect) {
      // Muestra el modal de éxito
      const modalExito = new bootstrap.Modal(
        document.getElementById("modalExito")
      );
      modalExito.show();

      // Espera 2 segundos antes de redirigir
      setTimeout(() => {
        window.location.href = reJson.redirect;
      }, 2000);
    }
  } catch (error) {
    console.error("Error en la solicitud: ", error);
    const mensajeError = document.getElementById("mensajeError");
    mensajeError.textContent =
      "Ocurrió un error inesperado. Intenta nuevamente.";
    mensajeError.classList.remove("escondido");
    mensajeError.style.display = "block";
  }
});
