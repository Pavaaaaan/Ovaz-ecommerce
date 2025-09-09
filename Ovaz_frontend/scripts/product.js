 // Sample product data
 const products = [
    {
        id: 1,
        name: "Premium Cotton T-Shirt",
        price: 999,
        description: "High-quality cotton t-shirt with premium finish.",
        image: "images/product1.jpg",
        reviews: [
            { user: "John", rating: 4, comment: "Good  quality!" },
            { user: "Raj", rating: 5, comment: "Love this shirt!" }
        ]
    },
    {
        id: 2,
        name: "Women's Dress",
        price: 1099,
        description: "High-quality dress premium finish.",
        image: "images/product2.jpg",
        reviews: [
            { user: "novella", rating: 5, comment: "Great quality!" },
            { user: "Shruti", rating: 5, comment: "perfect, and looks amazing!" }
        ]
    },
    {
        id: 3,
        name: "Unisex Backpack",
        price: 999,
        description: "High-quality Bag.",
        image: "images/product3.jpg",
        reviews: [
            { user: "John", rating: 4, comment: "Great quality!" },
            { user: "Sarah", rating: 4, comment: "spacious and looks good" }
        ]
    },
    {
        id: 4,
        name: "Men's Shirt",
        price: 1499,
        description: "Classic and Trendy.",
        image: "images/product4.jpg",
        reviews: [
            { user: "John", rating: 4, comment: "Looks Great!" },
            { user: "ajay", rating: 5, comment: "Love this shirt!" }
        ]
    },
    {
        id: 5,
        name: "Women's Kurtha",
        price: 899,
        description: "Stylish and Beautiful.",
        image: "images/product5.jpg",
        reviews: [
            { user: "rasha", rating: 4, comment: "Great quality!" },
            { user: "Sarah", rating: 5, comment: "cloth quality is at its best" }
        ]
    },
    {
        id: 6,
        name: "Analog Watch",
        price: 1299,
        description: "Comfortable and Trendy.",
        image: "images/product6.jpg",
        reviews: [
            { user: "John", rating: 4, comment: "looks soo good " },
            { user: "Sarah", rating: 5, comment: "leather quality is top" }
        ]
    },
    {
        id: 7,
        name: "Nike Shoes",
        price: 1999,
        description: "Comfortable and Trendy.",
        image: "images/product7.jpg",
        reviews: [
            { user: "John", rating: 5, comment: " I personally recommend this shoes " },
            { user: "Sarah", rating: 5, comment: "going with the trend in love with the look" }
        ]
    },
    {
        id: 8,
        name: "Levis Jeans",
        price: 1499,
        description: "Comfortable and Trendy.",
        image: "images/product8.jpg",
        reviews: [
            { user: "John", rating: 5, comment: "Top notch quality" },
            { user: "Sarah", rating: 5, comment: "Loved the fit of this jeans and looks great!" }
        ]
    },
    {
        id: 9,
        name: "Women's Shirt",
        price: 999,
        description: "Comfortable and Trendy.",
        image: "images/product9.jpg",
        reviews: [
            { user: "John", rating: 4, comment: "Great quality!" },
            { user: "Sarah", rating: 5, comment: "comfortable to wear" }
        ]
    },
    {
        id: 10,
        name: "Wallet",
        price: 599,
        description: "New Arrival.",
        image: "images/product10.jpg",
        reviews: [
            { user: "John", rating: 3.5, comment: "Great quality of leather!" },
            { user: "Sarah", rating: 4, comment: "ligth weight and looks cool!" }
        ]
    }
];

// Initialize products - don't show all products by default
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're viewing a specific product from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId) {
        showProductDetail(parseInt(productId));
    } else {
        renderProducts();
    }
});

// Show product detail
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Update URL without reloading
    history.pushState(null, '', `?id=${productId}`);
    
    // Hide product grid and show detail view
    const productGrid = document.getElementById('productGrid');
    const productDetail = document.getElementById('productDetail');
    
    if (productGrid) productGrid.style.display = 'none';
    if (productDetail) productDetail.style.display = 'block';
    
    // Update product details
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productPrice').textContent = `Rs${product.price}`;
    document.getElementById('productDescription').textContent = product.description;
    document.getElementById('detailImage').src = product.image;
    
    // Render reviews
    const reviewsContainer = document.getElementById('reviewsContainer');
    if (reviewsContainer) {
        reviewsContainer.innerHTML = product.reviews.map(review => `
            <div class="review-card">
                <div class="rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                <h4>${review.user}</h4>
                <p>${review.comment}</p>
            </div>
        `).join('');
    }
}

// Back to product list - Modified to redirect to shop.html
    function showProductList() {
        window.location.href = 'shop.html';
    
    // Show product grid and hide detail view
    const productGrid = document.getElementById('productGrid');
    const productDetail = document.getElementById('productDetail');
    
    if (productGrid) productGrid.style.display = 'grid';
    if (productDetail) productDetail.style.display = 'none';
}

// Add to cart functionality
function addToCart() {
    const quantity = parseInt(document.getElementById('quantity').value);
    const productName = document.getElementById('productName').textContent;
    const productPrice = parseFloat(document.getElementById('productPrice').textContent.replace('Rs', ''));
    const productImage = document.getElementById('detailImage').src;


    let cart = JSON.parse(sessionStorage.getItem('ovazCart')) || [];
    
    const existingItemIndex = cart.findIndex(item => item.name === productName);
    
    if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += quantity;
    } else {

        cart.push({
            name: productName,
            price: productPrice,
            quantity: quantity,
            image: productImage
        });
    }    

    // Save back to sessionStorage
    sessionStorage.setItem('ovazCart', JSON.stringify(cart));
    
    alert(`${quantity} ${productName} added to cart!`);
}
renderProducts();

// Handle browser back/forward buttons
window.addEventListener('popstate', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId) {
        showProductDetail(parseInt(productId));
    } else {
        showProductList();
    }
});

// Render all products
function renderProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    
    // In your renderProducts function, change the onclick handler to:
    grid.innerHTML = products.map(product => `
        <div class="product-card" onclick="showProductDetail(${product.id}); return false;">
            <img src="${product.image}" class="product-image" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="price">Rs${product.price.toLocaleString()}</div>
        </div>
    `).join('');
    }