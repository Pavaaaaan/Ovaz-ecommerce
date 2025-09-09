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
        id: 5,
        name: "Women's Kurtha",
        price: 899,
        category: "women",
        size: ["s", "m", "l"],
        color: "Yellow",
        image: "images/product5.jpg",
        description: "Stylish and Beautiful"
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
    {
        id: 8,
        name: "Levis Jeans",
        price: 1799,
        category: "men",
        size: ["s", "m", "l"],
        color: "Blue",
        image: "images/product8.jpg",
        description: "Stylish"
    },
    {
        id: 10,
        name: "Wallet",
        price: 599,
        category: "accessories",
        size: ["s", "m", "l"],
        color: "Black",
        image: "images/product10.jpg",
        description: "New Arrival"
        
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

// Function to apply filters
function applyFilters() {
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);
    const selectedSizes = Array.from(document.querySelectorAll('input[name="size"]:checked')).map(cb => cb.value);
    const selectedColors = Array.from(document.querySelectorAll('input[name="color"]:checked')).map(cb => cb.value);
    const selectedPrice = document.querySelector('input[name="price"]:checked')?.value;
    
    const filteredProducts = products.filter(product => {
        // Category filter
        if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
            return false;
        }
        
        // Size filter
        if (selectedSizes.length > 0 && !selectedSizes.some(size => product.size.includes(size))) {
            return false;
        }
        
        // Color filter
        if (selectedColors.length > 0 && !selectedColors.includes(product.color)) {
            return false;
        }
        
        // Price filter
        if (selectedPrice) {
            const [minPrice, maxPrice] = selectedPrice.split('-').map(Number);
            if (product.price < minPrice || product.price > maxPrice) {
                return false;
            }
        }
        
        return true;
    });
    
    renderProducts(filteredProducts);
}

// Function to reset filters
function resetFilters() {
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
    renderProducts();
}

// Event listeners
document.getElementById('applyFilters').addEventListener('click', applyFilters);
document.getElementById('resetFilters').addEventListener('click', resetFilters);

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    
    document.querySelector('.search-bar button').addEventListener('click', function() {
        const searchTerm = document.querySelector('.search-bar input').value.toLowerCase();
        if (searchTerm) {
            const filtered = products.filter(product =>    
                product.name.toLowerCase().includes(searchTerm) || 
                product.description.toLowerCase().includes(searchTerm)
            );
            renderProducts(filtered);
        } else {
            renderProducts();
        }
    });
    
    document.querySelector('.search-bar input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.querySelector('.search-bar button').click();
        }
    });
});