document.addEventListener("DOMContentLoaded", function () {
  // Obtener los parámetros de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const categoryId = urlParams.get("categoryId");
  const comboId = urlParams.get("comboId");
  const idEvento = urlParams.get("idEvento");

  // Obtener el DNI de las cookies
  const dni = getCookie("DNI");

  // Verificar si el DNI está disponible
  if (!dni) {
    alert("No se ha encontrado el DNI en las cookies. Inicia sesión.");
    return;
  }

  // Obtener el botón de pago
  const payButton = document.getElementById("payButton");

  // Evento de click en el botón de pago
  payButton.addEventListener("click", async function () {
    try {
      // Realizar la solicitud de inscripción
      const response = await fetch("http://localhost:5000/inscribir", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryId,
          comboId,
          idEvento,
          dni, // Pasar el DNI junto con los otros parámetros
        }),
      });

      // Verificar si la respuesta fue exitosa
      if (response.ok) {
        const data = await response.json();
        alert("Inscripción exitosa");
        window.location.href = data.redirect; // Redirigir según lo que el backend devuelva
      } else {
        throw new Error("Error al procesar la inscripción");
      }
    } catch (error) {
      console.error("Error en la inscripción:", error);
      alert("Hubo un problema al procesar la inscripción.");
    }
  });
});

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}
