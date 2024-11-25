document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const idAmbiente = urlParams.get("id");

  if (idAmbiente) {
    console.log("Si hay ID de Ambiente en la URL");
    await cargarAmbiente(idAmbiente);
  } else {
    console.log("No hay ID de Ambiente en la URL");
  }
});

// Función que carga los datos en los campos del formulario
async function cargarAmbiente(id) {
  try {
    console.log("Iniciando solicitud para cargar ambiente");
    const response = await fetch("http://localhost:5000/getAmbienteById", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }), // Incluye el id en el cuerpo de la solicitud
    });
    console.log("Respuesta: ");
    console.log(response);
    if (response.ok) {
      const ambiente = await response.json();

      // Rellena los campos del formulario con los datos del ambiente
      document.getElementById("ubicacion").value = ambiente.locacion || "";
      document.getElementById("capacidad").value = ambiente.capacidad || "";

      // Configura la disponibilidad según el valor booleano
      document.getElementById("disponibilidad").value = ambiente.disponible
        ? "disponible"
        : "no_disponible";

      console.log("Campos del formulario completados con éxito");
    } else {
      console.error("Error al obtener los detalles del ambiente");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}

document
  .getElementById("editarAmbienteForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const idAmbiente = urlParams.get("id");

    const ubicacion = document.getElementById("ubicacion").value;
    const capacidad = parseInt(document.getElementById("capacidad").value, 10);
    const disponible =
      document.getElementById("disponibilidad").value === "disponible";

    try {
      // Realiza la solicitud para actualizar el ambiente
      const res = await fetch("http://localhost:5000/updateAmbiente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          idAmbiente,
          ubicacion,
          capacidad,
          disponible,
        }),
      });

      if (!res.ok) {
        alert("Error al guardar el ambiente.");
        return;
      }

      const reJson = await res.json();

      // Si hay una redirección, muestra un modal de éxito y redirige
      if (reJson.redirect) {
        const modalExito = new bootstrap.Modal(
          document.getElementById("modalExito")
        );
        modalExito.show();

        setTimeout(() => {
          window.location.href = reJson.redirect;
        }, 2000);
      }
    } catch (error) {
      console.error("Error en la solicitud: ", error);
    }
  });

document.getElementById("cancelarBtn").addEventListener("click", function () {
  window.location.href = "/AsignarAmbiente"; // Ejemplo de redirección a otra página
});
