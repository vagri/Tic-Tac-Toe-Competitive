window.startSingleplayerGame = async function() {
    try {
        const response = await fetch('http://localhost:8080/game/start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) throw new Error('Failed to start the game');

        return response.json(); // returns player info
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
};