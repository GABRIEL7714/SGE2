document
  .getElementById("materialForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const id_ambiente = urlParams.get("id");
    // Obtén los valores de los campos del formulario
    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;
    const to_give = document.getElementById("paraEntregar").value === "true";
    const stock = parseInt(document.getElementById("cantidad").value);

    // Validación básica
    if (!nombre || !descripcion || isNaN(stock)) {
      alert("Por favor, llena todos los campos correctamente.");
      return;
    }

    // Envía los datos al servidor usando fetch
    try {
      const res = await fetch("http://localhost:5000/createMaterial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          descripcion,
          stock,
          to_give,
          id_ambiente,
        }),
      });

      if (!res.ok) {
        alert("Error al guardar el material.");
        return;
      }

      // Si la respuesta es exitosa, muestra un modal de éxito
      const modalExito = new bootstrap.Modal(
        document.getElementById("modalExito")
      );
      modalExito.show();

      // Redirige a la página anterior después de 2 segundos
      setTimeout(() => {
        const previousUrl = document.referrer; // Captura la URL de referencia
        if (previousUrl) {
          window.location.href = previousUrl; // Regresa a la página anterior
        } else {
          console.warn(
            "No hay referencia previa, redirigiendo a la página de inicio."
          );
          window.location.href = "/"; // Opcional, redirige a una página de inicio si no hay referrer
        }
      }, 2000);
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Ocurrió un error al guardar el material.");
    }
  });

// Botón Cancelar: regresa a la página anterior
document.getElementById("cancelarBtn").addEventListener("click", () => {
  window.history.back();
});
