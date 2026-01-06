import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FoundItems() {
    const navigate = useNavigate();
        const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user")) || null;
    const isAuthorized = user?.IsAdmin || user?.IsStaff;
    const [query, setQuery] = useState("");


    const mocks = [
        {
            id: "mock-1",
            name: "Keys",
            description: "Blue keychain near library",
            location: "Main Library - Level 2",
            date: "Oct 24, 2023",
            imageUrl: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=400",
        },
        {
            id: "mock-2",
            name: "Water Bottle",
            description: "Black Hydroflask",
            location: "Gym Locker Room",
            date: "Oct 25, 2023",
            imageUrl: null,
        },
    ];

    const fetchData = async (searchQuery = "") => {
        try {
            setLoading(true);

            const response = await fetch(
                `http://localhost:8080/api/item/get_found?query=${encodeURIComponent(searchQuery)}`
            );


            if (response.ok) {
                const backendData = await response.json();

                const formattedBackendData = backendData.map(backendItem => ({
                    id: backendItem.Item?.itemId || Math.random().toString(),
                    name: backendItem.Item?.Name || "No Name",
                    description: backendItem.Item?.Description || "No Description",
                    location: backendItem.LocationFound,
                    date: backendItem.Date,
                    imageUrl: backendItem.ImageURL
                }));

                setItems([...formattedBackendData]);
            } else {
                setItems(mocks);
            }
        } catch (error) {
            console.error("Connection error:", error);
            setItems(mocks);
        } finally {
            setLoading(false);
        }
    };


    const handleDelete = async (itemId) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;

        try {
            const response = await fetch(`http://localhost:8080/api/item/delete_found/${itemId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setItems(items.filter(item => item.id !== itemId));
                alert("Item deleted successfully");
            }
        } catch (error) {
            alert("Error deleting item");
        }
    };

    const handleClaim = async (itemId) => {
        const item = items.find(i => i.id === itemId);
        if (!item) return;

        const payload = {
            itemID: item.id,
            userID: user.userId,
            ClaimedDate: new Date().toISOString().split("T")[0],
        };

        try {
            const response = await fetch("http://localhost:8080/api/item/post_claim", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert("Claim request submitted!");
                await fetchData();
            } else {
                alert("Claim failed");
            }
        } catch (error) {
            alert("Error submitting claim");
        }
    };

    useEffect(() => {
        fetchData(query);
    }, [query]);


    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h1 style={styles.title}>Found Items</h1>
                <p style={styles.subtitle}>Browse items that have been found</p>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        fetchData(query);
                    }}
                    style={styles.searchForm}
                >
                    <input
                        type="text"
                        placeholder="Search by name, description, or location..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        style={styles.searchInput}
                    />
                    <button type="submit" style={styles.searchButton}>
                        Search
                    </button>
                </form>


                <div style={styles.grid}>
                    {items.length > 0 ? (
                        items.map((item) => (
                            <div key={item.id} style={styles.card}>
                                {item.imageUrl ? (
                                    <img src={item.imageUrl} alt={item.name} style={styles.itemImage} />
                                ) : (
                                    <div style={styles.imagePlaceholder}>No Image Available</div>
                                )}

                                <div style={styles.cardContent}>
                                    <h3 style={styles.itemTitle}>{item.name}</h3>
                                    <p style={styles.itemDesc}>{item.description}</p>

                                    <div style={styles.metaContainer}>
                                        <div style={styles.metaItem}>
                                            <span style={styles.metaLabel}>Location:</span> {item.location}
                                        </div>
                                        <div style={styles.metaItem}>
                                            <span style={styles.metaLabel}>Date:</span> {item.date}
                                        </div>
                                    </div>

                                    {/* --- ADDED BUTTON GROUP HERE --- */}
                                    <div style={styles.buttonGroup}>
                                        <button
                                            onClick={() => handleClaim(item.id)}
                                            style={styles.claimButton}
                                        >
                                            Claim
                                        </button>

                                        {isAuthorized && (
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                style={styles.deleteButton}
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                    {/* ------------------------------ */}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={styles.empty}>No items found.</p>
                    )}
                </div>

                <button onClick={() => navigate("/dashboard")} style={styles.backButton}>
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
}

const styles = {

    searchForm: {
        display: "flex",
        gap: "10px",
        marginBottom: "30px"
    },
    searchInput: {
        flex: 1,
        padding: "10px 12px",
        borderRadius: "8px",
        border: "1px solid #d1d5db",
        fontSize: "14px"
    },
    searchButton: {
        padding: "10px 16px",
        backgroundColor: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "600"
    },

    buttonGroup: {
        display: "flex",
        gap: "10px",
        marginTop: "15px"
    },
    claimButton: {
        flex: 1,
        padding: "8px",
        backgroundColor: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "600"
    },
    deleteButton: {
        padding: "8px 12px",
        backgroundColor: "#ef4444",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "600"
    },
    page: {
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f3f4f6, #e5e7eb)",
        padding: "40px"
    },
    container: {
        maxWidth: "1000px",
        margin: "0 auto"
    },
    title: {
        fontSize: "32px",
        marginBottom: "6px"
    },
    subtitle: {
        fontSize: "14px",
        color: "#6b7280",
        marginBottom: "32px"
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px"
    },
    card: {
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column"
    },
    itemImage: {
        width: "100%",
        height: "160px",
        objectFit: "cover"
    },
    imagePlaceholder: {
        height: "160px",
        background: "linear-gradient(135deg, #e5e7eb, #f3f4f6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#9ca3af",
        fontSize: "14px",
        fontWeight: "500"
    },
    cardContent: {
        padding: "16px",
        flexGrow: 1
    },
    itemTitle: {
        fontSize: "18px",
        marginBottom: "6px",
        fontWeight: "bold"
    },
    itemDesc: {
        fontSize: "14px",
        color: "#4b5563",
        marginBottom: "16px"
    },
    metaContainer: {
        borderTop: "1px solid #f3f4f6",
        paddingTop: "12px",
        marginTop: "auto"
    },
    metaItem: {
        fontSize: "12px",
        color: "#6b7280",
        marginBottom: "4px"
    },
    metaLabel: {
        fontWeight: "600",
        color: "#374151"
    },
    empty: {
        textAlign: "center",
        color: "#6b7280"
    },
    backButton: {
        marginTop: "40px",
        background: "#000",
        color: "#fff",
        border: "none",
        padding: "12px 24px",
        borderRadius: "8px",
        cursor: "pointer"
    }
};

export default FoundItems;