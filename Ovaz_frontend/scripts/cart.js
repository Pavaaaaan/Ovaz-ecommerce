document.addEventListener("DOMContentLoaded", function() {
    let cart = [];
    try {
        const cartData = sessionStorage.getItem("ovazCart");
        if (cartData) {
            cart = JSON.parse(cartData);
            if (!Array.isArray(cart)) {
                console.error("Cart data is not an array, resetting");
                cart = [];
            }
        }
    } catch (e) {
        console.error("Error parsing cart data:", e);
        cart = [];
    }

    const cartContainer = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p class='empty-cart'>Your cart is empty.</p>";
        if (cartTotal) cartTotal.textContent = "";
        return;
    }

    let totalPrice = 0;
    cartContainer.innerHTML = "";
    
    cart.forEach((item, index) => {
        const itemPrice = (item.price || 0) * (item.quantity || 1);
        totalPrice += itemPrice;

        const itemElement = document.createElement("div");
        itemElement.className = "cart-item";
        itemElement.innerHTML = `
            <img src="${item.image || 'placeholder.jpg'}" alt="${item.name || 'Product'}">
            <div class="cart-details">
                <p><strong>${item.name || 'Unknown Product'}</strong></p>
                <p>Quantity: ${item.quantity || 1}</p>
                <p>Price: Rs ${itemPrice.toFixed(2)}</p>
                <button class="remove-btn" data-index="${index}">Remove</button>
            </div>
        `;
        cartContainer.appendChild(itemElement);
    });

    cartTotal.textContent = `Total: Rs ${totalPrice.toFixed(2)}`;

    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", function() {
            const index = parseInt(this.getAttribute("data-index"));
            cart.splice(index, 1);
            sessionStorage.setItem("ovazCart", JSON.stringify(cart));
            location.reload();
        });
    });
});