export const getRequested = async (username, password) => {
    const url = 'http://localhost:8080/api/login';

    // Some filtering

    try {
        console.log("Sending login request:", loginData.username, loginData.password);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (response.ok) {
            const userData = await response.json();
            console.log('Login successful:', userData);
            return userData;
        } else if (response.status === 401) {
            alert("Invalid username or password.");
            return null;
        } else if (response.status === 403) {
            alert("You do not have permission to access this.");
            return null;
        } else {
            alert("Server error. Please try again later.");
            return null;
        }
    } catch (error) {
        console.error('Network or server error:', error);
        alert(`Network Error: Could not connect to the server.`);
        return null;
    }
};