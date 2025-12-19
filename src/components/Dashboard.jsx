import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate('/');
        }
    }, [navigate]);

    const buttonStyle = {
        display: 'block',
        width: '100%',
        padding: '10px',
        marginTop: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        textAlign: 'center'
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', maxWidth: '400px', margin: '50px auto' }}>
            <h2>Dashboard</h2>
            {user && <p>Welcome back, <strong>{user.name}</strong>!</p>}

            <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #eee' }} />

            {/* Navigation Buttons */}
            <button
                style={buttonStyle}
                onClick={() => navigate('/requested-items')}
            >
                View Requested Items
            </button>

            <button
                style={buttonStyle}
                onClick={() => navigate('/found-items')}
            >
                View Found Items
            </button>

            {/* Logout Button */}
            <button
                onClick={() => { localStorage.removeItem('user'); navigate('/'); }}
                style={{ ...buttonStyle, backgroundColor: '#dc3545', marginTop: '30px' }}
            >
                Log Out
            </button>
        </div>
    );
}

export default Dashboard;