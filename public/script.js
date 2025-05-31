document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const responseMessage = document.getElementById('response-message');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || !email || !message) {
    responseMessage.textContent = 'Please fill out all fields';
    responseMessage.className = 'error';
    responseMessage.style.display = 'block';
    return;
  }
  if (!emailRegex.test(email)) {
    responseMessage.textContent = 'Please enter a valid email';
    responseMessage.className = 'error';
    responseMessage.style.display = 'block';
    return;
  }

  try {
    const response = await fetch('https://contact-form-backend-u6uh.onrender.com/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        name,
        email,
        message,
      }),
    });

    const result = await response.json();

    if (result.success) {
      responseMessage.textContent = 'Thank you for your message!';
      responseMessage.className = 'success';
      document.getElementById('contact-form').reset();
    } else {
      responseMessage.textContent = result.message || 'An error occurred';
      responseMessage.className = 'error';
    }
    responseMessage.style.display = 'block';
  } catch (error) {
    responseMessage.textContent = 'Failed to submit the form. Please try again.';
    responseMessage.className = 'error';
    responseMessage.style.display = 'block';
  }
});
