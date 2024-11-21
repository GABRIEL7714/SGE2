// Función auxiliar para obtener el valor de una cookie por nombre
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

// Función para cargar el header y luego ejecutar renderUserMenu
function loadHeaderAndUserMenu() {
  fetch("/includes/header.html")
    .then((response) => response.text())
    .then((data) => {
      console.log("Header cargado correctamente");
      document.getElementById("header").innerHTML = data;

      // Asegúrate de que los elementos estén cargados
      if (document.getElementById("user-menu")) {
        renderUserMenu();
      } else {
        console.error(
          'No se encontró el elemento "user-menu" después de cargar el header.'
        );
      }
    })
    .catch((error) => {
      console.error("Error cargando el header:", error);
    });
}

// Función para cargar el footer
function loadFooter() {
  fetch("/includes/footer.html")
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

  // Comprobar si la cookie 'loggedIn' está presente y es 'true'
  const loggedIn = getCookie("loggedIn") === "true";
  const originalRol = getCookie("rol"); // Rol original del usuario
  let currentRol = getCookie("rolActual") || originalRol; // Rol actual, por defecto el original

  console.log("Estado de loggedIn es:", loggedIn);
  console.log("Rol original:", originalRol);
  console.log("Rol actual:", currentRol);

  // Selecciona el enlace por su ID
  const sgeLink = document.getElementById("SGE-link");

  if (loggedIn) {
    // Generar dinámicamente las opciones del selector según el rol original
    const roleOptions = getRoleOptions(originalRol, currentRol);

    let menuHtml = `
  <div class="d-flex align-items-center">
    <!-- Selector de roles -->
    <div class="role-display bg-light rounded p-2 mr-3" style="border: 1px solid #ddd;">
      <select id="role-selector" class="custom-select custom-select-sm">
        ${roleOptions}
      </select>
    </div>
    <!-- Menú desplegable -->
    <div class="dropdown ml-3">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="userDropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdownMenuButton">
        <a class="dropdown-item" href="/UserInfo">Mi Info</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item text-danger" href="#" onclick="logout()">Cerrar Sesión</a>
      </div>
    </div>
  </div>
`;
    userMenu.innerHTML = menuHtml;

    // Actualiza el enlace principal según el rolActual
    updateLink(sgeLink, currentRol);

    // Evento para manejar cambios de rol dinámicamente
    const roleSelector = document.getElementById("role-selector");
    roleSelector.addEventListener("change", (event) => {
      currentRol = event.target.value;
      document.cookie = `rolActual=${currentRol}; path=/`; // Actualizar cookie del rol actual
      updateLink(sgeLink, currentRol, true); // Redirigir al cambiar el rol
    });
  } else {
    userMenu.innerHTML = `<a href="/logIn" class="btn btn-outline-primary">Iniciar Sesión</a>`;
  }
}

/**
 * Devuelve las opciones del selector dinámicamente según el rol original y el rol actual.
 */
function getRoleOptions(originalRole, currentRole) {
  const roles = {
    administrador: ["administrador", "usuario"],
    colaborador: ["colaborador", "usuario"],
    encargado: ["encargado", "usuario"],
    usuario: ["usuario"],
  };

  const availableRoles = roles[originalRole] || ["usuario"];
  return availableRoles
    .map(
      (role) =>
        `<option value="${role}" ${
          role === currentRole ? "selected" : ""
        }>${capitalize(role)}</option>`
    )
    .join("");
}

function getTargetPath(role) {
  switch (role) {
    case "usuario":
      return "/EventsUser";
    default:
      return "/IndexAdmin";
  }
}

function updateLink(link, role, shouldRedirect = false) {
  const targetPath = getTargetPath(role);
  link.href = targetPath;

  if (shouldRedirect) {
    const currentPath = window.location.pathname;
    if (currentPath !== targetPath) {
      console.log(`Cambiando rol, redirigiendo a: ${targetPath}`);
      window.location.href = targetPath; // Redirigir solo si estamos en una página diferente
    }
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Función para cerrar sesión
function logout() {
  // Eliminar cookies de loggedIn y rol configurando su expiración en el pasado
  document.cookie = "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "rol=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie =
    "rolActual=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.href = "/";
  renderUserMenu();
}

// Llamar a las funciones para cargar el header, el footer, y el menú de usuario cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
  loadHeaderAndUserMenu();
  loadFooter();
});
