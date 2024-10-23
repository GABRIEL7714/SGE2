document.addEventListener('DOMContentLoaded', function () {
    // Obtener los parámetros de la URL (por ejemplo, título del evento o combo seleccionado)
    const urlParams = new URLSearchParams(window.location.search);
    const comboId = urlParams.get('comboId');
    const eventTitle = urlParams.get('title');

    // Definir categorías
    const categories = [
        { id: 1, nombre: 'Estudiante', precio: 100 },
        { id: 2, nombre: 'Colaborador', precio: 50 },
        { id: 3, nombre: 'Profesional', precio: 110 }
    ];

    let selectedCategoryId = null; // Almacenar el ID de la categoría seleccionada
    const categoriesContainer = document.getElementById('categoriesContainer');

    // Cargar dinámicamente las tarjetas de categorías
    categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.classList.add('col-md-4', 'mb-4');

        categoryCard.innerHTML = `
            <div class="card h-100" id="category-${category.id}">
                <div class="card-body">
                    <h5 class="card-title">${category.nombre}</h5>
                    <p class="card-text">Precio: S/. ${category.precio.toFixed(2)}</p>
                    <button class="btn btn-secondary" id="select-category-${category.id}">Seleccionar</button>
                </div>
            </div>
        `;

        // Añadir evento de selección de categoría
        categoryCard.querySelector('button').addEventListener('click', function () {
            // Eliminar selección previa
            document.querySelectorAll('.card').forEach(card => {
                card.classList.remove('selected-card');
                card.querySelector('button').classList.remove('btn-success');
                card.querySelector('button').classList.add('btn-secondary');
            });

            // Marcar la categoría actual como seleccionada
            categoryCard.querySelector('.card').classList.add('selected-card');
            categoryCard.querySelector('button').classList.add('btn-success');
            categoryCard.querySelector('button').classList.remove('btn-secondary');

            // Guardar el ID de la categoría seleccionada
            selectedCategoryId = category.id;
        });

        categoriesContainer.appendChild(categoryCard);
    });

    // Evento del botón "Ir a Pagar"
    document.getElementById('pagarButton').addEventListener('click', function () {
        if (selectedCategoryId === null) {
            alert('Por favor selecciona una categoría antes de continuar.');
            return;
        }

        // Redirigir a la página de pago con los parámetros (categoría seleccionada, comboId, etc.)
        window.location.href = `/pages/payment.html?categoryId=${selectedCategoryId}&comboId=${comboId}&title=${encodeURIComponent(eventTitle)}`;
    });
});
