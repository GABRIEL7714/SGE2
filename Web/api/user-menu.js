// Función para cargar el header y luego ejecutar renderUserMenu
function loadHeaderAndUserMenu() {
  fetch("/Web/includes/header.html")
    .then((response) => response.text())
    .then((data) => {
      // Inserta el header cargado en el DOM
      document.getElementById("header").innerHTML = data;

      // Ahora que el header está cargado, renderiza el menú de usuario
      renderUserMenu();
    })
    .catch((error) => {
      console.error("Error cargando el header:", error);
    });
}

// Función para cargar el footer
function loadFooter() {
  fetch("/Web/includes/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer").innerHTML = data;
    })
    .catch((error) => {
      console.error("Error cargando el footer:", error);
    });
}

// user-menu.js
function renderUserMenu() {
  const userMenu = document.getElementById("user-menu");

  if (!userMenu) {
    console.error('El elemento con id "user-menu" no existe en el DOM.');
    return;
  }

  // Asegurarnos de que el valor por defecto de loggedIn sea 'false' si no existe
  if (localStorage.getItem("loggedIn") === null) {
    localStorage.setItem("loggedIn", "false"); // Definir 'false' como valor predeterminado
  }

  let loggedIn = localStorage.getItem("loggedIn") === "true";
  let roles = JSON.parse(localStorage.getItem("roles")) || []; // Cargar roles desde localStorage
  let currentRole = localStorage.getItem("currentRole") || roles[0]; // Si no hay currentRole, usar el primer rol

  console.log("Estado de loggedIn es: ", loggedIn);
  console.log("Roles disponibles: ", roles);
  console.log("Rol actual: ", currentRole);

  if (loggedIn) {
    let menuHtml = `
            <div class="dropdown d-inline-block">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="roleDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    ${currentRole} <!-- Rol actual -->
                </button>
                <div class="dropdown-menu" aria-labelledby="roleDropdown">
        `;

    // Añadir todos los roles al dropdown
    roles.forEach((role) => {
      // Resaltar el rol actual en el menú desplegable
      let activeClass = role === currentRole ? "active" : "";
      menuHtml += `<a class="dropdown-item ${activeClass}" href="#" onclick="changeRole('${role}')">${role}</a>`;
    });

    menuHtml += `</div></div>`;

    // Añadir opciones de cerrar sesión
    menuHtml += `
            <span class="ml-3">Usuario</span>
            <a href="#" class="ml-3" onclick="logout()">Cerrar sesión</a>
        `;

    userMenu.innerHTML = menuHtml;
  } else {
    userMenu.innerHTML = `<a href="/Web/pages/logIn.html" class="btn btn-outline-primary">Iniciar Sesión</a>`;
  }
}

// Función para cambiar el rol actual
function changeRole(role) {
  localStorage.setItem("currentRole", role); // Guardar el nuevo rol en localStorage
  renderUserMenu(); // Vuelve a renderizar el menú con el nuevo rol
}

// Función para cerrar sesión
function logout() {
  localStorage.setItem("loggedIn", "false");
  localStorage.removeItem("roles");
  localStorage.removeItem("currentRole");
  renderUserMenu();
}

// Llamar a las funciones para cargar el header, el footer, y el menú de usuario cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
  loadHeaderAndUserMenu();
  loadFooter();
});
