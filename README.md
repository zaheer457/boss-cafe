# Boss Cafe - Food Ordering Frontend

A responsive food ordering web app built with HTML, CSS, JavaScript, and Bootstrap.  
This project showcases a restaurant menu UI with cart management and a checkout flow using browser localStorage.

## Project Overview
Boss Cafe is a static frontend project for online food ordering. Users can browse menu categories, add items to cart, update quantities, view totals with delivery charges, and submit checkout details.

The project is ideal for:
- Frontend practice (DOM, events, localStorage)
- UI/UX portfolio showcase
- Base template for a restaurant ordering system

## Features
- Responsive landing/menu page (`index.html`)
- Category-based menu sections (Popular, Appetizer, Salad Bar, Traditional Food, Burgers)
- Off-canvas shopping cart drawer
- Add-to-cart from menu cards and suggestion cards
- Increase/decrease item quantity in cart
- Auto-calculated subtotal + fixed delivery fee + grand total
- Checkout page with delivery form (`checkout.html`)
- Order summary and confirmation flow
- Cart and checkout data persistence via localStorage
- WhatsApp quick contact button

## Tech Stack
- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Bootstrap 5
- Bootstrap Icons

## Project Structure
```text
Mini_project/
|- index.html
|- style.css
|- script.js
|- checkout.html
|- checkout.js
|- Images/
|- bootstrap-5.3.8-dist/
```

## How It Works
1. User opens `index.html` and browses menu items.
2. Clicking `ADD` (or popular item cards) adds products to cart.
3. Cart data is stored in localStorage (`bossCafeCart`).
4. On checkout click, cart summary is saved as `bossCafeCheckout`.
5. `checkout.html` reads checkout data, shows order summary, and collects delivery details.
6. On confirm order:
   - final payload is saved as `bossCafeLastOrder`
   - cart data is cleared
   - user is redirected back to menu

## Local Setup
No build tools are required.

1. Clone this repository:
   ```bash
   git clone <your-repo-url>
   ```
2. Open project folder:
   ```bash
   cd Mini_project
   ```
3. Run locally:
   - Open `index.html` directly in browser, or
   - Use VS Code Live Server for better development experience.

## Notes
- This is a frontend-only project (no backend/database integration).
- Prices, menu items, and contact details are currently hardcoded.
- Checkout confirmation currently uses browser alert and localStorage.

## Future Improvements
- Backend API integration for real orders
- Dynamic menu management from database
- Authentication for users/admin
- Payment gateway integration
- Search/filter functionality with real logic
- Order history page

## Author
Developed as a mini frontend project for practice and portfolio use.