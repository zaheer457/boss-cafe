document.addEventListener("DOMContentLoaded", () => {
  const addButtons = document.querySelectorAll(".desc-card-btn");
  const popularCards = document.querySelectorAll(".food-card");
  const cartCount = document.getElementById("cartCount");
  const cartItemsCount = document.getElementById("cartItemsCount");
  const cartTotal = document.getElementById("cartTotal");
  const cartItems = document.getElementById("cartItems");
  const emptyCartState = document.getElementById("emptyCartState");
  const cartSuggestions = document.getElementById("cartSuggestions");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const deliveryFee = 250;
  const cartStorageKey = "bossCafeCart";

  if (!cartCount || !cartItemsCount || !cartTotal || !cartItems || !emptyCartState || !checkoutBtn || !cartSuggestions) {
    return;
  }

  const cart = new Map(
    JSON.parse(localStorage.getItem(cartStorageKey) || "[]")
  );

  const parsePrice = (priceText) => {
    const matches = priceText.match(/Rs\.\s*(\d+)/g);
    if (!matches || matches.length === 0) {
      return 0;
    }

    const finalPrice = matches[matches.length - 1].replace(/[^\d]/g, "");
    return Number(finalPrice) || 0;
  };

  const formatPrice = (amount) => `Rs. ${amount.toLocaleString("en-PK")}`;

  const showCartDrawer = () => {
    const drawerElement = document.getElementById("cartDrawer");
    if (drawerElement && window.bootstrap?.Offcanvas) {
      const drawer = bootstrap.Offcanvas.getOrCreateInstance(drawerElement);
      drawer.show();
    }
  };

  const saveCart = () => {
    localStorage.setItem(cartStorageKey, JSON.stringify([...cart.entries()]));
  };

  const getCartSummary = () => {
    let totalItems = 0;
    let subTotal = 0;

    cart.forEach((item) => {
      totalItems += item.qty;
      subTotal += item.price * item.qty;
    });

    const grandTotal = totalItems > 0 ? subTotal + deliveryFee : 0;
    return { totalItems, subTotal, grandTotal };
  };

  const renderCart = () => {
    cartItems.innerHTML = "";

    cart.forEach((item) => {
      const row = document.createElement("div");
      row.className = "list-group-item cart-item-row d-flex justify-content-between align-items-center gap-2";
      row.innerHTML = `
        <div>
          <div class="cart-item-title">${item.name}</div>
          <small class="cart-item-price">${formatPrice(item.price)}</small>
        </div>
        <div class="cart-qty-control">
          <button class="cart-qty-btn" data-action="decrease" data-item="${item.name}" type="button">-</button>
          <span class="cart-qty-value">${item.qty}</span>
          <button class="cart-qty-btn" data-action="increase" data-item="${item.name}" type="button">+</button>
        </div>
      `;
      cartItems.appendChild(row);
    });

    const { totalItems, grandTotal } = getCartSummary();
    cartCount.textContent = String(totalItems);
    cartItemsCount.textContent = String(totalItems);
    cartTotal.textContent = formatPrice(grandTotal);
    checkoutBtn.disabled = totalItems === 0;
    checkoutBtn.classList.toggle("disabled", totalItems === 0);
    emptyCartState.classList.toggle("d-none", totalItems > 0);
    saveCart();
  };

  const renderSuggestions = () => {
    cartSuggestions.innerHTML = "";

    const suggestions = [...popularCards].slice(0, 3).map((card) => {
      const name = card.querySelector(".food-title")?.textContent?.trim() || "Item";
      const priceText = card.querySelector(".price-pill")?.textContent || "";
      const price = parsePrice(priceText);
      const img = card.querySelector("img");
      const imageSrc = img?.getAttribute("src") || "";
      const imageAlt = img?.getAttribute("alt") || name;
      return { name, price, imageSrc, imageAlt };
    });

    suggestions.forEach((item) => {
      const card = document.createElement("div");
      card.className = "suggestion-card";
      card.innerHTML = `
        <div class="suggestion-img-wrap">
          <img class="suggestion-img" src="${item.imageSrc}" alt="${item.imageAlt}">
          <button type="button" class="suggestion-add-btn" data-name="${item.name}" data-price="${item.price}">+</button>
        </div>
        <div class="suggestion-name">${item.name}</div>
        <div class="suggestion-price">${formatPrice(item.price)}</div>
      `;
      cartSuggestions.appendChild(card);
    });
  };

  const addItemToCart = (name, price) => {
    if (!name || !price) {
      return;
    }

    if (cart.has(name)) {
      cart.get(name).qty += 1;
    } else {
      cart.set(name, { name, price, qty: 1 });
    }

    renderCart();
    showCartDrawer();
  };

  const registerCardAdds = (elements, getName, getPriceText) => {
    elements.forEach((element) => {
      element.addEventListener("click", () => {
        const name = getName(element);
        const price = parsePrice(getPriceText(element));
        addItemToCart(name, price);
      });
    });
  };

  registerCardAdds(
    addButtons,
    (button) =>
      button.closest(".card-body")?.querySelector(".desc-card-title")?.textContent?.trim() || "Item",
    (button) =>
      button.closest(".card-body")?.querySelector(".desc-card-price")?.textContent || ""
  );

  registerCardAdds(
    popularCards,
    (card) => card.querySelector(".food-title")?.textContent?.trim() || "Item",
    (card) => card.querySelector(".price-pill")?.textContent || ""
  );

  cartItems.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (!target.classList.contains("cart-qty-btn")) {
      return;
    }

    const action = target.dataset.action;
    const itemName = target.dataset.item;

    if (!action || !itemName || !cart.has(itemName)) {
      return;
    }

    const item = cart.get(itemName);

    if (action === "increase") {
      item.qty += 1;
    } else if (action === "decrease") {
      item.qty -= 1;
      if (item.qty <= 0) {
        cart.delete(itemName);
      }
    }

    renderCart();
  });

  cartSuggestions.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (!target.classList.contains("suggestion-add-btn")) {
      return;
    }

    const name = target.dataset.name || "";
    const price = Number(target.dataset.price) || 0;
    addItemToCart(name, price);
  });

  checkoutBtn.addEventListener("click", () => {
    const { totalItems, subTotal, grandTotal } = getCartSummary();
    if (totalItems === 0) {
      return;
    }

    localStorage.setItem(
      "bossCafeCheckout",
      JSON.stringify({
        items: [...cart.values()],
        totalItems,
        subTotal,
        deliveryFee,
        grandTotal,
      })
    );

    window.location.href = "checkout.html";
  });

  renderSuggestions();
  renderCart();
});