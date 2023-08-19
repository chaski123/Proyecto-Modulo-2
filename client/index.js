const mercadopago = new MercadoPago("TEST-5d972eb0-b943-412a-a529-42d5652488da", {
    locale: 'es-AR'
})

document.getElementById("checkout-btn").addEventListener('click', function(){
    const orderData ={
        quantity: document.getElementById("quantity").innerHTML,
        description: document.getElementById("product-description").innerHTML,
        price: document.getElementById("unit-price").innerHTML
    };

    fetch("http://localhost:8080/create_preference",{
        method: "POST",
        headers:{
            "Content-type": "application/json"
        },
        body: JSON.stringify(orderData)
    })
    .then(function(response){
        return response.json()
    })
    .then(function(preference){
        createCheckoutButton(preference.id)
    })
    .catch(function(){
        alert('Unexpected error')
    })
})

function createCheckoutButton(preferenceId){
    const bricksBuilder = mercadopago.bricks()

    const renderComponent = async (bricksBuilder) =>{
        if(window.checkoutButton) window.checkoutButton.unmount()
        await bricksBuilder.create(
            "wallet",
            "button-checkout",
            {
                initialization: {
                    preferenceId: preferenceId,
                },
                callbacks: {
                    onError: error => console.error(error),
                    onReady: () => {}
                }
            } 
        )
    }
    window.checkoutButton = renderComponent(bricksBuilder)
}