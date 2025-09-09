        // Enhanced Carousel functionality
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.carousel-dot');
        const totalSlides = slides.length;
        let slideInterval;

        function showSlide(index) {
            // Deactivate all slides and dots
            slides.forEach((slide) => {
                slide.classList.remove('active');
            });
            dots.forEach((dot) => {
                dot.classList.remove('active');
            });
            
            // Activate current slide and dot
            slides[index].classList.add('active');
            dots[index].classList.add('active');
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        }

        function startSlideshow() {
            slideInterval = setInterval(nextSlide, 5000);
        }

        function stopSlideshow() {
            clearInterval(slideInterval);
        }

        // Show the first slide initially
        showSlide(currentSlide);
        startSlideshow();

        // Add event listeners for manual navigation
        document.getElementById('nextSlide').addEventListener('click', function() {
            stopSlideshow();
            nextSlide();
            startSlideshow();
        });

        document.getElementById('prevSlide').addEventListener('click', function() {
            stopSlideshow();
            prevSlide();
            startSlideshow();
        });

        // Add event listeners for dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                stopSlideshow();
                currentSlide = index;
                showSlide(currentSlide);
                startSlideshow();
            });
        });

        // Pause slideshow on hover
        document.querySelector('.carousel').addEventListener('mouseenter', stopSlideshow);
        document.querySelector('.carousel').addEventListener('mouseleave', startSlideshow);

        // Chatbot Functionality
        document.addEventListener('DOMContentLoaded', function() {
            const chatbotToggle = document.getElementById('chatbotToggle');
            const chatbotWindow = document.getElementById('chatbotWindow');
            const chatbotClose = document.getElementById('chatbotClose');
            const chatbotMessages = document.getElementById('chatbotMessages');
            const chatbotInput = document.getElementById('chatbotInput');
            const chatbotSend = document.getElementById('chatbotSend');

            // Toggle chatbot window
            chatbotToggle.addEventListener('click', function() {
                chatbotWindow.style.display = chatbotWindow.style.display === 'flex' ? 'none' : 'flex';
                if (chatbotWindow.style.display === 'flex') {
                    chatbotInput.focus();
                }
            });

            // Close chatbot window
            chatbotClose.addEventListener('click', function() {
                chatbotWindow.style.display = 'none';
            });

            // Send message
            function sendMessage() {
                const message = chatbotInput.value.trim();
                if (message === '') return;

                // Add user message to chat
                addMessage(message, 'user');
                chatbotInput.value = '';

                // Show typing indicator
                showTypingIndicator();

                // Process message after a short delay
                setTimeout(() => {
                    processUserMessage(message);
                }, 1000);
            }

            // Add message to chat
            function addMessage(text, sender) {
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('message');
                messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
                messageDiv.textContent = text;
                chatbotMessages.appendChild(messageDiv);
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }

            // Show typing indicator
            function showTypingIndicator() {
                const typingDiv = document.createElement('div');
                typingDiv.classList.add('typing-indicator');
                typingDiv.innerHTML = '<span></span><span></span><span></span>';
                typingDiv.id = 'typingIndicator';
                chatbotMessages.appendChild(typingDiv);
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }

            // Hide typing indicator
            function hideTypingIndicator() {
                const typingIndicator = document.getElementById('typingIndicator');
                if (typingIndicator) {
                    typingIndicator.remove();
                }
            }

            // Process user message and generate response
            function processUserMessage(message) {
                hideTypingIndicator();
                
                const lowerMessage = message.toLowerCase();
                let response = "I'm sorry, I didn't understand that. Could you please rephrase your question?";

                // Enhanced response logic
                if (lowerMessage.includes('order') || lowerMessage.includes('track')) {
                    response = "To track your order, please visit the 'Orders' page in your account. You'll find all your current and past orders there with their status. Would you like me to help you locate a specific order?";
                } 
                else if (lowerMessage.includes('return') || lowerMessage.includes('refund')) {
                    response = "Our return policy allows returns within 30 days of purchase. Please visit the 'Orders' page, select the item you want to return, and follow the instructions. Is there a specific item you're looking to return?";
                } 
                else if (lowerMessage.includes('account') || lowerMessage.includes('login')) {
                    response = "For account issues, please visit the 'Profile' page. If you're having trouble logging in, try resetting your password or contact our support team at support@ovaz.com. Can I help with anything specific about your account?";
                } 
                else if (lowerMessage.includes('product') || lowerMessage.includes('item')) {
                    response = "You can find detailed product information on each product page. If you have specific questions about a product, please provide the product name or ID and I'll try to help you find what you're looking for.";
                } 
                else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
                    response = "Hello there! How can I assist you with your shopping today? Are you looking for anything specific?";
                } 
                else if (lowerMessage.includes('thank')) {
                    response = "You're welcome! I'm happy to help. Is there anything else you'd like to know about our products or services?";
                } 
                else if (lowerMessage.includes('contact') || lowerMessage.includes('support')) {
                    response = "You can contact our support team at support@ovaz.com or call us at (800) 555-OVAZ. Our support hours are Monday-Friday, 9AM-5PM. Would you like me to help connect you with a live agent?";
                }
                else if (lowerMessage.includes('discount') || lowerMessage.includes('coupon') || lowerMessage.includes('offer')) {
                    response = "We currently have a 40% discount on Men's Clothing! You can also get free shipping on orders over 2999. Would you like me to show you our current promotions?";
                }
                else if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery')) {
                    response = "We offer standard shipping (3-5 business days), express shipping (1-2 business days), and free shipping on orders over 2999. Would you like more information about our shipping policies?";
                }

                // Add a small delay before showing the response
                setTimeout(() => {
                    addMessage(response, 'bot');
                }, 500);
            }

            // Send message when button is clicked
            chatbotSend.addEventListener('click', sendMessage);

            // Send message when Enter key is pressed
            chatbotInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });

            // Sample conversation starter
            setTimeout(() => {
                if (chatbotMessages.children.length <= 2) { // Only if no other messages
                    showTypingIndicator();
                    setTimeout(() => {
                        hideTypingIndicator();
                        addMessage("Need help with anything today? I'm here to assist with orders, products, returns, and more! Don't miss our 40% off sale on Men's Clothing!", 'bot');
                    }, 1500);
                }
            }, 10000); // After 10 seconds
        });