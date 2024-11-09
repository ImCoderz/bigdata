document.addEventListener('DOMContentLoaded', () => {
    const productDetail = document.getElementById('product-detail');

    // Log visit for the product detail page
    //logVisit('product-detail');

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

    function displayProductDetail(product) {
        productDetail.innerHTML = `
            <div class="detail-card">
                <img src="${product.image}" alt="${product.title}" class="product-detail-image"/>
                <div class="product-detail-content">
                    <h3>${product.title}</h3>
                    <p>${product.description}</p>
                    <p><strong>Price: $${product.price}</strong></p>
                    <button id="buy-now-btn">Buy Now</button>
                </div>
            </div>
        `;

        // Add event listener for "Buy Now" button
        const buyNowBtn = document.getElementById('buy-now-btn');
        buyNowBtn.addEventListener('click', () => logEvent('buy', product.title, 1, product.price));
    }

    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    if (productId) {
        fetchProductDetail(productId);
    } else {
        productDetail.innerHTML = '<p>No product ID provided.</p>';
    }

    async function logVisit(route) {
        const data = {
            timestamp: new Date(),
            product: "",    
            quantity: "",   
            price: "",      
            route
        };

        try {
            const response = await fetch('http://localhost:3000/logVisit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                console.error('Failed to log visit:', response.statusText);
            }
        } catch (error) {
            console.error('Error logging visit:', error);
        }
    }

    async function logEvent(action, product, quantity, price) {
        const data = {
            timestamp: new Date(),
            action,
            product,
            quantity,
            price,
            route: 'product-detail'
        };

        try {
            const response = await fetch('http://localhost:3000/logEvent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                console.error('Failed to log event:', response.statusText);
            }
        } catch (error) {
            console.error('Error logging event:', error);
        }
    }
});
