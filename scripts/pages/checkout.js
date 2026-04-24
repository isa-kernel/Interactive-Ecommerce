import { getCart,removeFromCart,changeQuantity,updateDeliveryOption } from "../cart.js";
import { products } from "../../data/products.js"; 
import { addOrder } from "../orders.js"; 

const deliveryOptions = [
  {
  id: '1',
  priceCents: 0,
  deliveryDays: 7
},
{
  id: '2',
  priceCents: 499,
  deliveryDays: 3
},
{
  id: '3',
  priceCents: 999,
  deliveryDays: 1
}
];

const cartSummary = document.querySelector('.js-cart-summary');
const paymentSummary = document.querySelector('.js-payment-summary');
const checkoutItemsQuantity = document.querySelector('.js-return-to-home-link');


//each checkout items
function renderCheckout(){
  const cart = getCart();

  let cartHTML = '';

  cart.forEach((cartItem) => {
    const product = products.find((item) =>   item.id === cartItem.productId );

    const option = deliveryOptions.find((option) => option.id === cartItem.deliveryOptionId) || deliveryOptions[0];

    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + option.deliveryDays);
    
    const dateString = deliveryDate.toDateString();

    // 1 day later
    const oneDayLater = new Date(today);
    oneDayLater.setDate(today.getDate() + 1);

    // 3 days later
    const threeDaysLater = new Date(today);
    threeDaysLater.setDate(today.getDate() + 3);

    // 7 days later
    const sevenDaysLater = new Date(today);
    sevenDaysLater.setDate(today.getDate() + 7);


    cartHTML += `
        <div class="js-cart-item cart-item-container" data-cart-item-id="617bcb77-9c0b-be92-3547-8ac11cc1d" data-testid="cart-item-container-617bcb77-9c0b-be92-3547-8ac21211cc1d">

          <div class="delivery-date">
            Delivery date:
            <span class="js-delivery-date">
              ${dateString}
            </span>
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="${product.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${product.name}
              </div>

              <div class="product-price">
                $${(product.priceCents / 100).toFixed(2)}
              </div>

              

              <div class="js-quantity-container product-quantity" data-testid="quantity-container">
              <!--
                Quantity: <span class="js-quantity-label quantity-label" data-testid="quantity-label">
                  ${cartItem.quantity}
                </span>

                <input class="js-new-quantity-input new-quantity-input" type="number" value="2" data-testid="new-quantity-input">

                <span class="js-update-quantity-link update-quantity-link link-primary" data-testid="update-quantity-link">
                  Update
                </span>
                -->
                <!-- <span class="js-save-quantity-link save-quantity-link link-primary" data-testid="save-quantity-link">
                  Save
                </span> -->

                 <button 
                  class="js-decrease quantity-btn"
                  data-product-id="${product.id}">
                  ${cartItem.quantity === 1 
                    ? '<img src="images/icons/delete-icon.png.jfif" class="delete-icon">' 
                    : '-'}
                </button>

                    <span class="quantity-label">
                      ${cartItem.quantity}
                    </span>

                    <button 
                      class="js-increase quantity-btn"
                      data-product-id="${product.id}">
                      +
                </button>

                <span class="js-delete-quantity-link delete-quantity-link link-primary" data-testid="delete-quantity-link" data-product-id="${product.id}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>

              
        <div class="js-delivery-option delivery-option" data-delivery-option-id="f297d333-a5c4-452f-840b-15a662257b3f" data-testid="delivery-option-f297d333-a5c4-452f-840b-15a662257b3f">

        <input
         type="radio" 
         class="js-delivery-option-input delivery-option-input"
         name="${product.id}-delivery-option"  
         data-testid="delivery-option-input"
        data-product-id="${product.id}"  
        data-delivery-option-id="1"
        ${cartItem.deliveryOptionId === '1' ? 'checked' : ''}>

          <div>
            <div class="delivery-option-date">
              ${sevenDaysLater.toDateString()}
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
      
        <div class="js-delivery-option delivery-option" data-delivery-option-id="6e2dd65a-6665-4f24-bcdc-f2ecdbc6e156" data-testid="delivery-option-6e2dd65a-6665-4f24-bcdc-f2ecdbc6e156">

          <input
         type="radio" 
         class="js-delivery-option-input delivery-option-input"
         name="${product.id}-delivery-option"  
         data-testid="delivery-option-input"
        data-product-id="${product.id}"  
        data-delivery-option-id="2"
        ${cartItem.deliveryOptionId === '2' ? 'checked' : ''}>

          <div>
            <div class="delivery-option-date">
              ${threeDaysLater.toDateString()}
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
      
        <div class="js-delivery-option delivery-option" data-delivery-option-id="178aa766-de75-4686-8442-038c1a027003" data-testid="delivery-option-178aa766-de75-4686-8442-038c1a027003">

          <input
         type="radio" 
         class="js-delivery-option-input delivery-option-input"
         name="${product.id}-delivery-option"  
         data-testid="delivery-option-input"
        data-product-id="${product.id}"  
        data-delivery-option-id="3"
        ${cartItem.deliveryOptionId === '3' ? 'checked' : ''}>

          <div>
            <div class="delivery-option-date">
              ${oneDayLater.toDateString()}
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      
            </div>
          </div>
           </div>
    `;
  });
  cartSummary.innerHTML = cartHTML;
  attachQuantityListeners();
  attachDeleteListeners();
  attachDeliveryListeners();
}
renderCheckout();
// increase and delete buttons
function attachQuantityListeners() {
const increaseButton = document.querySelectorAll('.js-increase');
const decreaseButton = document.querySelectorAll('.js-decrease');
//increase button
  increaseButton.forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;

      changeQuantity(productId, 1);
      renderCheckout();
      renderPaymentSummary();
    });
  });

  //decrease button
  decreaseButton.forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;

      changeQuantity(productId, -1);
      renderCheckout();
      renderPaymentSummary();
    });
  });
}
//delete button
function attachDeleteListeners() {
  document.querySelectorAll('.js-delete-quantity-link').forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;

      removeFromCart(productId);

      renderCheckout();
      renderPaymentSummary();
    });
  });
}

function calculateTotals(cart, products){
  let itemsPriceCents = 0;
  let totalQuantity = 0;
  let shippingCents = 0;

cart.forEach((cartItem) => {
  const product = products.find(item => item.id === cartItem.productId);

  const option = deliveryOptions.find((option) => option.id === cartItem.deliveryOptionId) || deliveryOptions[0];



  itemsPriceCents += (product.priceCents * cartItem.quantity);
  totalQuantity += cartItem.quantity;
  shippingCents += option.priceCents;
});

const beforeTax = itemsPriceCents + shippingCents;
const taxCents = Math.round(itemsPriceCents * 0.1);
const totalCents = beforeTax + taxCents;

return {itemsPriceCents, shippingCents, beforeTax, taxCents, totalCents, totalQuantity};
}
//radio inputs
function attachDeliveryListeners() {
  document.querySelectorAll('.js-delivery-option-input').forEach(input => {
    input.addEventListener('change', () => {
      const productId = input.dataset.productId;
      const deliveryOptionId = input.dataset.deliveryOptionId;

      updateDeliveryOption(productId, deliveryOptionId);

      renderCheckout();
      renderPaymentSummary();
    });
  });
}
//payment render 
function renderPaymentSummary(){
  const cart = getCart();
  const totals = calculateTotals(cart, products);

  let paymentDetailshtml = `

      <div class="js-payment-info">
      <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (${cart.length}):</div>
        <div class="payment-summary-money" data-testid="product-cost">
          $${(totals.itemsPriceCents/100).toFixed(2)}
        </div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money" data-testid="shipping-cost">
          ${(totals.shippingCents/100).toFixed(2)}
        </div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money" data-testid="sub-total">
          ${(totals.beforeTax/100).toFixed(2)}
        </div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money" data-testid="tax-cost">
          ${(totals.taxCents/100).toFixed(2)}
        </div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money" data-testid="total-cost">
          ${(totals.totalCents/100).toFixed(2)}
        </div>
      </div>
    </div>

      <div class="js-payment-buttons-container" data-testid="payment-buttons-container">

        <!-- <div class="js-paypal-button-container paypal-button-container" data-testid="paypal-button-container"></div> -->
        
        <button class="js-place-order-button place-order-button button-primary" data-testid="place-order-button">
          Place your order
        </button>
        
      </div>
`;
checkoutItemsQuantity.innerHTML = `${totals.totalQuantity} items`;
paymentSummary.innerHTML = paymentDetailshtml;
attachPlaceOrderListener();
}
renderPaymentSummary();


function attachPlaceOrderListener() {
  const orderButton = document.querySelector('.js-place-order-button');

  orderButton.addEventListener('click', () => {
    const cart = getCart();

      if (!cart.length) {
    alert('Your cart is empty');
    return window.location.href = 'SAANE.html';
  }

    const totals = calculateTotals(cart, products);

    const order = {
      id: crypto.randomUUID(), //  unique ID
      orderTime: new Date().toISOString(),
      totalCents: totals.totalCents,
      cart: cart
    };

    addOrder(order);

    // clear cart
    localStorage.removeItem('cart');

    // go to orders page
    window.location.href = 'orders.html';
  });
}