document.addEventListener("DOMContentLoaded", function() {
    // Update order summary and total
    function updateOrderSummary() {
        let cart = JSON.parse(sessionStorage.getItem('ovazCart')) || [];
        let orderItems = document.getElementById('order-items');
        let totalAmount = 0;
        
        orderItems.innerHTML = '';
        
        if (cart.length === 0) {
            orderItems.innerHTML = '<p>Your cart is empty</p>';
            document.getElementById('cartTotal').textContent = 'Rs 0';
            return;
        }
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalAmount += itemTotal;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'order-item';
            itemElement.innerHTML = `
                <span>${item.name} (${item.quantity})</span>
                <span>Rs ${itemTotal}</span>
            `;
            orderItems.appendChild(itemElement);
        });
        
        document.getElementById('cartTotal').textContent = `Rs ${totalAmount}`;
    }
    
    // Payment method selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('selected'));
            this.classList.add('selected');
            
            // Show the corresponding form
            const methodType = this.getAttribute('data-method');
            document.querySelectorAll('.payment-form').forEach(form => {
                form.style.display = 'none';
            });
            document.getElementById(`${methodType}-form`).style.display = 'block';
        });
    });
    
    // Format card number input
    document.getElementById('card-number').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s+/g, '');
        if (value.length > 0) {
            value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
        }
        e.target.value = value;
    });
    
    // Format expiry date input
    document.getElementById('expiry-date').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    });
    
    // Apply promo code
    document.getElementById('apply-promo').addEventListener('click', function() {
        const promoCode = document.getElementById('promo-code').value.trim();
        if (promoCode) {
            alert(`Promo code "${promoCode}" applied! (This is a demo)`);
        } else {
            alert('Please enter a promo code');
        }
    });
    
    // Confirm payment
    document.getElementById('confirm-payment').addEventListener('click', function() {
        const selectedMethod = document.querySelector('.payment-method.selected').getAttribute('data-method');
        
        // Basic validation
        if (selectedMethod === 'card') {
            const cardNumber = document.getElementById('card-number').value.replace(/\s+/g, '');
            const cardName = document.getElementById('card-name').value.trim();
            const expiryDate = document.getElementById('expiry-date').value;
            const cvv = document.getElementById('cvv').value;
            
            if (!cardNumber || cardNumber.length < 16) {
                alert('Please enter a valid card number');
                return;
            }
            
            if (!cardName) {
                alert('Please enter the name on card');
                return;
            }
            
            if (!expiryDate || expiryDate.length < 5) {
                alert('Please enter a valid expiry date');
                return;
            }
            
            if (!cvv || cvv.length < 3) {
                alert('Please enter a valid CVV');
                return;
            }
        } else if (selectedMethod === 'upi') {
            const upiId = document.getElementById('upi-id').value.trim();
            if (!upiId || !upiId.includes('@')) {
                alert('Please enter a valid UPI ID');
                return;
            }
        }
        
        // Process payment (in a real app, this would call your backend)
        alert('Payment successful! Thank you for your order.');
        
        // Clear cart
        sessionStorage.removeItem('ovazCart');
        
        // Redirect to confirmation page
        window.location.href = 'orders.html';
    });
    
    // Initialize
    updateOrderSummary();
});