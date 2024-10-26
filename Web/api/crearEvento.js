document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const idEvento = urlParams.get("id");

  if (idEvento) {
    // Si hay un ID en la URL, cargamos el evento
    console.log("si hay id");
    await cargarEvento(idEvento);
  } else {
    console.log("No hay ID de evento en la URL");
  }
});

async function cargarEvento(id) {
  try {
    // Realiza una solicitud para obtener los datos del evento enviando el id
    console.log("SI1");
    const response = await fetch("http://localhost:5000/getEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }), // Incluye el id en el cuerpo de la solicitud
    });

    console.log("SI2");

    if (response.ok) {
      console.log("SI ES OKAY");
      const evento = await response.json();
      console.log(evento.rows);
      // Rellena los campos del formulario con los datos del evento
      document.getElementById("nombre").value = evento.nombre || "";
      document.getElementById("tipo").value = evento.tipo || "";
      document.getElementById("descripcion").value = evento.descripcion || "";
      document.getElementById("inicio").value = evento.fechainicio
        ? evento.fechainicio.split("T")[0]
        : "";
      document.getElementById("fin").value = evento.fechafin
        ? evento.fechafin.split("T")[0]
        : "";
      document.getElementById("publica").checked = evento.publica === true;
      console.log("SI3");
    } else {
      console.error("Error al obtener los detalles del evento");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}
