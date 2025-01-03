document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const idEvento = urlParams.get("id");

  if (idEvento) {
    // Si hay un ID en la URL, cargamos el evento
    console.log("Si hay ID de evento en la URL");
    await cargarEvento(idEvento);
  } else {
    console.log("No hay ID de evento en la URL");
  }
});

document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const idEvento = urlParams.get("id");

  if (idEvento) {
    // Si hay un ID en la URL, cargamos el evento
    console.log("Si hay ID de evento en la URL");
    await cargarEvento(idEvento);
  } else {
    console.log("No hay ID de evento en la URL");
  }
});

async function cargarEvento(id) {
  try {
    // Realiza una solicitud para obtener los datos del evento enviando el id
    console.log("Iniciando solicitud para cargar evento");
    const response = await fetch("http://localhost:5000/getEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }), // Incluye el id en el cuerpo de la solicitud
    });

    console.log("Respuesta recibida");

    if (response.ok) {
      console.log("Respuesta exitosa");
      const evento = await response.json();
      console.log(evento);
      console.log("DATOS");
      // Rellena los campos del formulario con los datos del evento
      document.getElementById("nombre").value = evento[0].nombre || "";
      document.getElementById("tipo").value = evento[0].tipo || "";
      document.getElementById("descripcion").value =
        evento[0].descripcion || "";
      document.getElementById("inicio").value = evento[0].fechainicio
        ? evento[0].fechainicio.split("T")[0]
        : "";
      document.getElementById("fin").value = evento[0].fechafin
        ? evento[0].fechafin.split("T")[0]
        : "";
      document.getElementById("fechaincripcion").value = evento[0]
        .fechainscripcion
        ? evento[0].fechainscripcion.split("T")[0]
        : "";

      document.getElementById("publico").value = evento[0].publica
        ? "publico"
        : "privado";

      console.log("Campos de formulario completados con éxito");
    } else {
      console.error("Error al obtener los detalles del evento");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}

document.getElementById("event-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const urlParams = new URLSearchParams(window.location.search);
  const idEvento = urlParams.get("id");
  const nombre = document.getElementById("nombre").value;
  const tipoEvento = document.getElementById("tipo").value;
  const descripcion = document.getElementById("descripcion").value;
  const publica = document.getElementById("publico").value === "publico";
  const fechainicio = document.getElementById("inicio").value;
  const fechafin = document.getElementById("fin").value;
  const fechainscripcion = document.getElementById("fechaincripcion").value;

  try {
    console.log("Si  entrea antes del fetch");
    const res = await fetch("http://localhost:5000/updateEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idEvento,
        nombre,
        tipoEvento,
        descripcion,
        publica,
        fechainicio,
        fechafin,
        fechainscripcion,
      }),
    });
    console.log("f");
    if (!res.ok) {
      alert("Error al guardar el evento.");
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
