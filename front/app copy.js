document.addEventListener('DOMContentLoaded', () => {

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
            });

            productList.appendChild(card);
        });
    }

    // Function to log events
    async function logEvent(action, productId) {
        const agent = navigator.userAgent;
        const data = {
            action,
            productId,
            timestamp: new Date(),
            agent
        };

        try {
            const response = await fetch('http://localhost:3000/log', {
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

    // Function to log visit at the start of a new session
    function logSessionVisit() {
        if (!sessionStorage.getItem('visited')) {
            logEvent('visit', 'home');  // Log the visit when session starts
            sessionStorage.setItem('visited', 'true'); // Set flag in sessionStorage
        }
    }

    // Call fetchProducts once, on DOMContentLoaded
    fetchProducts();

    // Log the visit at the start of the session
    logSessionVisit();
});
