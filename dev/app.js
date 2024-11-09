document.addEventListener('DOMContentLoaded', () => {
    // logVisit('home');

    async function logVisit(route) {
        const timestamp = new Date();
        const data = {
            timestamp,
            product: "",    // No product for route visits
            quantity: "",   // No quantity for route visits
            price: "",      // No price for route visits
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
});
