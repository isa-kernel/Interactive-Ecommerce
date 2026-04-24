let cart = JSON.parse(localStorage.getItem('cart')) || [];


function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
  //localStorage.clear(cart);
}

export function addToCart(productId, quantity){
  let matchingItem = cart.find((item) => item.productId === productId);

if(matchingItem){
  matchingItem.quantity += quantity;
}else{
  cart.push({
    productId: productId,
    quantity: quantity,
    deliveryOptionId: '1' //default = free shipping
  });
}
  saveToStorage();
}

export function getCart(){
  return cart;
}

export function removeFromCart(productId){
  //filter It creates a new array by keeping only items that pass a condition.
  cart = cart.filter((item) => item.productId !== productId);
  saveToStorage();
}

function updateQuantity(productId, newQuantity){
  const item = cart.find((item) => item.productId === productId);

  if(item){
    item.quantity = newQuantity;
  }
  saveToStorage();  
}

export function changeQuantity(productId, amount) {
  let item = cart.find((item) => item.productId === productId);

  item.quantity += amount;

  // If quantity goes to 0 → remove item
  if (item.quantity <= 0) {
    cart = cart.filter((item) => item.productId !== productId);
  }

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId){
  const item = cart.find((item) => item.productId === productId);

  item.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

export function calculateCartQuantity(cart) {
  let total = 0;

  cart.forEach(item => {
    total += item.quantity;
  });

  return total;
}