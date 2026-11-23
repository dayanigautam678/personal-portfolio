
const products = [
    { id: 1, name: "Wireless Headphones", price: 1499 },
    { id: 2, name: "Smart Watch", price: 2499 },
    { id: 3, name: "Running Shoes", price: 1999 },
    { id: 4, name: "Backpack", price: 999 }
];

let cart = [];

const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");
const searchInput = document.getElementById("searchInput");

document.querySelectorAll(".add-btn").forEach(function(button) {
    button.addEventListener("click", function() {
        const productId = Number(button.dataset.id);

        const existingProduct = cart.find(function(item) {
            return item.id === productId;
        });

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            const product = products.find(function(item) {
                return item.id === productId;
            });

            cart.push({
                ...product,
                quantity: 1
            });
        }

        updateCart();
    });
});

function removeFromCart(productId) {
    const product = cart.find(function(item) {
        return item.id === productId;
    });

    if (product.quantity > 1) {
        product.quantity--;
    } else {
        cart = cart.filter(function(item) {
            return item.id !== productId;
        });
    }

    updateCart();
}

function updateCart() {
    let count = 0;
    let total = 0;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    }

    cart.forEach(function(item) {
        count += item.quantity;
        total += item.price * item.quantity;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        const details = document.createElement("p");
        details.textContent = `${item.name} × ${item.quantity} — ₹${item.price * item.quantity}`;

        const removeButton = document.createElement("button");
        removeButton.className = "remove-btn";
        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", function() {
            removeFromCart(item.id);
        });

        cartItem.append(details, removeButton);
        cartItems.appendChild(cartItem);
    });

    cartCount.textContent = count;
    totalPrice.textContent = total.toLocaleString("en-IN");
}

searchInput.addEventListener("input", function() {
    const searchValue = searchInput.value.toLowerCase();

    document.querySelectorAll(".product-card").forEach(function(card) {
        const productName = card.dataset.name.toLowerCase();

        card.style.display = productName.includes(searchValue)
            ? "block"
            : "none";
    });
});

updateCart();
