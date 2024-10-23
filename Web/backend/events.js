document.addEventListener('DOMContentLoaded', function () {
    const events = [
        {
            title: 'Evento 1',
            date: '05/07/24',
            img: 'https://via.placeholder.com/150',
            fechaInscripcion: "2025-10-12",
        },
        {
            title: 'Evento 2',
            date: '12/10/25',
            img: 'https://via.placeholder.com/150',
        },
        {
            title: 'Evento 3',
            date: '12/10/25',
            img: 'https://via.placeholder.com/150',
        },
        {
            title: 'Evento 4',
            date: '12/10/25',
            img: 'https://via.placeholder.com/150',
        }
    ];

    const eventContainer = document.getElementById('eventContainer');

    events.forEach(event => {
        // Crear la tarjeta del evento
        const eventCard = document.createElement('div');
        eventCard.classList.add('col-md-4', 'mb-4');

        eventCard.innerHTML = `
           <div class="card h-100">
                <img src="${event.img}" class="card-img-top" alt="${event.title}">
                <div class="card-body text-center">
                    <h5 class="card-title">${event.title}</h5>
                    <p class="card-text">${event.date}</p>
                    <button class="btn btn-success" onclick="verCombos('${event.title}', '${event.fechaInscripcion}')">Ver Combos</button>
                </div>
            </div>
        `;

        eventContainer.appendChild(eventCard);
    });
});


// Función para redirigir a la página de combos con la información del evento seleccionado
function verCombos(eventTitle, fechaInscripcion) {
    // Redirigir a combos.html pasando la información del evento como parámetros en la URL
    window.location.href = `combos.html?title=${encodeURIComponent(eventTitle)}&fechaInscripcion=${encodeURIComponent(fechaInscripcion)}`;
}