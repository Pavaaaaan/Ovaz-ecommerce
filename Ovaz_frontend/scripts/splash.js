        // Create floating bubbles
        function createBubbles() {
            const bubblesContainer = document.getElementById('bubbles');
            const bubbleCount = 15;
            
            for (let i = 0; i < bubbleCount; i++) {
                const bubble = document.createElement('div');
                bubble.classList.add('bubble');
                
                // Random size between 20px and 100px
                const size = Math.random() * 80 + 20;
                bubble.style.width = `${size}px`;
                bubble.style.height = `${size}px`;
                
                // Random position
                bubble.style.left = `${Math.random() * 100}%`;
                
                // Random animation duration and delay
                const duration = Math.random() * 20 + 10;
                const delay = Math.random() * 5;
                bubble.style.animation = `float ${duration}s infinite ${delay}s ease-in`;
                
                bubblesContainer.appendChild(bubble);
            }
        }
        
        // Initialize bubbles
        createBubbles();
        
        // Navigate to home page after splash screen
        setTimeout(() => {
            const splashScreen = document.getElementById('splash-screen');
            
            // Fade out animation
            splashScreen.style.opacity = '0';
            splashScreen.style.transition = 'opacity 0.8s ease-out';
            
            // Redirect after fade out completes
            setTimeout(() => {
                window.location.href = "home.html";
            }, 800);
        }, 3500); // Total splash duration - 3.5 seconds