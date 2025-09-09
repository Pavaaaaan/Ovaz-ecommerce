const contactForm = document.getElementById('contactForm');
const confirmationMessage = document.getElementById('confirmationMessage');

contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        inquiry: document.getElementById('inquiry').value,
        message: document.getElementById('message').value
    };

    try {
        const res = await fetch('http://localhost:5000/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (res.ok) {
            confirmationMessage.classList.add('show');
            contactForm.reset();

            setTimeout(() => {
                confirmationMessage.classList.remove('show');
            }, 5000);
        } else {
            alert('Failed to submit. Try again later.');
        }
    } catch (err) {
        console.error(err);
        alert('Error connecting to server.');
    }
});
