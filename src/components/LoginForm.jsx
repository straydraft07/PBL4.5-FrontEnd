import React, { useState } from 'react';
import { handleLogin } from '../services/authService';
import { useNavigate } from 'react-router-dom';
function LoginForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }

        setIsLoading(true);

        const success = await handleLogin(username, password);

        setIsLoading(false);

        if (success) {

            const userData = { name: username, role: 'admin' };

            localStorage.setItem('user', JSON.stringify(userData));

            navigate('/dashboard');

            alert('Login Successful! Welcome.');

        } else {
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', maxWidth: '400px', margin: '50px auto' }}>
            <h2>User Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <div style={{ marginTop: '10px' }}>
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    style={{ marginTop: '20px', padding: '10px', backgroundColor: isLoading ? '#aaa' : '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                    {isLoading ? 'Logging In...' : 'Log In'}
                </button>
            </form>
        </div>
    );
}

export default LoginForm;