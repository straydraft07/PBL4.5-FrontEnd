export const handleLogin = async (username, password) => {
    const url = 'http://localhost:8080/api/login';

    const loginData = {
        username: username,
        password: password,
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (response.ok) {
            const message = await response.text();
            console.log('Login successful:', message);
            alert(`Login Successful! Server message: ${message}`);
            return true;
        } else if (response.status === 401) {
            const error = await response.text();
            console.error('Login failed:', error);
            alert(`Login Failed: ${error}`);
            return false;
        } else {
            const error = await response.text();
            console.error('An unexpected error occurred:', error);
            alert(`Error: ${error}`);
            return false;
        }
    } catch (error) {
        console.error('Network or server error:', error);
        alert(`Network Error: Could not connect to the server.`);
        return false;
    }
};