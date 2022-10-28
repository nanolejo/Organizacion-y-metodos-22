const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const cuil = document.getElementById("cuil");
const antiguedad = document.getElementById("antiguedad");
const sueldobasico = document.getElementById("sueldobasico");
const extras50 = document.getElementById("extras50");
const extras100 = document.getElementById("extras100");
const feriados = document.getElementById("feriados");
const licencia = document.getElementById("licencia");
const licenciapor = document.getElementById("licenciapor");
const faltas = document.getElementById("faltas");

document.addEventListener("keydown", (event) => {
  if (event.keyCode == 13) {
    //Tecla enter
    generar();
  }
});

function generar() {
  let conf = confirm("Esta seguro de los datos ingresados?");
  if (conf == true) {
    const valor_hora = parseInt(sueldobasico.value / 176);
    
    const res_productividad = parseInt(sueldobasico.value / 100) * 10;
    if (faltas.value >= 5) {
      var porc_suma = 0; //valor anterior: 25
    } else {
      var porc_suma = 25 - faltas.value * 5;
    }
    const res_presentismo = parseInt(sueldobasico.value / 100) * porc_suma;
    
    const res_antiguedad = sueldobasico.value / 100 * antiguedad.value;

    const res_feriado = feriados.value * valor_hora * 8;

    const res_licenciapor = licenciapor.value * valor_hora / 100 * 8 ;
    const res_licencia = licencia.value * res_licenciapor ;

    const res_horas50 = Number(valor_hora / 2) * extras50.value;

    const res_horas100 = Number(valor_hora) * extras100.value;

    const res_aguinaldo =
      parseInt(
        Number(res_presentismo) +
          Number(res_productividad) +
          Number(res_horas50) +
          Number(res_horas100)
      ) / 2;

    const res_vacaciones =
      parseInt(
        Number(sueldobasico.value) +
          Number(res_presentismo) +
          Number(res_productividad)
      ) / 2;

    const remuneracionbruta =
      Number(sueldobasico.value) +
      Number(res_productividad) +
      Number(res_presentismo) +
      Number(res_antiguedad) +
      Number(res_horas50) +
      Number(res_horas100);

    const res_sipa = parseInt(remuneracionbruta / 100) * 11;

    const res_inssjp = parseInt(remuneracionbruta / 100) * 3;

    const res_obrasocial = parseInt(remuneracionbruta / 100) * 3;

    const totaldeducciones =
      Number(res_sipa) + Number(res_inssjp) + Number(res_obrasocial);

    const remuneracion_neta = remuneracionbruta - totaldeducciones;

    const resultText = document.getElementById("blankid");
    resultText.innerHTML = `
    <ul class="gap-4">
    <ul class="candara px-2 py-1 border-b-2 min-w-fit text-right">
    <li>${nombre.value}</li>
    <li>${apellido.value}</li>
    <li>${cuil.value}</li>
    </ul>
    </ul>

    <ul class="gap-4">
    <ul class="candara px-2 py-1 border-b-2 min-w-fit text-right">
    <li>$ ${Intl.NumberFormat().format(valor_hora)}</li>
    <li>$ ${Intl.NumberFormat().format(sueldobasico.value)} </li>
    <li>+ $${Intl.NumberFormat().format(res_productividad)}</li>
    <li>+ $${Intl.NumberFormat().format(res_presentismo)}</li>
    <li>+ $${Intl.NumberFormat().format(res_antiguedad)}</li>
    <li>+ $${Intl.NumberFormat().format(res_feriado)}</li>
    <li>+ $${Intl.NumberFormat().format(res_licencia)}</li>
    <li>+ $${Intl.NumberFormat().format(res_horas50)}</li>
    <li>+ $${Intl.NumberFormat().format(res_horas100)}</li>
    </ul>
    </ul>

    <ul class="gap-4">
    <ul class="candara px-2 py-1 border-b-2 min-w-fit text-right">
    <li>- $${Intl.NumberFormat().format(res_sipa)}</li>
    <li>- $${Intl.NumberFormat().format(res_inssjp)}</li>
    <li>- $${Intl.NumberFormat().format(res_obrasocial)}</li>
    <li> ${faltas.value}</li>
    </ul>
    </ul>

    <ul class="gap-4">
    <ul class="candara px-2 py-1 border-b-2 min-w-fit text-right">
    <li>+ $${Intl.NumberFormat().format(res_aguinaldo)}</li>
    <li>+ $${Intl.NumberFormat().format(res_vacaciones)}</li>
    </ul>
    </ul>

    <ul class="gap-4">
    <ul class="candara px-2 py-1 min-w-fit text-right">
    <li>$${Intl.NumberFormat().format(remuneracionbruta)}</li>
    <li>$${Intl.NumberFormat().format(totaldeducciones)}</li>
    <li>$${Intl.NumberFormat().format(remuneracion_neta)}</li>
    </ul>
    </ul>
      `;
  }
}
