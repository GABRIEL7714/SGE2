//import { jsPDF } from "jspdf";

let eventoSeleccionado = null;

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
            <td>
            <button class="btn-seleccionar">Seleccionar</button>
          </td>
          `;
        tableBody.appendChild(row);
      }
      const botonesSeleccionar = document.querySelectorAll(".btn-seleccionar");
      botonesSeleccionar.forEach((button, index) => {
        // Asignar el evento de clic para cada botón
        button.onclick = function () {
          seleccionarEvento(eventos[index]); // Pasamos el evento correspondiente
        };
      });
    }
  } catch (error) {
    console.error("Error al obtener los eventos:", error);
    alert("Hubo un error al obtener los eventos.");
  }
}

function seleccionarEvento(evento) {
  // Mostrar detalles del evento

  // Guardar el evento seleccionado en la variable global
  eventoSeleccionado = evento;

  // Obtener el botón de exportar PDF por su ID
  const exportarPdfButton = document.getElementById("exportar-pdf");

  if (exportarPdfButton) {
    // Habilitar el botón de exportar PDF
    exportarPdfButton.disabled = false;
    console.log("Botón habilitado: " + !exportarPdfButton.disabled); // Verifica si el botón está habilitado
  } else {
    console.error("No se encontró el botón de exportar PDF.");
  }
}

async function exportarPDF(eventoSeleccionadoId) {
  try {
    // Hacer la solicitud a la API con el id del evento seleccionado
    const response = await fetch(`http://localhost:5000/getUsersPerEvent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idEvento: eventoSeleccionado.id }),
    });

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error("Error al obtener los usuarios para el evento");
    }

    // Parsear la respuesta JSON
    const data = await response.json();

    // Verificar si la respuesta contiene el array de usuarios
    if (!data.usuarios || data.usuarios.length === 0) {
      console.log("No hay usuarios registrados para este evento.");
      return; // Salimos de la función si no hay usuarios
    }

    // Si hay usuarios, puedes proceder a generar el PDF
    console.log("Usuarios obtenidos:", data.usuarios);

    // Lógica para generar el PDF con los usuarios obtenidos
    /*const { jsPDF } = await import(
      "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js"
    );*/
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF(); // Usar jsPDF.jsPDF() como constructor
    doc.text("Lista de usuarios registrados", 10, 10);

    // Agregar los usuarios al PDF
    data.usuarios.forEach((usuario, index) => {
      doc.text(`${index + 1}. Usuario ID: ${usuario}`, 10, 20 + index * 10);
    });

    // Guardar o mostrar el PDF
    doc.save(`usuarios_evento_${eventoSeleccionadoId}.pdf`);
  } catch (error) {
    console.error("Error al exportar el PDF:", error);
  }
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
