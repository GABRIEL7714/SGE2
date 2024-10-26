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
      document.getElementById("fechaincripcion").value = evento.fechaincripcion
        ? evento.fechaincripcion.split("T")[0]
        : "";
      document.getElementById("publico").value = evento.publica
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
      document.getElementById("fechaincripcion").value = evento.fechaincripcion
        ? evento.fechaincripcion.split("T")[0]
        : "";
      document.getElementById("publico").value = evento.publica
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
  const fechaincripcion = document.getElementById("fechaincripcion").value;

  try {
    const res = await fetch("http://localhost:5000/updateEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        idEvento, // Incluimos el ID del evento si estamos actualizando
        nombre,
        tipoEvento,
        descripcion,
        publica,
        fechainicio,
        fechafin,
        fechaincripcion,
      }),
    });

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
