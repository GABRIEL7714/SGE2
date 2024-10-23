document.addEventListener("DOMContentLoaded", function () {
  // Obtener los parámetros de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const eventTitle = urlParams.get("title");
  const fechaInscripcion = new Date(urlParams.get("fechaInscripcion"));
  const today = new Date();

  // Actualizar el título del evento en la página
  document.getElementById("eventTitle").textContent = eventTitle;

  // Determinar si es preinscripción o inscripción
  const botonTexto =
    today < fechaInscripcion ? "Pre Inscribirse" : "Inscribirse";
  document.getElementById("inscribirButton").textContent = botonTexto;

  // Añadir combos
  const combos = [
    { id: 1, nombre: "Congreso + Charla", precio: 50 },
    { id: 2, nombre: "Congreso", precio: 30 },
    { id: 3, nombre: "Completo", precio: 60 },
  ];

  let selectedComboId = null; // Almacenar el ID del combo seleccionado
  const combosContainer = document.getElementById("combosContainer");

  combos.forEach((combo) => {
    const comboCard = document.createElement("div");
    comboCard.classList.add("col-md-4", "mb-4");

    comboCard.innerHTML = `
            <div class="card h-100" id="combo-${combo.id}">
                <div class="card-body">
                    <h5 class="card-title">${combo.nombre}</h5>
                    <p class="card-text">Desde: S/.${combo.precio}</p>
                    <button class="btn btn-secondary">Seleccionar</button>
                </div>
            </div>
        `;

    // Añadir evento de selección de combo
    comboCard.querySelector("button").addEventListener("click", function () {
      // Remover la selección previa
      document.querySelectorAll(".card").forEach((card) => {
        card.classList.remove("selected-card");
        card.querySelector("button").classList.remove("btn-success");
        card.querySelector("button").classList.add("btn-secondary");
      });

      // Marcar el combo actual como seleccionado
      comboCard.querySelector(".card").classList.add("selected-card");
      comboCard.querySelector("button").classList.add("btn-success");
      comboCard.querySelector("button").classList.remove("btn-secondary");

      // Guardar el ID del combo seleccionado
      selectedComboId = combo.id;
    });

    combosContainer.appendChild(comboCard);
  });

  // Validar si el usuario está autenticado cuando se hace clic en el botón de inscripción
  document
    .getElementById("inscribirButton")
    .addEventListener("click", function () {
      const isAuthenticated = sessionStorage.getItem("authenticated"); // Validar si el usuario está autenticado

      if (!isAuthenticated) {
        // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
        window.location.href = "/Web/pages/logIn.html";
      } else {
        if (selectedComboId === null) {
          alert("Por favor selecciona un combo antes de continuar.");
          return;
        }
        // Si el usuario ya está autenticado, redirigir según la fecha de inscripción
        let nextPage =
          today < fechaInscripcion
            ? "/pages/preinscription.html"
            : "/pages/categories.html";
        // Pasar el título del evento y el ID del combo seleccionado en la URL
        window.location.href = `${nextPage}?title=${encodeURIComponent(
          eventTitle
        )}&comboId=${selectedComboId}`;
      }
    });
});
