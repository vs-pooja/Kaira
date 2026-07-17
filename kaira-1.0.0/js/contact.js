document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value;
    const address = document.getElementById('contact-address').value;
    const phone = document.getElementById('contact-phone').value;
    const email = document.getElementById('contact-email').value;

    // For now, just log it (later this could be sent somewhere)
    console.log({ name, address, phone, email });

    form.style.display = 'none';
    document.getElementById('contact-success').style.display = 'block';
  });
});