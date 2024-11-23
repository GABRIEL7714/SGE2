document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const idActividad = urlParams.get("id");

  if (idActividad) {
    console.log("Si hay ID de actividad en la URL");
    await cargarActividad(idActividad);
  } else {
    console.log("No hay ID de actividad en la URL");
  }
});

async function cargarActividad(id) {
  try {
    console.log("Iniciando solicitud para cargar actividad");
    const response = await fetch("http://localhost:5000/getActivity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }), // Incluye el id en el cuerpo de la solicitud
    });

    console.log("Respuesta recibida");

    if (response.ok) {
      console.log("Respuesta exitosa");
      const actividad = await response.json();

      // Rellena los campos del formulario con los datos de la actividad
      document.getElementById("nombre").value = actividad.nombre || "";
      document.getElementById("tipo").value = actividad.tipo || "";
      document.getElementById("expositor").value = actividad.expositor || "";
      document.getElementById("descripcion").value =
        actividad.descripcion || "";
      document.getElementById("fecha").value = actividad.date
        ? actividad.date.split("T")[0]
        : "";
      document.getElementById("inicio").value = actividad.hora_inicio || "";
      document.getElementById("fin").value = actividad.hora_fin || "";

      console.log("Campos del formulario completados con éxito");
    } else {
      console.error("Error al obtener los detalles de la actividad");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}

document
  .getElementById("activity-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const idActividad = urlParams.get("id");
    const nombre = document.getElementById("nombre").value;
    const tipo = document.getElementById("tipo").value;
    const expositor = document.getElementById("expositor").value;
    const descripcion = document.getElementById("descripcion").value;
    const date = document.getElementById("fecha").value;
    const hora_inicio = document.getElementById("inicio").value;
    const hora_fin = document.getElementById("fin").value;

    try {
      const res = await fetch("http://localhost:5000/updateActivity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          idActividad,
          nombre,
          tipo,
          expositor,
          descripcion,
          date,
          hora_inicio,
          hora_fin,
        }),
      });

      if (!res.ok) {
        alert("Error al guardar la actividad.");
        return;
      }

      const reJson = await res.json();

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
