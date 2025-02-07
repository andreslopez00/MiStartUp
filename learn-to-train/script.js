document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript cargado correctamente.");
});

// Calculadora de Macros
function calcularMacros() {
    let peso = document.getElementById('peso').value;
    let objetivo = document.getElementById('objetivo').value;
    let proteinas, carbohidratos, grasas;

    if (objetivo === "volumen") {
        proteinas = peso * 2.2;
        carbohidratos = peso * 4;
        grasas = peso * 1;
    } else if (objetivo === "definicion") {
        proteinas = peso * 2.5;
        carbohidratos = peso * 2;
        grasas = peso * 0.8;
    } else {
        proteinas = peso * 2;
        carbohidratos = peso * 3;
        grasas = peso * 1;
    }

    document.getElementById('resultadoMacros').innerHTML = `
        <p><strong>Proteínas:</strong> ${proteinas.toFixed(1)}g</p>
        <p><strong>Carbohidratos:</strong> ${carbohidratos.toFixed(1)}g</p>
        <p><strong>Grasas:</strong> ${grasas.toFixed(1)}g</p>
    `;
}

// Calculadora de 1RM
function calcular1RM() {
    let peso = document.getElementById('pesoLevantado').value;
    let reps = document.getElementById('repeticiones').value;
    let rm = peso / (1.0278 - (0.0278 * reps));
    document.getElementById('resultadoRM').innerHTML = `<p><strong>1RM estimado:</strong> ${rm.toFixed(1)} kg</p>`;
}

// Seguimiento de Progreso
function guardarProgreso() {
    let peso = document.getElementById('pesoActual').value;
    let medidas = document.getElementById('medidas').value;
    let registro = document.getElementById('registroProgreso');
    let fecha = new Date().toLocaleDateString();

    registro.innerHTML = `<p><strong>Fecha:</strong> ${fecha}</p>
                          <p><strong>Peso:</strong> ${peso} kg</p>
                          <p><strong>Medidas:</strong> ${medidas}</p>`;
}

// Variables globales
let cart = [];
let cartCount = 0;
let cartTotal = 0;

// Función para actualizar el carrito
function updateCart() {
    // Actualiza el número de productos en el carrito
    document.getElementById('cart-count').textContent = cartCount;

    // Actualiza el total
    document.getElementById('cart-total').textContent = cartTotal.toFixed(2);

    // Muestra los productos del carrito en el modal
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';  // Limpiar los elementos anteriores
    cart.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
    });
}

// Función para agregar productos al carrito
function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    cartCount++;
    cartTotal += productPrice;
    updateCart();
}

// Agregar evento a los botones "Comprar"
document.querySelectorAll('.btn-success').forEach((button, index) => {
    button.addEventListener('click', () => {
        // Datos del producto (esto puede mejorarse dinámicamente)
        const productName = button.closest('.card').querySelector('.card-title').textContent;
        const productPrice = parseFloat(button.closest('.card').querySelector('.card-text').textContent.replace('$', ''));

        addToCart(productName, productPrice);
    });
});

// Función de checkout (puedes integrarla con un sistema de pago real)
document.getElementById('checkout-btn').addEventListener('click', () => {
    alert('Gracias por tu compra!');
    cart = []; // Vaciar carrito
    cartCount = 0;
    cartTotal = 0;
    updateCart();
});
