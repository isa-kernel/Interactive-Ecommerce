import { products } from "../../data/products.js";
import { addToCart, getCart } from "../cart.js";


const productGrid = document.querySelector('.js-products-grid');
const cartQuantityRender = document.querySelector('.cart-quantity');

let productHTML = '';

products.forEach((product) => {
     productHTML = `
   
     
            <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name ">${product.name}</div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars*10}.png">
              <div class="product-rating-count link-primary">${product.rating.count}</div>
            </div>

            <div class="product-price">$${(product.priceCents/100).toFixed(2)}</div>
                                            
            <div class="product-quantity-container">
              <select class="js-quantity-selector">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart "  data-product-id="${product.id}">
              Add to Cart
            </button>
            </div>
            
      
`;
productGrid.innerHTML += productHTML;
});



const addToCartbtns = document.querySelectorAll('.js-add-to-cart');
addToCartbtns.forEach((button) => {

  button.addEventListener('click', () => {
    //ID on each add to cart button
    const productId = button.dataset.productId;

    const  productContainer = button.closest('.product-container');
    const quantitySelector = productContainer.querySelector('.js-quantity-selector');
    const addedMessage = productContainer.querySelector('.added-to-cart');

    const quantity = Number(quantitySelector.value);
    
    addToCart(productId,quantity);
    //cart quantity on landing page
    updateCartUi();

    //add class and show added message
    addedMessage.classList.add('added-to-cart-visible');
    //hide after 1.5 seconds
    setTimeout(() => {
      addedMessage.classList.remove('added-to-cart-visible');
    },1500);
  });

});

export function updateCartUi(){
  const cart = getCart();

  let totalQuantity = 0;

  cart.forEach((item) => {
    totalQuantity += item.quantity;
  });

  cartQuantityRender.innerHTML = totalQuantity;
  return cart;
}
updateCartUi();




