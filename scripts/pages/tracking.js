import { getOrders } from "../orders.js";
import { products } from "../../data/products.js";

const productNameEl = document.querySelector('.js-product-name');
const productQtyEl = document.querySelector('.js-product-quantity');
const productImageEl = document.querySelector('.js-product-image');
const deliveryDateEl = document.querySelector('.js-delivery-date');

const progressLabels = document.querySelectorAll('.progress-label');
const progressBar = document.querySelector('.progress-bar');

function renderTracking() {
  const url = new URL(window.location.href);

  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  const orders = getOrders();

  // find order
  const order = orders.find((order) => (order).id === orderId);
  if (!order) return;

  //  find item in that order
  const item = order.cart.find(i => i.productId === productId);
  if (!item) return;

  //  find product details
  const product = products.find(p => p.id === productId);

  //  render UI
  productNameEl.innerHTML = product.name;
  productQtyEl.innerHTML = `Quantity: ${item.quantity}`;
  productImageEl.src = product.image;

  //  delivery date (same logic as checkout)
  const deliveryDaysMap = {
    '1': 7,
    '2': 3,
    '3': 1
  };

  const days = deliveryDaysMap[item.deliveryOptionId] || 7;

  const orderDate = new Date(order.orderTime);
  const deliveryDate = new Date(orderDate);
  deliveryDate.setDate(orderDate.getDate() + days);

  deliveryDateEl.innerHTML = `Arriving on ${deliveryDate.toDateString()}`;

  // 🚚 progress logic
  updateProgress(orderDate, deliveryDate);
}

renderTracking();

function updateProgress(orderDate, deliveryDate) {
  const now = new Date();

  const totalTime = deliveryDate - orderDate;
  const elapsed = now - orderDate;

  let progressPercent = Math.min(elapsed / totalTime, 1);

  //  update bar
  progressBar.style.width = `${progressPercent * 100}%`;

  //  update labels
  progressLabels.forEach(label => label.classList.remove('current-status'));

  if (progressPercent < 0.33) {
    progressLabels[0].classList.add('current-status'); // Preparing
  } else if (progressPercent < 0.66) {
    progressLabels[1].classList.add('current-status'); // Shipped
  } else {
    progressLabels[2].classList.add('current-status'); // Delivered
  }
}