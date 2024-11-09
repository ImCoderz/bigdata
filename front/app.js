document.addEventListener('DOMContentLoaded', () => {

    const content = document.getElementById('content');

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
        const productList = document.getElementById('product-list');
        productList.innerHTML = ''; // Clear previous content

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.title}" class="product-image"/>
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
                e.preventDefault(); // Prevent the default action of the button
                logEvent('click', product.id);
                // Navigate to product detail page
                window.location.href = `product-detail.html?id=${product.id}`;
            });
            
            // card.addEventListener('click', (e) => {
            //     e.preventDefault(); // Prevent the default action of the button
            //     logEvent('click', product.id);
            // });

            productList.appendChild(card);
        });
    }

    // Function to log visit events (for route changes)
    async function logVisit(route) {
        const agent = navigator.userAgent;
        const data = {
            action: 'visit',
            route,
            timestamp: new Date(),
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

    // Function to log interaction events
    async function logEvent(action, productId) {
        const agent = navigator.userAgent;
        const data = {
            action,
            productId,
            timestamp: new Date(),
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

    // Function to load home content
    function loadHome() {
        content.innerHTML = '<h2>Welcome to the Home Page</h2>';
    }

    // Function to load products
    function loadProducts() {
        content.innerHTML = '<div id="product-list" class="product-grid"></div>';
        fetchProducts(); // Fetch and display products
    }

    // Function to load contact content
    function loadContact() {
        content.innerHTML = '<h2>Contact Us at example@example.com</h2>';
    }

    // Add event listeners to navbar links
    document.getElementById('home-link').addEventListener('click', (e) => {
        e.preventDefault();
        loadHome();
        logVisit('home');
    });

    document.getElementById('products-link').addEventListener('click', (e) => {
        e.preventDefault();
        loadProducts();
        logVisit('products');
    });

    document.getElementById('contact-link').addEventListener('click', (e) => {
        e.preventDefault();
        loadContact();
        logVisit('contact');
    });

    // Initial load: Home page
    loadHome();
    logVisit('home');
});
