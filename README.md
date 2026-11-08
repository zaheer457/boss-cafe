# Boss Cafe — Food Ordering Frontend

A modern, responsive food ordering web application built with **HTML, CSS, JavaScript, and Bootstrap**. Boss Cafe provides an interactive restaurant menu experience with shopping cart management and a frontend checkout flow powered by browser `localStorage`.

## 🌐 Live Demo

[Visit Boss Cafe](https://zaheer457.github.io/boss-cafe/)

## 📌 Project Overview

Boss Cafe is a static frontend project that demonstrates the core user experience of an online food ordering platform. Users can explore menu categories, add food items to their cart, manage quantities, review order totals, and complete a checkout form.

This project demonstrates practical frontend development skills, including DOM manipulation, JavaScript event handling, responsive UI design, and browser-based data persistence.

## ✨ Features

- **Responsive Menu Interface:** Browse the restaurant menu across desktop, tablet, and mobile devices.
- **Food Categories:** Explore Popular, Appetizer, Salad Bar, Traditional Food, and Burgers sections.
- **Interactive Shopping Cart:** Add menu items and suggested products to the cart.
- **Quantity Management:** Increase or decrease item quantities directly in the cart.
- **Automatic Price Calculation:** View subtotal, fixed delivery charges, and grand total.
- **Checkout Page:** Enter delivery information through a dedicated checkout form.
- **Order Summary:** Review selected items and order totals before confirmation.
- **Local Storage:** Preserve cart and checkout information using browser `localStorage`.
- **WhatsApp Contact:** Access a quick WhatsApp contact option.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Website structure |
| CSS3 | Styling and responsive layouts |
| JavaScript | Cart functionality and interactions |
| Bootstrap 5 | Responsive components and layout |
| Bootstrap Icons | Interface icons |
| Browser localStorage | Cart and checkout data persistence |

## 📂 Project Structure

```text
Mini_project/
├── index.html
├── style.css
├── script.js
├── checkout.html
├── checkout.js
├── Images/
└── bootstrap-5.3.8-dist/
```

## ⚙️ How It Works

1. Open `index.html` and browse the available food items.
2. Add products to the shopping cart using the **ADD** buttons.
3. Cart information is stored in `localStorage` under `bossCafeCart`.
4. Proceed to checkout to save the order summary as `bossCafeCheckout`.
5. Enter delivery details on the checkout page.
6. Confirm the order to save the final payload as `bossCafeLastOrder`.
7. The cart is cleared and the user is redirected back to the menu.

## 🚀 Getting Started

No build tools or package installation are required.

1. Clone the repository:

   ```bash
   git clone https://github.com/zaheer457/boss-cafe.git
   ```

2. Open the project folder:

   ```bash
   cd boss-cafe
   ```

3. Run the project by opening `index.html` in your browser, or use the **Live Server** extension in Visual Studio Code.

## 📝 Project Notes

- This is a frontend-only project; it does not currently use a backend or database.
- Menu items, prices, and contact details are hardcoded.
- Cart and checkout information are stored in the browser using `localStorage`.
- Order confirmation currently uses a browser alert and local storage rather than a real order-processing service.

## 🔮 Future Improvements

- Backend API and database integration for real order processing.
- Dynamic menu and product management.
- User authentication and admin dashboard.
- Online payment gateway integration.
- Functional search and filtering.
- Customer order history.

## 👨‍💻 Author

**Zaheer Asgher**  
Full Stack Web Developer

- **GitHub Project:** [Boss Cafe](https://github.com/zaheer457/boss-cafe)

---

⭐ If you find this project interesting, feel free to explore the live demo!
