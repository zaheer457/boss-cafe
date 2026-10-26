document.addEventListener("DOMContentLoaded", () => {
  const checkoutItems = document.getElementById("checkoutItems");
  const checkoutSubTotal = document.getElementById("checkoutSubTotal");
  const checkoutDelivery = document.getElementById("checkoutDelivery");
  const checkoutGrandTotal = document.getElementById("checkoutGrandTotal");
  const checkoutForm = document.getElementById("checkoutForm");

  if (!checkoutItems || !checkoutSubTotal || !checkoutDelivery || !checkoutGrandTotal || !checkoutForm) {
    return;
  }

  const payload = JSON.parse(localStorage.getItem("bossCafeCheckout") || "{}");
  const items = Array.isArray(payload.items) ? payload.items : [];
  const subTotal = Number(payload.subTotal) || 0;
  const deliveryFee = Number(payload.deliveryFee) || 250;
  const grandTotal = Number(payload.grandTotal) || subTotal + deliveryFee;

  const formatPrice = (amount) => `Rs. ${amount.toLocaleString("en-PK")}`;

  if (items.length === 0) {
    checkoutItems.innerHTML = `<p class="text-muted mb-0">No items found. Please add items from menu.</p>`;
  } else {
    items.forEach((item) => {
      const row = document.createElement("div");
      row.className = "d-flex justify-content-between align-items-center border rounded-3 p-2 mb-2";
      row.innerHTML = `
        <div>
          <div class="fw-semibold">${item.name}</div>
          <small class="text-muted">${formatPrice(item.price)} x ${item.qty}</small>
        </div>
        <div class="fw-semibold">${formatPrice(item.price * item.qty)}</div>
      `;
      checkoutItems.appendChild(row);
    });
  }

  checkoutSubTotal.textContent = formatPrice(subTotal);
  checkoutDelivery.textContent = formatPrice(deliveryFee);
  checkoutGrandTotal.textContent = formatPrice(grandTotal);

  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (items.length === 0) {
      alert("Cart is empty. Please add items first.");
      window.location.href = "index.html";
      return;
    }

    const formData = new FormData(checkoutForm);
    const orderDetails = {
      customer: Object.fromEntries(formData.entries()),
      items,
      subTotal,
      deliveryFee,
      grandTotal,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("bossCafeLastOrder", JSON.stringify(orderDetails));
    localStorage.removeItem("bossCafeCart");
    localStorage.removeItem("bossCafeCheckout");

    alert("Order confirmed successfully!");
    window.location.href = "index.html";
  });
});