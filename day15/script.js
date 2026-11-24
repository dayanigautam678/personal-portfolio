
const products = [
    { id: 1, name: "Wireless Headphones", price: 1499 },
    { id: 2, name: "Smart Watch", price: 2499 },
    { id: 3, name: "Running Shoes", price: 1999 },
    { id: 4, name: "Backpack", price: 999 }
];

let cart = [];

document.querySelectorAll(".add-btn").forEach(button => {
    button.addEventListener("click", () => {
        const productId = Number(button.dataset.id);
        const product = products.find(item => item.id === productId);

        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        updateCart();

        button.textContent = "Added ✓";
        setTimeout(() => {
            button.textContent = "Add to Cart";
        }, 800);
    });
});

function updateCart() {
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const totalPrice = document.getElementById("totalPrice");

    cartItems.innerHTML = "";

    let count = 0;
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    }

    cart.forEach(item => {
        count += item.quantity;
        total += item.price * item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <span>${item.name} × ${item.quantity}</span>
                <strong>₹${item.price * item.quantity}</strong>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
    });

    cartCount.textContent = count;
    totalPrice.textContent = total.toLocaleString("en-IN");
}

function removeFromCart(id) {
    const item = cart.find(product => product.id === id);

    if (item) {
        item.quantity--;

        if (item.quantity === 0) {
            cart = cart.filter(product => product.id !== id);
        }
    }

    updateCart();
}

document.getElementById("searchInput").addEventListener("input", function() {
    const search = this.value.toLowerCase();

    document.querySelectorAll(".product-card").forEach(card => {
        const name = card.dataset.name.toLowerCase();
        card.style.display = name.includes(search) ? "" : "none";
    });
});
