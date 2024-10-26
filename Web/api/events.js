// when page is loaded
document.addEventListener("DOMContentLoaded", async function () {
  try {
    const events = await fetch("/getAllEvents"); // Espera a que getEvents devuelva los datos
    const eventContainer = document.getElementById("eventContainer");

    console.log(events);

    events.forEach((event) => {
      // Crear la tarjeta del evento
      const eventCard = document.createElement("div");
      eventCard.classList.add("col-md-4", "mb-4");

      eventCard.innerHTML = `
           <div class="card h-100">
                <img src="${event.img}" class="card-img-top" alt="${event.nombre}">
                <div class="card-body text-center">
                    <h5 class="card-title">${event.descripcion}</h5>
                    <p class="card-text">${event.fechainicio}</p>
                    <button class="btn btn-success" onclick="verCombos('${event.nombre}', '${event.fechainscripcion}')">Ver Combos</button>
                </div>
            </div>
        `;

      eventContainer.appendChild(eventCard);
    });
  } catch (error) {
    console.error("Error al manejar los eventos:", error);
  }
});

// Función para redirigir a la página de combos con la información del evento seleccionado
function verCombos(eventTitle, fechaInscripcion) {
  // Redirigir a combos.html pasando la información del evento como parámetros en la URL
  window.location.href = `combos.html?title=${encodeURIComponent(
    eventTitle
  )}&fechaInscripcion=${encodeURIComponent(fechaInscripcion)}`;
}
