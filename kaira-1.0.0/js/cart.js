// Load cart from localStorage, or start empty
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartUI() {
  const cartList = document.getElementById('cart-items-list');
  const cartCountBadge = document.getElementById('cart-count');
  const cartCountHeader = document.querySelectorAll('.cart-count');

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountBadge.textContent = totalItems;
  cartCountHeader.forEach(el => el.textContent = `(${totalItems})`);

  cartList.innerHTML = '';

  if (cart.length === 0) {
    cartList.innerHTML = `<li class="list-group-item text-center text-body-secondary" id="empty-cart-message">Your cart is empty</li>`;
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    total += parseFloat(item.price) * item.quantity;
    cartList.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center lh-sm">
        <div>
          <h6 class="my-0">${item.name}</h6>
          <small class="text-body-secondary">Rs${item.price} each</small>
        </div>
        <div class="d-flex align-items-center">
          <button class="btn btn-sm btn-outline-secondary qty-btn" data-index="${index}" data-action="decrease">-</button>
          <span class="mx-2">${item.quantity}</span>
          <button class="btn btn-sm btn-outline-secondary qty-btn" data-index="${index}" data-action="increase">+</button>
          <button class="btn btn-sm btn-outline-danger remove-btn ms-2" data-index="${index}">&times;</button>
        </div>
      </li>
    `;
  });

  cartList.innerHTML += `
    <li class="list-group-item d-flex justify-content-between">
      <span>Total (USD)</span>
      <strong>Rs${total.toFixed(2)}</strong>
    </li>
  `;

  attachCartControlListeners();
}
function attachCartControlListeners() {
  document.querySelectorAll('.qty-btn').forEach(button => {
    button.addEventListener('click', () => {
      const index = button.dataset.index;
      const action = button.dataset.action;

      if (action === 'increase') {
        cart[index].quantity += 1;
      } else if (action === 'decrease') {
        cart[index].quantity -= 1;
        if (cart[index].quantity <= 0) {
          cart.splice(index, 1);
        }
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartUI();
    });
  });

  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', () => {
      const index = button.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartUI();
    });
  });
}

function addToCart(name, price) {
  // Check if item already exists in cart
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
  showToast();
}

function showToast() {
  const toast = document.getElementById('cart-toast');
  toast.style.display = 'block';

  setTimeout(() => {
    toast.style.display = 'none';
  }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();

  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();

      const productContent = button.closest('.product-content');
      const name = productContent.querySelector('h5 a').textContent.trim();

      const priceText = button.querySelector('span').textContent.trim();
      const price = priceText.replace('$', '').replace('Rs', '').trim();

      addToCart(name, price);
    });
  });
});