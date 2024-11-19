document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    
    // Log visit for the products page
    //logVisit('products');

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

    function displayProducts(products) {
        productList.innerHTML = '';

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

            // Log hover events
            card.addEventListener('mouseenter', () => logEvent('hover',  product.title, 1, product.price));
            card.addEventListener('mouseleave', () => logEvent('mouse out',  product.title, 1, product.price));

            // Handle "Buy Now" button click
            const buyBtn = card.querySelector('.buy-btn');
            buyBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                logEvent('buy', product.title, 1, product.price);
            });
            card.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = `product-detail.html?id=${product.id}`;
            });
            

            productList.appendChild(card);
        });
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
            route: 'products'
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

    fetchProducts();
});
