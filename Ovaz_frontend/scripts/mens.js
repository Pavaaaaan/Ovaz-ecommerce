const products = [
    {
        id: 1,
        name: "Men's T-Shirt",
        price: 999,
        category: "men",
        size: ["s", "m", "l"],
        color: "White",
        image: "images/product1.jpg",
        description: "Comfortable and stylish"
    },    
    {
        id: 4,
        name: "Men's Shirt",
        price: 1499,
        category: "men",
        size: ["m", "l"],
        color: "Green",
        image: "images/product4.jpg",
        description: "Classic and Trendy"
    },
    {
        id: 8,
        name: "Levis Jeans",
        price: 1799,
        category: "men",
        size: ["s", "m", "l"],
        color: "Blue",
        image: "images/product8.jpg",
        description: "Stylish"
    }
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