document.addEventListener('DOMContentLoaded', function () {
    // Obtener los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('categoryId');
    const comboId = urlParams.get('comboId');
    const eventTitle = urlParams.get('title');

    // Ejemplo de datos de categorías y combos
    const categories = [
        { id: 1, nombre: 'Estudiante', precio: 100 },
        { id: 2, nombre: 'Colaborador', precio: 50 },
        { id: 3, nombre: 'Profesional', precio: 110 }
    ];

    const combos = [
        { id: 1, nombre: 'Charla + Congreso' },
        { id: 2, nombre: 'Solo Congreso' }
    ];

    // Obtener la categoría y combo seleccionados
    const selectedCategory = categories.find(category => category.id == categoryId) || { nombre: 'N/A', precio: 0 };
    const selectedCombo = combos.find(combo => combo.id == comboId) || { nombre: 'N/A' };

    // Ejemplo de datos del cliente
    const customerName = 'Pepe Puentes';
    const documentType = 'DNI';
    const documentNumber = '72584952';
    const eventName = eventTitle || 'Congreso'; // Si no hay evento, usar un valor por defecto

    // Actualizar los valores de la boleta
    document.getElementById('invoiceNumber').innerText = '0015052026001'; // Generar dinámicamente si es necesario
    document.getElementById('customerName').innerText = customerName;
    document.getElementById('documentType').innerText = documentType;
    document.getElementById('documentNumber').innerText = documentNumber;
    document.getElementById('eventName').innerText = eventName;
    document.getElementById('comboName').innerText = selectedCombo.nombre;
    document.getElementById('categoryName').innerText = selectedCategory.nombre;
    document.getElementById('totalAmount').innerText = selectedCategory.precio.toFixed(2);

    // Evento del botón pagar
    document.getElementById('payButton').addEventListener('click', function () {
        alert('Redirigiendo a la pasarela de pago...'); // Aquí puedes agregar la redirección a la pasarela de pago real
    });
});