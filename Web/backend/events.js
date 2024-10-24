async function getEvents() {
  const API_URL = 'http://localhost:5000/getAllEvents';

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error en la solicitud: ' + response.status);
    }
    const events = await response.json();
    return events;
  } catch (error) {
    console.error('Error al obtener los eventos:', error);
    throw error;
  }
}
// when page is loaded
document.addEventListener('DOMContentLoaded', async function () {
  try {
    const events = await getEvents(); // Espera a que getEvents devuelva los datos
    console.log('Eventos recibidos:', events);
    const eventContainer = document.getElementById('eventContainer');

    events.forEach((event) => {
      // Crear la tarjeta del evento
      const eventCard = document.createElement('div');
      eventCard.classList.add('col-md-4', 'mb-4');

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
    console.error('Error al manejar los eventos:', error);
  }
});

// Función para redirigir a la página de combos con la información del evento seleccionado
function verCombos(eventTitle, fechaInscripcion) {
  // Redirigir a combos.html pasando la información del evento como parámetros en la URL
  window.location.href = `combos.html?title=${encodeURIComponent(
    eventTitle
  )}&fechaInscripcion=${encodeURIComponent(fechaInscripcion)}`;
}
