import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FoundItems() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);

    useEffect(() => {
        const mockData = [
            { id: 1, name: "Keys", description: "Blue keychain near library" },
            { id: 2, name: "Laptop", description: "Silver MacBook" },
            { id: 3, name: "Wallet", description: "Brown leather" },
            { id: 4, name: "Water Bottle", description: "Hydroflask" },
            { id: 5, name: "Glasses", description: "Rayban frames" },
            { id: 6, name: "Backpack", description: "North Face, black" },
        ];
        setItems(mockData);
    }, []);

    const containerStyle = {
        padding: '20px',
        maxWidth: '500px',
        margin: '50px auto',
        border: '1px solid #ccc',
        borderRadius: '8px'
    };

    const scrollMenuStyle = {
        maxHeight: '300px', // Limits height
        overflowY: 'auto',   // Enables vertical scroll
        border: '1px solid #eee',
        borderRadius: '4px',
        padding: '10px',
        backgroundColor: '#f9f9f9'
    };

    const itemStyle = {
        padding: '15px',
        borderBottom: '1px solid #ddd',
        display: 'flex',
        flexDirection: 'column'
    };

    return (
        <div style={containerStyle}>
            <h2>Requested Items</h2>

            <div style={scrollMenuStyle}>
                {items.length > 0 ? (
                    items.map(item => (
                        <div key={item.id} style={itemStyle}>
                            <strong>{item.name}</strong>
                            <small>{item.description}</small>
                        </div>
                    ))
                ) : (
                    <p>No items found.</p>
                )}
            </div>

            <button
                onClick={() => navigate('/dashboard')}
                style={{ marginTop: '20px', cursor: 'pointer', padding: '10px 20px' }}
            >
                Back to Dashboard
            </button>
        </div>
    );
}

export default FoundItems;