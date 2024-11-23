document.addEventListener("DOMContentLoaded", async function () {
  try {
    const numerodoc = getCookie("DNI");

    const response = await fetch("http://localhost:5000/getUserByNumeroDoc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ numerodoc }),
    });

    const usuario = await response.json();
    console.log(usuario);
    document.getElementById("tipo-documento").textContent = usuario[0].tipodoc;
    document.getElementById("numero-documento").textContent = numerodoc;
    document.getElementById("nombre").textContent = usuario[0].nombre;
    document.getElementById("apellido").textContent = usuario[0].apellido;
    document.getElementById("correo").textContent = usuario[0].correo;
    document.getElementById("telefono").textContent = usuario[0].telefono;
    const qrCodeImage = document.getElementById("qr-code");
    qrCodeImage.src = usuario[0].qr;
  } catch (error) {
    console.error("Error al manejar los eventos:", error);
  }
});

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
