document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formRegistro");
    const pasos = document.querySelectorAll(".paso");
    const botonesSiguiente = document.querySelectorAll(".btn-siguiente");
    const progressBar = document.querySelector(".progress-bar")
    const botonesAnterior = document.querySelectorAll(".btn-anterior");
    let pasoActual = 1;

    function actualizarBarraDeProgreso() {
        const progreso = ((pasoActual - 1) / (pasos.length - 1)) * 100;
        console.log(progreso);
        progressBar.style = `width: ${progreso}%`
    }

    function siguientePaso() {
        const campo1Valor = document.getElementById('campo1').value.trim();
        const campo2Valor = document.getElementById('campo2').value.trim();
        if (pasoActual === 1 && (!campo1Valor || !campo2Valor)) {
            alert('Los campos Nombre y Apellidos son obligatorios');
            return;
        }

        const tipoSeleccionado = document.getElementById('campo3').value;
        const campo4 = document.getElementById('campo4');

        if (pasoActual === 2 && tipoSeleccionado === 'dni') {
            const dni = campo4.value;
            if (!validarDNI(dni)) {
                alert('El DNI ingresado no es válido');
                return;
            }
        } else if (pasoActual === 2 && tipoSeleccionado === 'telefono') {
            const telefono = campo4.value;
            if (!validarTelefono(telefono)) {
                alert('El número de teléfono ingresado no es válido');
                return;
            }
        }

        if (pasoActual === 3) {
            const tipoSeleccionado = document.querySelector('input[name="campo5"]:checked');
            const correoValor = document.getElementById('campo6').value.trim();
            if (!tipoSeleccionado) {
                alert('Debe seleccionar un tipo de obra');
                return;
            }
            if (!validarCorreo(correoValor)) {
                alert('El correo electrónico introducido no es válido');
                return;
            }
        }

        

        pasos[pasoActual - 1].style.display = "none";
        pasoActual++;
        if (pasoActual > pasos.length) {
            pasoActual = pasos.length;
        }
        pasos[pasoActual - 1].style.display = "block";
        actualizarBarraDeProgreso();
    }

    function pasoAnterior() {
        pasos[pasoActual - 1].style.display = "none";
        pasoActual--;
        if (pasoActual < 1) {
            pasoActual = 1;
        }
        pasos[pasoActual - 1].style.display = "block";
        actualizarBarraDeProgreso();
    }

    function mostrarPresupuestoTotal(tipoObra) {
        let presupuesto;
        switch (tipoObra) {
            case 'reformaIntegral':
                presupuesto = '7.892€';
                break;
            case 'reformaExterior':
                presupuesto = '5.044,71€';
                break;
            case 'reformaParcial':
                presupuesto = '2.022,99€';
                break;
            default:
                presupuesto = 'No especificado';
        }
        alert('El presupuesto total es: ' + presupuesto);
    }

    function finalizarFormulario() {
        const tipoSeleccionado = document.querySelector('input[name="campo5"]:checked');
        if (!tipoSeleccionado) {
            alert('Debe seleccionar un tipo de obra');
            return;
        }
        const tipoObra = tipoSeleccionado.value;
        mostrarPresupuestoTotal(tipoObra);
        // Aquí podrías enviar el formulario si lo deseas
    }

    function validarDNI(dni) {
        const dniRegex = /^\d{8}[A-Z]$/;
        return dniRegex.test(dni);
    }

    function validarTelefono(telefono) {
        const telefonoRegex = /^\d{9}$/;
        return telefonoRegex.test(telefono);
    }
    
    function validarCorreo(correo) {
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexCorreo.test(correo);
    }


    botonesSiguiente.forEach((boton) => {
        boton.addEventListener("click", siguientePaso);
    });

    botonesAnterior.forEach((boton) => {
        boton.addEventListener("click", pasoAnterior);
    });

    const botonFinalizar = document.querySelector('.btn-siguiente[data-paso="4"]');
    botonFinalizar.addEventListener('click', finalizarFormulario);
    formulario.addEventListener("submit", (e) => e.preventDefault());
});
