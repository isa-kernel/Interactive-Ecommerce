import { getOrders } from "../orders.js"; 
import { products } from "../../data/products.js"; 
import { getCart, calculateCartQuantity } from "../cart.js";

const ordersGrid = document.querySelector('.orders-grid');

const cartQuantityElement = document.querySelector('.js-cart-quantity');

function updateCartHeader() {
  const cart = getCart();
  const quantity = calculateCartQuantity(cart);

  cartQuantityElement.innerHTML = quantity;
}

updateCartHeader();

function renderOrders() {
  
  const orders = getOrders();

  let ordersHTML = '';

  orders.forEach((order) => {

    let orderItemsHTML = '';

    order.cart.forEach((item ) => {
      const product = products.find(product => product.id === item.productId);

      orderItemsHTML += `
        <div class="product-image-container">
          <img src="${product.image}">
        </div>

        <div class="product-details">
          <div class="product-name">${product.name}</div>
          <div class="product-quantity">Quantity: ${item.quantity}</div>
          <!--
          <button class="buy-again-button button-primary">
            Buy it again
          </button>
          -->
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });

    ordersHTML += `
      <div class="order-container">
        <div class="order-header">
          <div>
            <div>Order placed:</div>
            <div>${new Date(order.orderTime).toDateString()}</div>
          </div>

          <div>
            <div>Total:</div>
            <div>$${(order.totalCents / 100).toFixed(2)}</div>
          </div>

          <div>
            <div>Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${orderItemsHTML}
        </div>
      </div>
    `;
  });

  ordersGrid.innerHTML = ordersHTML;
}
renderOrders();