let orders = JSON.parse(localStorage.getItem('orders')) || [];

export function getOrders() {
  return orders;
}

export function saveOrders() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function addOrder(order) {
  orders.unshift(order); // newest first
  saveOrders();
}



