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
        body: JSON.stringify({ id: 1 }), // Cambiar ID según sea necesario
      });

      if (!response.ok) {
        throw new Error("Error al cargar el material.");
      }

      const material = await response.json();

      // Cargar datos en el formulario
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
          id: idMaterial,
          nombre: nombreInput.value,
          descripcion: descripcionTextarea.value,
          to_give: paraEntregarSelect.value === "true",
          stock: parseInt(cantidadInput.value),
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

        alert("Material actualizado con éxito.");
      } catch (error) {
        console.error("Error al guardar el material:", error);
      }
    });

  document.getElementById("cancelarBtn").addEventListener("click", function () {
    window.history.back();
  });
});
