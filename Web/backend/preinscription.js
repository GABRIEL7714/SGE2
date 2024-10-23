document.addEventListener('DOMContentLoaded', function () {
    // Obtener los parámetros de la URL (incluyendo el título del evento y el ID del combo)
    const urlParams = new URLSearchParams(window.location.search);
    const eventTitle = urlParams.get('title');
    const comboId = urlParams.get('comboId'); // Aquí obtienes el ID del combo seleccionado

    // Actualizar el título del evento en la página
    if (eventTitle) {
        document.getElementById('eventTitle').textContent = eventTitle + ' Pre Inscripciones';
    }

    // Aquí puedes usar el comboId para realizar cualquier acción adicional
    console.log('ID del combo seleccionado:', comboId);

    // Redirigir al index.html cuando se presione el botón "OK"
    document.getElementById('okButton').addEventListener('click', function () {
        window.location.href = '../index.html';
    });
});
