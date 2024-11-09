document.addEventListener('DOMContentLoaded', () => {
    // Log visit for the home page
    logVisit('home');
    
    // Function to log visit events
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
});
