document.getElementById('a2').style.display = "none";
setTimeout(function () {
  document.getElementById('a1').style.display = "none";
  document.getElementById('a2').style.display = "block";
}, 1500)


document.getElementById("contact-form").addEventListener("submit", function(event) {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var subject = document.getElementById("subject").value;
  var message = document.getElementById("message").value;

  // Check for empty fields
  if (!name || !email || !subject || !message) {
      alert("Please fill out all the fields.");
      event.preventDefault();
  }
});

   // Sample product data
   const products = [
    { id: 1, name: "High-Speed Blender", price: 79.99, image: "https://via.placeholder.com/300x200?text=Blender" },
    { id: 2, name: "Non-Stick Cookware Set", price: 129.99, image: "https://via.placeholder.com/300x200?text=Cookware+Set" },
    { id: 3, name: "Stainless Steel Cutlery Set", price: 49.99, image: "https://via.placeholder.com/300x200?text=Cutlery+Set" },
    { id: 4, name: "Baking Dish", price: 29.99, image: "https://via.placeholder.com/300x200?text=Baking+Dish" },
    { id: 5, name: "Kitchen Knife Set", price: 89.99, image: "https://via.placeholder.com/300x200?text=Knife+Set" },
    { id: 6, name: "Toaster", price: 39.99, image: "https://via.placeholder.com/300x200?text=Toaster" }
];

// Cart state
let cart = [];

// Load products
const productList = document.getElementById("product-list");
products.forEach(product => {
    const card = `
        <div class="col">
            <div class="card h-100 shadow-sm">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="text-primary fw-bold">$${product.price.toFixed(2)}</p>
                    <button class="btn btn-warning w-100 add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
    productList.innerHTML += card;
});

// Add to cart functionality
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
        const productId = parseInt(e.target.getAttribute("data-id"));
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            const product = products.find(p => p.id === productId);
            cart.push({ ...product, quantity: 1 });
        }

        updateCart();
        document.getElementById("go-to-cart").style.display = "block";
    }
});

// Update cart display
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = cart.map(item => `
        <div class="d-flex justify-content-between align-items-center mb-2">
            <span>${item.name} (${item.quantity})</span>
            <div>
                <button class="btn btn-sm btn-outline-secondary decrease-quantity" data-id="${item.id}">-</button>
                <button class="btn btn-sm btn-outline-secondary increase-quantity" data-id="${item.id}">+</button>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        </div>
    `).join("");

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Change quantity
document.addEventListener("click", (e) => {
    const productId = parseInt(e.target.getAttribute("data-id"));
    const item = cart.find(item => item.id === productId);

    if (e.target.classList.contains("increase-quantity")) {
        item.quantity++;
    }

    if (e.target.classList.contains("decrease-quantity") && item.quantity > 1) {
        item.quantity--;
    } else if (e.target.classList.contains("decrease-quantity") && item.quantity === 1) {
        cart = cart.filter(item => item.id !== productId);
    }

    updateCart();

    if (cart.length === 0) {
        document.getElementById("go-to-cart").style.display = "none";
    }
});

// Clear cart
document.getElement
// Clear cart button functionality
document.getElementById("clear-cart").addEventListener("click", () => {
    cart = []; // Reset cart
    updateCart();
    document.getElementById("go-to-cart").style.display = "none";
});

// "Go to Cart" button opens the cart modal
document.getElementById("go-to-cart").addEventListener("click", () => {
    const cartModal = new bootstrap.Modal(document.getElementById("cartModal"));
    cartModal.show();
});

// Checkout button functionality
document.getElementById("checkout-btn").addEventListener("click", () => {
    if (cart.length > 0) {
        alert("Thank you for your purchase! Your items are on the way.");
        cart = [];
        updateCart();
        document.getElementById("go-to-cart").style.display = "none";
        const cartModal = bootstrap.Modal.getInstance(document.getElementById("cartModal"));
        cartModal.hide();
    } else {
        alert("Your cart is empty.");
    }
});