document.addEventListener('DOMContentLoaded', function() {
    // Initialize user data
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    
    // Set default user if none exists (for testing)
    if (!currentUser) {
        currentUser = {
            name: "Pavan Kalyan S",
            email: "pavankalyansu02@gmail.com",
            phone: "",
            joinedDate: new Date()
        };
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    }

    // Get DOM elements
    const profileContent = document.getElementById('profileContent');
    const loginMessage = document.getElementById('loginMessage');
    const viewMode = document.getElementById('viewMode');
    const editMode = document.getElementById('editMode');

    // Initialize profile display
    function displayProfileInfo() {
        // Avatar initials
        const initials = currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase();
        document.getElementById('avatarInitials').textContent = initials;
        
        // Profile header
        document.getElementById('profileName').textContent = currentUser.name;
        document.getElementById('profileEmail').textContent = currentUser.email;
        document.getElementById('memberSince').textContent = new Date(currentUser.joinedDate).getFullYear();
        
        // View mode
        document.getElementById('viewName').textContent = currentUser.name;
        document.getElementById('viewEmail').textContent = currentUser.email;
        document.getElementById('viewPhone').textContent = currentUser.phone || 'Not provided';
        
        // Edit mode (form values)
        document.getElementById('editName').value = currentUser.name;
        document.getElementById('editEmail').value = currentUser.email;
        document.getElementById('editPhone').value = currentUser.phone || '';
    }

    // Show/hide based on login status
    function checkLoginStatus() {
        if (currentUser) {
            profileContent.style.display = 'block';
            loginMessage.style.display = 'none';
            displayProfileInfo();
        } else {
            profileContent.style.display = 'none';
            loginMessage.style.display = 'block';
        }
    }

    // Edit Profile Button
    document.getElementById('editProfileBtn')?.addEventListener('click', function() {
        viewMode.style.display = 'none';
        editMode.style.display = 'block';
    });

    // Cancel Edit Button
    document.getElementById('cancelEdit')?.addEventListener('click', function() {
        editMode.style.display = 'none';
        viewMode.style.display = 'block';
    });

    // Save Profile Button - FIXED
    document.getElementById('saveProfile')?.addEventListener('click', function() {
        // Get updated values
        const updatedName = document.getElementById('editName').value.trim();
        const updatedEmail = document.getElementById('editEmail').value.trim();
        const updatedPhone = document.getElementById('editPhone').value.trim();

        // Validate inputs
        if (!updatedName) {
            alert("Please enter your name");
            return;
        }
        
        if (!updatedEmail || !updatedEmail.includes('@') || !updatedEmail.includes('.')) {
            alert("Please enter a valid email address");
            return;
        }

        // Update current user object
        currentUser = {
            ...currentUser,
            name: updatedName,
            email: updatedEmail,
            phone: updatedPhone
        };

        // Save to sessionStorage
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));

        // Update UI
        displayProfileInfo();
        
        // Switch back to view mode
        editMode.style.display = 'none';
        viewMode.style.display = 'block';
    
        // Show success message
        alert("Profile updated successfully!");
    });

    // Initialize
    checkLoginStatus();
});