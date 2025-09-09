   // User data - would normally come from backend/API
   const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    settings: {
        notifications: {
            email: {
                orders: true,
                promotions: true,
                newsletter: false
            },
            sms: {
                orders: true,
                promotions: false
            },
            push: {
                orders: true,
                promotions: false
            }
        },
        language: "en",
        currency: "INR",
        privacy: {
            visibility: "public",
            personalizedAds: false,
            shareData: true,
            searchVisibility: true
        }
    },
    linkedAccounts: [
        { type: "google", email: "john.doe@gmail.com" },
        { type: "facebook", email: "john.doe@facebook.com" }
    ],
    paymentMethods: [
        { type: "visa", last4: "4242", expiry: "12/25" },
        { type: "paypal", email: "john.doe@example.com" }
    ]
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load user settings
    loadUserSettings();
    
    // Initialize UI
    initializeUI();
    
    // Set up event listeners
    setupEventListeners();
});

function loadUserSettings() {
    // Load notification settings
    document.getElementById('email-orders').checked = userData.settings.notifications.email.orders;
    document.getElementById('email-promotions').checked = userData.settings.notifications.email.promotions;
    document.getElementById('email-newsletter').checked = userData.settings.notifications.email.newsletter;
    document.getElementById('sms-orders').checked = userData.settings.notifications.sms.orders;
    document.getElementById('sms-promotions').checked = userData.settings.notifications.sms.promotions;
    document.getElementById('push-orders').checked = userData.settings.notifications.push.orders;
    document.getElementById('push-orders-toggle').checked = userData.settings.notifications.push.orders;
    document.getElementById('push-promotions').checked = userData.settings.notifications.push.promotions;
    document.getElementById('push-promotions-toggle').checked = userData.settings.notifications.push.promotions;
    
    // Load language and currency
    document.getElementById('language').value = userData.settings.language;
    document.getElementById('currency').value = userData.settings.currency;
    
    // Load privacy settings
    document.querySelector(`input[name="visibility"][value="${userData.settings.privacy.visibility}"]`).checked = true;
    document.getElementById('personalized-ads').checked = userData.settings.privacy.personalizedAds;
    document.getElementById('share-data').checked = userData.settings.privacy.shareData;
    document.getElementById('search-visibility').checked = userData.settings.privacy.searchVisibility;
    
    // Load linked accounts
    renderLinkedAccounts();
    
    // Load payment methods
    renderPaymentMethods();
}

function initializeUI() {
    // Open first section by default
    const firstSection = document.querySelector('.settings-section .section-content');
    const firstChevron = document.querySelector('.settings-section .section-header i.fa-chevron-down');
    firstSection.classList.add('active');
    firstChevron.classList.add('fa-rotate-180');
    
    // Set up toggle switches
    document.querySelectorAll('.toggle-switch input').forEach(toggle => {
        toggle.addEventListener('change', function() {
            const label = this.closest('.checkbox-label');
            const checkbox = label.querySelector('input[type="checkbox"]');
            checkbox.checked = this.checked;
        });
    });
    
    // Delete account confirmation input
    document.getElementById('delete-confirm').addEventListener('input', function() {
        document.getElementById('confirm-delete-btn').disabled = 
            this.value.toUpperCase() !== 'DELETE';
    });
}

function setupEventListeners() {
    // Save notification settings
    document.getElementById('save-notifications').addEventListener('click', saveNotificationSettings);
    
    // Save language settings
    document.getElementById('save-language').addEventListener('click', saveLanguageSettings);
    
    // Link account button
    document.getElementById('link-account-btn').addEventListener('click', function() {
        openModal('link-account-modal');
    });
    
    // Add payment method button
    document.getElementById('add-payment-btn').addEventListener('click', function() {
        openModal('add-payment-modal');
    });
    
    // Delete account button
    document.getElementById('delete-account-btn').addEventListener('click', function() {
        openModal('delete-account-modal');
    });
}

function renderLinkedAccounts() {
    const container = document.getElementById('linked-accounts-list');
    container.innerHTML = '';
    
    if (userData.linkedAccounts.length === 0) {
        container.innerHTML = '<p>No linked accounts found</p>';
        return;
    }
    
    userData.linkedAccounts.forEach(account => {
        const accountElement = document.createElement('div');
        accountElement.className = 'linked-account';
        
        let iconClass, accountName;
        switch(account.type) {
            case 'google':
                iconClass = 'fab fa-google';
                accountName = 'Google';
                break;
            case 'facebook':
                iconClass = 'fab fa-facebook';
                accountName = 'Facebook';
                break;
            case 'apple':
                iconClass = 'fab fa-apple';
                accountName = 'Apple';
                break;
            default:
                iconClass = 'fas fa-user';
                accountName = account.type;
        }
        
        accountElement.innerHTML = `
            <div class="account-info">
                <i class="${iconClass}"></i>
                <span>${accountName} (${account.email})</span>
            </div>
            <div class="account-actions">
                <a href="#" onclick="unlinkAccount('${account.type}')">Unlink</a>
            </div>
        `;
        
        container.appendChild(accountElement);
    });
}

function renderPaymentMethods() {
    const container = document.getElementById('payment-methods-list');
    container.innerHTML = '';
    
    if (userData.paymentMethods.length === 0) {
        container.innerHTML = '<p>No payment methods found</p>';
        return;
    }
    
    userData.paymentMethods.forEach(method => {
        const methodElement = document.createElement('div');
        methodElement.className = 'linked-account';
        
        let iconClass, methodName;
        switch(method.type) {
            case 'visa':
                iconClass = 'fab fa-cc-visa';
                methodName = `Visa ending in ${method.last4}`;
                break;
            case 'mastercard':
                iconClass = 'fab fa-cc-mastercard';
                methodName = `Mastercard ending in ${method.last4}`;
                break;
            case 'paypal':
                iconClass = 'fab fa-paypal';
                methodName = `PayPal (${method.email})`;
                break;
            default:
                iconClass = 'far fa-credit-card';
                methodName = `Card ending in ${method.last4}`;
        }
        
        methodElement.innerHTML = `
            <div class="account-info">
                <i class="${iconClass}"></i>
                <span>${methodName}</span>
            </div>
            <div class="account-actions">
                <a href="#" onclick="removePaymentMethod('${method.type}')">Remove</a>
            </div>
        `;
        
        container.appendChild(methodElement);
    });
}

function saveNotificationSettings() {
    const btn = document.getElementById('save-notifications');
    const btnText = document.getElementById('notification-btn-text');
    const spinner = document.getElementById('notification-spinner');
    
    // Show loading state
    btnText.textContent = 'Saving...';
    spinner.style.display = 'inline-block';
    btn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Update user data
        userData.settings.notifications = {
            email: {
                orders: document.getElementById('email-orders').checked,
                promotions: document.getElementById('email-promotions').checked,
                newsletter: document.getElementById('email-newsletter').checked
            },
            sms: {
                orders: document.getElementById('sms-orders').checked,
                promotions: document.getElementById('sms-promotions').checked
            },
            push: {
                orders: document.getElementById('push-orders').checked,
                promotions: document.getElementById('push-promotions').checked
            }
        };
        
        // Show success
        btnText.textContent = 'Saved!';
        spinner.style.display = 'none';
        
        // Reset button after delay
        setTimeout(() => {
            btnText.textContent = 'Save Notification Settings';
            btn.disabled = false;
        }, 1500);
    }, 1000);
}

function saveLanguageSettings() {
    const btn = document.getElementById('save-language');
    const btnText = document.getElementById('language-btn-text');
    const spinner = document.getElementById('language-spinner');
    
    // Show loading state
    btnText.textContent = 'Saving...';
    spinner.style.display = 'inline-block';
    btn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Update user data
        userData.settings.language = document.getElementById('language').value;
        userData.settings.currency = document.getElementById('currency').value;
        
        // Show success
        btnText.textContent = 'Saved!';
        spinner.style.display = 'none';
        
        // Reset button after delay
        setTimeout(() => {
            btnText.textContent = 'Save Language & Currency';
            btn.disabled = false;
        }, 1500);
    }, 1000);
}

function linkAccount() {
    const accountType = document.getElementById('account-type').value;
    alert(`Redirecting to ${accountType} for authentication...`);
    closeModal('link-account-modal');
    
    // In a real app, this would redirect to OAuth flow
    // For demo, we'll just add a fake account
    setTimeout(() => {
        userData.linkedAccounts.push({
            type: accountType,
            email: `user@${accountType}.com`
        });
        renderLinkedAccounts();
    }, 1500);
}

function unlinkAccount(accountType) {
    if (confirm(`Are you sure you want to unlink your ${accountType} account?`)) {
        userData.linkedAccounts = userData.linkedAccounts.filter(
            acc => acc.type !== accountType
        );
        renderLinkedAccounts();
    }
}

function addPaymentMethod() {
    const cardNumber = document.getElementById('card-number').value;
    const cardExpiry = document.getElementById('card-expiry').value;
    const cardCvv = document.getElementById('card-cvv').value;
    const cardName = document.getElementById('card-name').value;
    
    if (!cardNumber || !cardExpiry || !cardCvv || !cardName) {
        alert('Please fill in all card details');
        return;
    }
    
    // In a real app, you would validate the card and process it with a payment processor
    // For demo, we'll just add a fake card
    userData.paymentMethods.push({
        type: 'visa',
        last4: cardNumber.slice(-4),
        expiry: cardExpiry
    });
    
    closeModal('add-payment-modal');
    renderPaymentMethods();
    
    // Clear form
    document.getElementById('card-number').value = '';
    document.getElementById('card-expiry').value = '';
    document.getElementById('card-cvv').value = '';
    document.getElementById('card-name').value = '';
}

function removePaymentMethod(methodType) {
    if (confirm(`Are you sure you want to remove this ${methodType} payment method?`)) {
        userData.paymentMethods = userData.paymentMethods.filter(
            method => method.type !== methodType
        );
        renderPaymentMethods();
    }
}

function confirmDeleteAccount() {
    if (confirm('This will permanently delete your account. Are you absolutely sure?')) {
        alert('Account deletion request received. We\'re sorry to see you go!');
        closeModal('delete-account-modal');
        // In a real app, this would redirect to logout and account deletion process
    }
}

// Modal functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Section toggle
function toggleSection(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector('i.fa-chevron-down');
    
    content.classList.toggle('active');
    icon.classList.toggle('fa-rotate-180');
}
