// Simulación del proceso de pago con FakePay
function processPayment(movieTitle, amount) {
    // Aquí normalmente se enviarían los datos de pago a la API del proveedor de pagos
    // En este caso, simularemos un pago exitoso
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true });
        }, 2000); // Simulamos un retardo de 2 segundos para procesar el pago
    });
}

// Iniciar el proceso de pago
function initiatePayment(movieTitle, amount) {
    processPayment(movieTitle, amount)
        .then(response => {
            if (response.success) {
                alert(`¡Pago exitoso! Disfruta de "${movieTitle}".`);
                // Aquí actualizarías la API para indicar que el usuario ha comprado la película
            } else {
                alert('El pago ha sido rechazado. Inténtalo nuevamente.');
            }
        })
        .catch(error => {
            alert('Ha ocurrido un error durante el proceso de pago.', error);
        });
}