//Opciones del carrito
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
//Abrir el carrito
cartIcon.addEventListener("click", function () {
    cart.classList.add("active");
});
// Cerrar el carrito
closeCart.addEventListener("click", function () {
    cart.classList.remove("active");
});

//Cargado
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    // Quitar productos del carrito
    var removeCartButton = document.querySelectorAll(".cart-remove");
    for (var i = 0; i < removeCartButton.length; i++) {
        var button = removeCartButton[i];
        button.addEventListener("click", removeCartItem);
    }
    // Actualizar total del carrito
    var quantityInputs = document.querySelector(".cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    //Agregar al carrito
    var addCart = document.querySelector(".add-cart");
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    //Boton comprar
    document.querySelector(".btn-buy")[0].addEventListener("click", buyButtonClicked);
}

//Boton comprar
function buyButtonClicked() {
    var cartContent = document.querySelector(".cart-content")[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updateCartTotal();
}

// Quitar productos del carrito
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateCartTotal();
}

// Cambio en las cantidades
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

// Para agregar al carrtito
function addCartClicked() {
    var button = event.target;
    var shopItem = button.parentElement;
    var title = shopItem.querySelector(".product-title")[0].innerText;
    var price = shopItem.querySelector(".price")[0].innerText;
    var productImg = shopItem.querySelector(".product-img")[0].src;
    addProductToCart(title, price, productImg);
    updateCartTotal();
}

//Agregar productos al carrito
function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.querySelector(".cart-content")[0];
    var CartItemsNames = cartItems.querySelector(".cart-product-title");
    for (var i = 0; i < CartItemsNames.length; i++) {
        if (CartItemsNames[i].innerText == title) {
            alert("El producto ya esta en el carrito");
            return
        }
    }
}
var cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
        <i class="bx bxs-trash-alt cart-remove"></i>
    </div>
`;
cartShopBox.innerHTML = cartBoxContent;
cartItems.appendChild(cartShopBox);
cartShopBox
    .querySelector("cart-remove")[0]
    .addEventListener("click", removeCartItem);
cartShopBox
    .querySelector("cart-quantity")[0]
    .addEventListener("change", quantityChanged);

//Actualizar total del carrito
function updateCartTotal() {
    var cartContent = document.querySelector(".cart-content")[0];
    var cartBoxes = cartContent.querySelector(".cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var cartBoxPrice = cartBox.querySelector(".cart-price")[0];
        var cartBoxQuantity = cartBox.querySelector(".cart-quantity")[0];
        var quantity = cartBoxQuantity.value;
        var price = parseFloat(cartBoxPrice.innerText.replace("$", ""));
        total = total + price * quantity;
        total = Math.round(total * 100) / 100;
        document.querySelector(".total-price")[0].innerText = "$" + total;
    }
}
