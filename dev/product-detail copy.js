document.addEventListener('DOMContentLoaded', () => {
    const productDetail = document.getElementById('product-detail');

    // Function to fetch product details based on the ID from the URL
    async function fetchProductDetail(productId) {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch product details');
            }
            const product = await response.json();
            displayProductDetail(product);
        } catch (error) {
            console.error('Error fetching product details:', error);
            productDetail.innerHTML = '<p>Error loading product details.</p>';
        }
    }

    // Function to display product details
    function displayProductDetail(product) {
        productDetail.innerHTML = `
            <div class="detail-card">
                <img src="${product.image}" alt="${product.title}" class="product-detail-image"/>
                <div class="product-detail-content">
                    <h3>${product.title}</h3>
                    <p>${product.description}</p>
                    <p><strong>Price: $${product.price}</strong></p>
                    <button>Add to Cart</button>
                </div>
            </div>
        `;
    }

    // Get the product ID from the URL parameters
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    // Fetch and display the product detail if the ID exists
    if (productId) {
        fetchProductDetail(productId);
    } else {
        productDetail.innerHTML = '<p>No product ID provided.</p>';
    }
});
