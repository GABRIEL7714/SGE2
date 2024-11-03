function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Obtener el rol de la URL y actualizar el encabezado
const rol = getQueryParam("rol");

if (rol) {
  // Actualizar el encabezado con "Designar" seguido del rol
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("headerRol").textContent = `Designar ${
      rol.charAt(0).toUpperCase() + rol.slice(1)
    }`;
  });
}

function buscarPersona() {
  const urlParams = new URLSearchParams(window.location.search);
  const rolNuevo = urlParams.get("rol");

  const numerodoc = document.getElementById("documento").value;
  changeUserRole(numerodoc, rolNuevo);
}

async function changeUserRole(numerodoc, rolNuevo) {
  try {
    const res = await fetch("http://localhost:5000/changeRol", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        numerodoc,
        rolNuevo,
      }),
    });

    // Verificación de respuesta del servidor
    if (!res.ok) {
      const personaNoEncontradaModal = new bootstrap.Modal(
        document.getElementById("personaNoEncontradaModal")
      );
      personaNoEncontradaModal.show();
      return;
    }

    const responseJson = await res.json();

    // Si el servidor indica redirección, muestra el modal de éxito y redirige
    if (responseJson.redirect && responseJson.user) {
      // Actualiza los elementos del modal con los datos del usuario
      document.getElementById("nombreUsuario").textContent =
        responseJson.user.nombre;
      document.getElementById("apellidoUsuario").textContent =
        responseJson.user.apellido;
      document.getElementById("telefonoUsuario").textContent =
        responseJson.user.telefono;
      document.getElementById("rolUsuario").textContent = responseJson.user.rol;

      // Muestra el modal de éxito
      const modalExito = new bootstrap.Modal(
        document.getElementById("modalExito")
      );
      modalExito.show();
    } else {
      alert("Rol del usuario actualizado exitosamente.");
    }
  } catch (error) {
    console.error("Error en la solicitud: ", error);
  }
}

document.getElementById("volverButton").addEventListener("click", function () {
  window.history.back();
});
