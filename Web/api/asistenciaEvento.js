document.addEventListener("DOMContentLoaded", async function () {
  const cameraSelect = document.getElementById("camera-select");
  const qrReader = new Html5Qrcode("qr-reader");
  const urlParams = new URLSearchParams(window.location.search);
  const idEvento = urlParams.get("id");
  // Función para manejar el envío de asistencia
  async function registrarAsistencia(documento) {
    try {
      const response = await fetch(
        "http://localhost:5000/registrarAsistencia",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            numerodoc: documento,
            idEvento: idEvento,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("Asistencia registrada:", result);
        document.getElementById(
          "result"
        ).innerText = `Asistencia registrada para el documento: ${documento}`;

        // Mostrar el modal con el mensaje de éxito
        const userInfo = document.getElementById("user-info");
        userInfo.innerText = `Asistencia registrada con éxito para el documento: ${documento}`;

        // Mostrar el modal usando Bootstrap
        const modal = new bootstrap.Modal(document.getElementById("userModal"));
        modal.show();

        // Agregar un evento para cuando se cierre el modal
        const closeButton = document.querySelector("#userModal .btn-close");
        closeButton.addEventListener("click", () => {
          // Ocultar el modal y limpiar el fondo gris
          modal.hide();
          // Restablecer el contenido y eliminar cualquier texto residual
          document.getElementById("result").innerText =
            "Esperando escanear QR...";
        });

        // Opcional: Cerrar modal cuando se hace clic fuera del modal
        const modalBackdrop = document.querySelector(".modal-backdrop");
        if (modalBackdrop) {
          modalBackdrop.addEventListener("click", () => {
            modal.hide();
            document.getElementById("result").innerText =
              "Esperando escanear QR...";
          });
        }
      } else {
        console.error("Error al registrar asistencia:", result);
        document.getElementById(
          "result"
        ).innerText = `Error al registrar asistencia: ${
          result.message || "Intente nuevamente"
        }`;
      }
    } catch (error) {
      console.error("Error al comunicarse con el servidor:", error);
      document.getElementById("result").innerText =
        "Error al registrar asistencia. Revise su conexión.";
    }
  }

  // Asegúrate de que el modal se cierre correctamente cuando el evento de cerrar se active.
  document.addEventListener("hidden.bs.modal", function (event) {
    // Elimina el backdrop del modal y restablece la página.
    const modalBackdrop = document.querySelector(".modal-backdrop");
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
  });

  function startScanner(cameraId) {
    qrReader
      .start(
        cameraId,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          console.log(`Código QR leído: ${decodedText}`);
          document.getElementById(
            "result"
          ).innerText = `Documento: ${decodedText}`;

          // Llamada a la función para registrar asistencia
          registrarAsistencia(decodedText);
        },
        (error) => {
          console.warn(`Error al leer QR: ${error}`);
        }
      )
      .catch((err) => {
        console.error("Error inicializando el escáner:", err);
      });
  }

  Html5Qrcode.getCameras()
    .then((cameras) => {
      if (cameras.length > 0) {
        cameras.forEach((camera) => {
          const option = document.createElement("option");
          option.value = camera.id;
          option.text = camera.label || `Cámara ${camera.id}`;
          cameraSelect.appendChild(option);
        });

        cameraSelect.addEventListener("change", () => {
          qrReader.stop().then(() => {
            startScanner(cameraSelect.value);
          });
        });

        startScanner(cameras[0].id);
      } else {
        alert("No se encontraron cámaras.");
      }
    })
    .catch((err) => {
      console.error("Error al obtener cámaras:", err);
      document.getElementById("result").innerText =
        "Error: No se pudieron detectar cámaras.";
    });
});
