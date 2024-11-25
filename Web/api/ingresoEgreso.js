document.addEventListener("DOMContentLoaded", function () {
  // Obtener los parámetros de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const id_evento = parseInt(urlParams.get("id"), 10); // Convertir el id_evento a un número (bigint)
  const ineg = urlParams.get("ineg"); // 0 = ingreso, 1 = egreso

  // Determinar el tipo de transacción (ingreso o egreso)
  const tipo = ineg === "0" ? "ingreso" : "egreso"; // Asignar el tipo según el valor de ineg

  // Evento de clic en el botón de registro
  document
    .getElementById("btnRegistrar")
    .addEventListener("click", async function () {
      // Obtener los valores del formulario
      const concepto = document.getElementById("concepto").value;
      const monto = document.getElementById("monto").value;
      const numRecibo = document.getElementById("numRecibo").value || null; // Si no hay recibo, es null

      // Validación básica de los campos requeridos
      if (!concepto || !monto) {
        alert("Por favor, complete todos los campos obligatorios.");
        return;
      }

      // Crear el objeto de datos a enviar al backend
      const data = {
        concepto,
        id_evento, // Aquí ya es un número (bigint)
        monto: parseFloat(monto), // Convertir el monto a número
        tipo,
        num_recibo: numRecibo, // El número de recibo es opcional
      };

      try {
        // Hacer la solicitud POST para registrar el ingreso o egreso
        const response = await fetch(
          "http://localhost:5000/registrarIngresoEgreso",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
          throw new Error("Error al registrar el ingreso/egreso");
        }

        const result = await response.json();
        console.log(result);
        alert(result.message || "Ingreso/Egreso registrado correctamente.");

        // Opcional: Redirigir a la página anterior o a una vista de confirmación
        const previousUrl = document.referrer;

        if (previousUrl) {
          // Redirige a la página anterior y recarga
          window.location.href = `${previousUrl}`;
        } else {
          alert("No se pudo obtener la URL anterior");
        }
      } catch (error) {
        console.error("Error:", error.message);
        alert("Hubo un error al registrar el ingreso/egreso.");
      }
    });
});
