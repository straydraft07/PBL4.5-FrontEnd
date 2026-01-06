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

        console.log(username + password);
        const userData = await handleLogin(username, password);
        setIsLoading(false);

        if (userData != null) {
            localStorage.setItem('user', JSON.stringify(userData));
            navigate('/dashboard');
            alert('Login Successful! Welcome.');
        } else {
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <div style={styles.iconBox}>👤</div>
                    <h1 style={styles.title}>Welcome Back</h1>
                    <p style={styles.subtitle}>Enter your credentials to continue</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={styles.field}>
                        <label style={styles.label}>User ID</label>
                        <input
                            type="text"

                            value={username}

                            onChange={(e) => setUsername(e.target.value)}
                            style={styles.input}
                            placeholder="Enter your user ID"
                        />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            placeholder="Enter your password"
                        />
                    </div>

                    <button type="submit" style={styles.button} disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div style={styles.footer}>
                    <p style={styles.hint}>
                        Demo: Use any User ID <br />
                        Use <strong>admin</strong> for admin access
                    </p>
                </div>
            </div>
        </div>
    );
}



const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px'
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    background: '#fff',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
  },
  header: {
    textAlign: 'center',
    marginBottom: '24px'
  },
  iconBox: {
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    background: '#000',
    color: '#fff',
    fontSize: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px'
  },
  title: {
    fontSize: '24px',
    marginBottom: '8px'
  },
  subtitle: {
    color: '#6b7280',
    fontSize: '14px'
  },
  field: {
    marginBottom: '16px'
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    fontSize: '14px'
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #d1d5db'
  },
  button: {
    width: '100%',
    marginTop: '12px',
    padding: '12px',
    background: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  footer: {
    marginTop: '24px',
    textAlign: 'center'
  },
  hint: {
    fontSize: '13px',
    color: '#6b7280'
  }
};

export default LoginForm;
