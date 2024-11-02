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
    if (responseJson.redirect) {
      const modalExito = new bootstrap.Modal(
        document.getElementById("modalExito")
      );
      modalExito.show();

      setTimeout(() => {
        window.location.href = responseJson.redirect;
      }, 2000);
    } else {
      alert("Rol del usuario actualizado exitosamente.");
    }
  } catch (error) {
    console.error("Error en la solicitud: ", error);
  }
}
