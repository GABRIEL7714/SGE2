document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  id_evento = urlParams.get("eventId");
  console.log(id_evento);

  if (id_evento) {
    // Si hay un ID en la URL, cargamos el evento
    console.log("Si hay ID de evento en la URL");
  } else {
    console.log("No hay ID de evento en la URL");
  }
});

document
  .getElementById("activity-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    //const { date, id_evento, hora_inicio, hora_fin, expositor, tipo, nombre } = req.body;

    // Obtener los valores del formulario
    const nombre = document.getElementById("nombre").value;
    const tipo = document.getElementById("tipo").value;
    const expositor = document.getElementById("expositor").value;
    const descripcion = document.getElementById("descripcion").value;
    const date = document.getElementById("fecha").value;
    const hora_inicio = document.getElementById("inicio").value;
    const hora_fin = document.getElementById("fin").value;

    try {
      // Enviar los datos al servidor
      const res = await fetch("http://localhost:5000/createActivity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          date,
          id_evento,
          hora_inicio,
          hora_fin,
          expositor,
          tipo,
          nombre,
          descripcion,
        }),
      });

      if (!res.ok) {
        alert("Error al crear la actividad.");
        return;
      }

      const reJson = await res.json();

      // Si hay una redirección, mostrar el modal de éxito y redirigir
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
