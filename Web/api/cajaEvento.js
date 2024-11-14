document.addEventListener("DOMContentLoaded", function () {
  // Datos simulados de la "base de datos"
  const ingresos = [
    { concepto: "Entradas estudiante", monto: 1100, recibo: "-" },
    { concepto: "Entradas Profesional", monto: 1000, recibo: "-" },
    { concepto: "Entradas Colaborador", monto: 650, recibo: "-" },
  ];

  const egresos = [
    { concepto: "Movilidad", monto: 15, recibo: "-" },
    { concepto: "Hospedaje", monto: 40, recibo: "100502420" },
    { concepto: "Folletos", monto: 25, recibo: "202524021" },
  ];

  // Función para cargar los datos en la tabla de ingresos
  function cargarIngresos() {
    const ingresosBody = document.getElementById("ingresos-body");
    let totalIngresos = 0;

    ingresos.forEach((ingreso) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${ingreso.concepto}</td>
          <td>${ingreso.monto}</td>
          <td>${ingreso.recibo}</td>
        `;
      ingresosBody.appendChild(row);
      totalIngresos += ingreso.monto;
    });

    // Fila del total de ingresos
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `
        <td><strong>Total</strong></td>
        <td><strong>${totalIngresos}</strong></td>
        <td></td>
      `;
    ingresosBody.appendChild(totalRow);
  }
  // Función para cargar los datos en la tabla de egresos
  function cargarEgresos() {
    const egresosBody = document.getElementById("egresos-body");
    let totalEgresos = 0;

    egresos.forEach((egreso) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${egreso.concepto}</td>
          <td>${egreso.monto}</td>
          <td>${egreso.recibo}</td>
        `;
      egresosBody.appendChild(row);
      totalEgresos += egreso.monto;
    });

    // Fila del total de egresos
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `
        <td><strong>Total</strong></td>
        <td><strong>${totalEgresos}</strong></td>
        <td></td>
      `;
    egresosBody.appendChild(totalRow);
  }

  // Llamar a las funciones para cargar los datos
  cargarIngresos();
  cargarEgresos();
});

// script.js

document.getElementById("btnAgregarGasto").addEventListener("click", () => {
  // Define los valores de los atributos
  const id = 0; /*ID*/ // Cambia 'valor1' al valor deseado
  const ineg = 1; // Cambia 'valor2' al valor deseado

  // Redirige a la nueva página con los dos parámetros
  window.location.href = `/IngresoEgreso?id=${encodeURIComponent(
    id
  )}&ineg=${encodeURIComponent(ineg)}`;
});

document.getElementById("btnAgregarIngreso").addEventListener("click", () => {
  // Define los valores de los atributos
  const id = 0; /*ID*/ // Cambia 'valor1' al valor deseado
  const ineg = 0; // Cambia 'valor2' al valor deseado

  // Redirige a la nueva página con los dos parámetros
  window.location.href = `/IngresoEgreso?id=${encodeURIComponent(
    id
  )}&ineg=${encodeURIComponent(ineg)}`;
});
