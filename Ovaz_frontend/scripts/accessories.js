
    const products = [
           {
                id: 3,
                name: "Unisex Backpack",
                price: 999,
                category: "accessories",
                size: ["m", "l"],
                color: "Black",
                image: "images/product3.jpg",
                description: "Durable and spacious"
            },
            {
                id: 6,
                name: "Analog Watch",
                price: 1299,
                category: "accessories",
                size: ["m"],
                color: "Black",
                image: "images/product6.jpg",
                description: "Comfortable and trendy"
            },
            {
                id: 7,
                name: "Nike Shoes",
                price: 1599,
                category: "accessories",
                size: ["m", "l"],
                color: "White",
                image: "images/product7.jpg",
                description: "High Quality Premium Shoes"
            },
        ];

                // Function to render products
                function renderProducts(filteredProducts = products) {
            const productsContainer = document.getElementById('productsContainer');
            productsContainer.innerHTML = '';
            
            if (filteredProducts.length === 0) {
                productsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 20px;">No products match your filters. Try adjusting your selection.</p>';
                return;
            }
            
            filteredProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <a href="product.html?id=${product.id}"> 
                        <img src="${product.image}" alt="${product.name}">
                        <h4>${product.name}</h4>
                        <p>${product.description}</p>
                        <p class="price">Rs ${product.price}</p>
                    </a>
                `;
                productsContainer.appendChild(productCard);
            });
        }

        // Add this at the end of your script
       document.addEventListener('DOMContentLoaded', function() {
       renderProducts();
      });