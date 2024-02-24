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
        progressBar.style.width = `${progreso}%`;
    }

    function siguientePaso() {
        if (pasoActual === 1) {
            const campo1Valor = document.getElementById('campo1').value.trim();
            const campo2Valor = document.getElementById('campo2').value.trim();
            if (!campo1Valor || !campo2Valor) {
                alert('Los campos Nombre y Apellidos son obligatorios');
                return;
            }
        } else if (pasoActual === 2) {
            const tipoSeleccionado = document.getElementById('campo3').value;
            const campo4 = document.getElementById('campo4');
            if (tipoSeleccionado === 'dni') {
                const dni = campo4.value;
                if (!validarDNI(dni)) {
                    alert('El DNI ingresado no es válido');
                    return;
                }
            } else if (tipoSeleccionado === 'telefono') {
                const telefono = campo4.value;
                if (!validarTelefono(telefono)) {
                    alert('El número de teléfono ingresado no es válido');
                    return;
                }
            }
        } else if (pasoActual === 3) {
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
        } else if (pasoActual === 4) {
            const tipoPagoSeleccionado = document.getElementById('campo7').value;
            if (!tipoPagoSeleccionado) {
                alert('Debe seleccionar un tipo de pago');
                return;
            }
            const imagenSeleccionada = document.querySelector('input[name="campo8"]:checked');
            if (!imagenSeleccionada) {
            alert('Debe seleccionar un tipo de acabado');
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

    function mostrarPresupuestoTotal(tipoObra, tipoPago) {
        let presupuesto;
        switch (tipoObra) {
            case 'reformaIntegral':
                presupuesto = 7892;
                break;
            case 'reformaExterior':
                presupuesto = 5044.71;
                break;
            case 'reformaParcial':
                presupuesto = 2022.99;
                break;
            default:
                presupuesto = 0;
        }
        if (tipoPago === 'paypal') {
            presupuesto *= 1.05; 
        } else if (tipoPago === 'tarjeta') {
            presupuesto *= 1.11; 
        }
        alert('El presupuesto total es: ' + presupuesto.toFixed(2) + '€');
    }
    

    function finalizarFormulario() {
        const tipoSeleccionado = document.querySelector('input[name="campo5"]:checked');
        if (!tipoSeleccionado) {
            alert('Debe seleccionar un tipo de obra');
            return;
        }
        const tipoObra = tipoSeleccionado.value;
        
        const tipoPagoSeleccionado = document.getElementById('campo7').value;
        if (!tipoPagoSeleccionado) {
            alert('Debe seleccionar un tipo de pago');
            return;
        }
        
        mostrarPresupuestoTotal(tipoObra, tipoPagoSeleccionado);
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

    const botonFinalizar = document.querySelector('.btn-siguiente[data-paso="5"]');
    botonFinalizar.addEventListener('click', finalizarFormulario);
    formulario.addEventListener("submit", (e) => e.preventDefault());
});
