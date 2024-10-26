function configureButtons(role) {
  const btnGestionarRoles = document.getElementById("btn-gestionar-roles");
  const btnReportes = document.getElementById("btn-reportes");
  const btnCaja = document.getElementById("btn-caja");
  const btnAsistencias = document.getElementById("btn-asistencias");
  const btnGestionarEventos = document.getElementById("btn-gestionar-eventos");

  if (role === "administrador") {
    // Todos los botones visibles
  } else if (role === "encargado") {
    btnGestionarRoles.style.display = "none";
    btnReportes.style.display = "none";
  } else if (role === "colaborador") {
    btnGestionarRoles.style.display = "none";
    btnReportes.style.display = "none";
    btnCaja.style.display = "none";
    btnGestionarEventos.style.display = "none";
  }
}

// Script en indexAdmin o EventsUser para leer la cookie y almacenar en localStorage
document.addEventListener("DOMContentLoaded", () => {
  // Función para leer la cookie por nombre
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  role = getCookie("rol");
  const nameDiv = document.getElementById("name");
  nameDiv.innerHTML = `<div class="header">Bienvenido ${role}</div>`;

  configureButtons(role);
});

document.querySelectorAll(".btn-custom").forEach((button) => {
  // Asignar el evento click para redireccionar usando el atributo data-url
  button.addEventListener("click", () => {
    const url = button.getAttribute("data-url");
    window.location.href = url;
  });
});
