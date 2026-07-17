document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const itemsList = document.getElementById('checkout-items-list');
  const totalEl = document.getElementById('checkout-total');

  itemsList.innerHTML = '';

  if (cart.length === 0) {
    itemsList.innerHTML = `<li class="list-group-item text-center text-body-secondary">Your cart is empty</li>`;
    totalEl.textContent = '0.00';
    return;
  }

  let total = 0;
  cart.forEach(item => {
    total += parseFloat(item.price) * item.quantity;
    itemsList.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <h6 class="my-0">${item.name}</h6>
          <small class="text-body-secondary">Qty: ${item.quantity} × Rs${item.price}</small>
        </div>
        <span>Rs${(item.price * item.quantity).toFixed(2)}</span>
      </li>
    `;
  });

  totalEl.textContent = total.toFixed(2);
  document.getElementById('pay-now-btn').addEventListener('click', () => {
  const total = document.getElementById('checkout-total').textContent;
  document.getElementById('qr-amount').textContent = total;
  document.getElementById('qr-section').style.display = 'block';

  // Hide the Pay Now button once QR is shown
  document.getElementById('pay-now-btn').style.display = 'none';
});
});