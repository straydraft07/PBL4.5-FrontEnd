import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RequestedItems() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    // State to track the selected item for the popup
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const mockData = [
            { id: 1, name: "Keys", description: "Blue keychain near library", owner: "John Doe", date: "2023-10-01" },
            { id: 2, name: "Laptop", description: "Silver MacBook", owner: "Jane Smith", date: "2023-10-02" },
            { id: 3, name: "Wallet", description: "Brown leather", owner: "Bob Wilson", date: "2023-10-03" },
            { id: 4, name: "Water Bottle", description: "Hydroflask", owner: "Alice Brown", date: "2023-10-04" },
            { id: 5, name: "Glasses", description: "Rayban frames", owner: "Charlie Davis", date: "2023-10-05" },
        ];
        setItems(mockData);
    }, []);

    const containerStyle = { padding: '20px', maxWidth: '500px', margin: '50px auto', border: '1px solid #ccc', borderRadius: '8px' };
    const scrollMenuStyle = { maxHeight: '300px', overflowY: 'auto', border: '1px solid #eee', borderRadius: '4px', padding: '10px', backgroundColor: '#f9f9f9' };

    const itemStyle = {
        padding: '15px',
        borderBottom: '1px solid #ddd',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'background 0.2s'
    };

    const modalOverlayStyle = {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    };

    const modalContentStyle = {
        backgroundColor: 'white', padding: '30px', borderRadius: '10px', width: '80%', maxWidth: '400px', position: 'relative'
    };

    return (
        <div style={containerStyle}>
            <h2>Requested Items</h2>

            <div style={scrollMenuStyle}>
                {items.map(item => (
                    <div
                        key={item.id}
                        style={itemStyle}
                        onClick={() => setSelectedItem(item)} // Set the item to open modal
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        <strong>{item.name}</strong>
                        <small>{item.description}</small>
                    </div>
                ))}
            </div>

            {/* --- THE POPUP (MODAL) --- */}
            {selectedItem && (
                <div style={modalOverlayStyle} onClick={() => setSelectedItem(null)}>
                    <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                        <h3>Item Details</h3>
                        <p><strong>Name:</strong> {selectedItem.name}</p>
                        <p><strong>Description:</strong> {selectedItem.description}</p>
                        <p><strong>Requested By:</strong> {selectedItem.owner}</p>
                        <p><strong>Date:</strong> {selectedItem.date}</p>

                        <button
                            onClick={() => setSelectedItem(null)}
                            style={{ marginTop: '20px', padding: '10px', width: '100%', cursor: 'pointer' }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <button
                onClick={() => navigate('/dashboard')}
                style={{ marginTop: '20px', cursor: 'pointer', padding: '10px 20px' }}
            >
                Back to Dashboard
            </button>
        </div>
    );
}

export default RequestedItems;