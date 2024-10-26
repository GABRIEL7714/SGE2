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
      renderUserMenu();
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
  const rol = getCookie("rol");

  console.log("Estado de loggedIn es:", loggedIn);
  console.log("Rol actual:", rol);

  if (loggedIn) {
    let menuHtml = `
      <div class="d-flex align-items-center">
        <div class="role-display bg-light rounded p-2 mr-3" style="border: 1px solid #ddd;">
          <span class="current-role font-weight-bold text-primary">${
            rol || "Usuario"
          }</span>
        </div>
        <button class="btn btn-outline-danger btn-sm" onclick="logout()">Cerrar sesión</button>
      </div>
    `;
    userMenu.innerHTML = menuHtml;
  } else {
    userMenu.innerHTML = `<a href="/logIn" class="btn btn-outline-primary">Iniciar Sesión</a>`;
  }
}

// Función para cerrar sesión
function logout() {
  // Eliminar cookies de loggedIn y rol configurando su expiración en el pasado
  document.cookie = "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "rol=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.href = "/";
  renderUserMenu();
}

// Llamar a las funciones para cargar el header, el footer, y el menú de usuario cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
  loadHeaderAndUserMenu();
  loadFooter();
});
