const products = [
    {
        id: 2,
        name: "Women's Dress",
        price: 1099,
        category: "women",
        size: ["s", "m","l"],
        color: "Black",
        image: "images/product2.jpg",
        description: "Elegant and trendy"
    },
    {
        id: 5,
        name: "Women's Kurtha",
        price: 899,
        category: "women",
        size: ["s", "m", "l"],
        color: "Yellow",
        image: "images/product5.jpg",
        description: "Stylish and Beautiful"
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