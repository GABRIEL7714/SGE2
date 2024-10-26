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
  console.log("Si cargado");
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  // Leer la cookie "rol" y almacenar en localStorage
  const role = getCookie("rol");
  if (role) {
    localStorage.setItem("rol", role);
  }
  const loggedIn = getCookie("loggedIn");
  console.log(loggedIn);

  const nameDiv = document.getElementById("name");
  nameDiv.innerHTML = `<div class="header">Bienvenido ${role}</div>`;

  configureButtons(role);
});
