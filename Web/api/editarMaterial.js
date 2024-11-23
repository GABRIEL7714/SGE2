document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const idMaterial = urlParams.get("id");
  const nombreInput = document.getElementById("nombre");
  const descripcionTextarea = document.getElementById("descripcion");
  const paraEntregarSelect = document.getElementById("paraEntregar");
  const cantidadInput = document.getElementById("cantidad");

  // Simula obtener datos desde una API
  async function fetchMaterial() {
    try {
      const response = await fetch("http://localhost:5000/getMaterialById", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: idMaterial }),
      });

      if (!response.ok) {
        throw new Error("Error al cargar el material.");
      }

      const material = await response.json();

      nombreInput.value = material.nombre;
      descripcionTextarea.value = material.descripcion;
      paraEntregarSelect.value = material.to_give ? "true" : "false";
      cantidadInput.value = material.stock;
    } catch (error) {
      console.error("Error al cargar el material:", error);
    }
  }

  // Llama a la función para cargar el material al inicio
  fetchMaterial();

  // Maneja el botón de guardar
  document
    .getElementById("guardarBtn")
    .addEventListener("click", async function () {
      try {
        const updatedMaterial = {
          id: idMaterial, // Asegúrate de que esta variable esté definida en tu archivo
          nombre: document.getElementById("nombre").value,
          descripcion: document.getElementById("descripcion").value,
          to_give: document.getElementById("paraEntregar").value === "true",
          stock: parseInt(document.getElementById("cantidad").value),
        };

        const response = await fetch("http://localhost:5000/updateMaterial", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedMaterial),
        });

        if (!response.ok) {
          throw new Error("Error al guardar los cambios.");
        }

        // Mostrar el modal en caso de éxito
        const modal = new bootstrap.Modal(
          document.getElementById("successModal")
        );
        modal.show();

        // Redirigir al cerrar el modal
        document
          .getElementById("closeModalBtn")
          .addEventListener("click", () => {
            modal.hide();
            const previousUrl = document.referrer; // Captura la URL de referencia
            if (previousUrl) {
              window.location.href = previousUrl; // Regresa a la página anterior
            } else {
              console.warn(
                "No hay referencia previa, redirigiendo a la página de inicio."
              );
              window.location.href = "/"; // Opcional, redirige a una página de inicio si no hay referrer
            }
          });
      } catch (error) {
        console.error("Error al guardar el material:", error);
      }
    });

  document.getElementById("cancelarBtn").addEventListener("click", function () {
    window.history.back();
  });
});
