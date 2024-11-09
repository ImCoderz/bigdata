document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');

    // Log visit for the products page
    logVisit('products');

    // Function to fetch products from an API
    async function fetchProducts() {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const products = await response.json();
            displayProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    // Function to display products in cards
    function displayProducts(products) {
        productList.innerHTML = ''; // Clear previous content

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}" class="product-image"/>
                </div>
                <div class="card-content">
                    <h3>${product.title}</h3>
                    <p>$${product.price}</p>
                    <button class="buy-btn">Buy Now</button>
                </div>
            `;

            // Add event listeners for hover, mouse out, and click
            card.addEventListener('mouseenter', () => logEvent('hover', product.id));
            card.addEventListener('mouseleave', () => logEvent('mouse out', product.id));
            card.addEventListener('click', (e) => {
                e.preventDefault();
                logEvent('click', product.id+": "+product.title+" : "+product.price);
                // Navigate to product detail page
                window.location.href = `product-detail.html?id=${product.id}`;
            });

            productList.appendChild(card);
        });
    }

    async function logVisit(route) {
        const agent = navigator.userAgent;
        const data = {
            timestamp: new Date(),
            action: 'visit',
            route,
            agent
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

    // Function to log event interactions
    async function logEvent(action, productId) {
        const agent = navigator.userAgent;
        const data = {
            timestamp: new Date(),
            action,
            productId,
            agent
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

    // Fetch and display products
    fetchProducts();
});
