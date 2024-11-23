async function filtrarDatos() {
  const tipo = document.querySelector("#tipo").value;
  const fecha = document.querySelector("#fecha").value;

  try {
    const response = await fetch("http://localhost:5000/getReports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ tipo, fecha }), // Convertir datos a JSON
    });
    //alert("entre aqui1");

    if (!response.ok) {
      throw new Error("Error en la consulta.");
    }

    //alert("entre aqui2");
    const eventos = await response.json();
    //alert(JSON.stringify(eventos)); // Muestra el objeto en formato JSON legible

    // Mostrar resultados en una alerta
    if (eventos.length === 0) {
      alert("No se encontraron eventos.");
    } else {
      const tableBody = document.getElementById("report-table-body");
      tableBody.innerHTML = ""; // Limpiar el contenido existente
      console.log(eventos);

      for (const evento of eventos) {
        const idEvento = evento.id;
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${evento.nombre}</td>
            <td>${evento.tipo}</td>
            <td>${evento.fechainicio}</td>
            <td>${evento.fechafin}</td>
            <td><button class="btn-seleccionar" onclick="seleccionarEvento(${encodeURIComponent(
              JSON.stringify(evento)
            )})">Seleccionar</button></td>
          `;
        tableBody.appendChild(row);
      }
    }
  } catch (error) {
    console.error("Error al obtener los eventos:", error);
    alert("Hubo un error al obtener los eventos.");
  }
}

function seleccionarEvento(evento) {
  // Decodifica el objeto evento seleccionado
  eventoSeleccionado = JSON.parse(decodeURIComponent(evento));
  console.log("Evento seleccionado:", eventoSeleccionado);

  // Habilitar el botón de exportar PDF
  document.getElementById("exportar-pdf").disabled = false;
}

async function exportarPDF() {
  if (!eventoSeleccionado) {
    alert("No se ha seleccionado ningún evento.");
    return;
  }

  const { jsPDF } = window.jspdf; // Asegúrate de tener jsPDF cargado
  const doc = new jsPDF();

  // Título del reporte
  doc.text("Detalle del Evento Seleccionado", 10, 10);

  // Agregar información del evento
  doc.text(`Nombre: ${eventoSeleccionado.nombre}`, 10, 20);
  doc.text(`Tipo: ${eventoSeleccionado.tipo}`, 10, 30);
  doc.text(`Inicio: ${eventoSeleccionado.fechainicio}`, 10, 40);
  doc.text(`Fin: ${eventoSeleccionado.fechafin}`, 10, 50);

  // Descargar el archivo
  doc.save(`evento-${eventoSeleccionado.nombre}.pdf`);
}

document.querySelector("#filtrar").onclick = filtrarDatos;
document.querySelector("#exportar-pdf").onclick = exportarPDF;

/*
document.addEventListener("DOMContentLoaded", async function () {
    try {
      const responseEvents = await fetch("http://localhost:5000/getReports");
      const eventos = await responseEvents.json();
  
      const tableBody = document.getElementById("report-table-body");
      tableBody.innerHTML = ""; // Limpiar el contenido existente
  
      console.log(eventos);
  
      // Usamos un bucle para procesar cada evento
      for (const evento of eventos) {
        const idEvento = evento.id;
  
        // Hacemos la solicitud para obtener el número de eventos
        console.log("SI ENTRA ANTES DEL FETCH");
        const responseActivities = await fetch(
          "http://localhost:5000/getNumberEventActivities",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ idEvento }),
          }
        )
  
        let numberOfActivities = 0; // Inicializamos en 0
        if (!responseActivities.ok) {
          // Manejo de error
          console.error(
            "Error al obtener el número de actividades para el evento:",
            idEvento
          );
        } else {
          const data = await responseActivities.json(); // Extraemos el número de actividades
          numberOfActivities = data.data; // Asignamos el número de actividades
          console.log(data.data);
        }
  
        // Crear una nueva fila para la tabla
        const row = document.createElement("tr");
  
        row.innerHTML = `
          <td>${evento.nombre}</td>
          <td>${evento.tipo}</td>
          <td>${evento.fechainicio}</td>
          <td>${evento.fechafin}</td>
        `;
        tableBody.appendChild(row);
      }
    } catch (error) {
      console.error("Error al manejar los eventos:", error);
    }
  });
*/
