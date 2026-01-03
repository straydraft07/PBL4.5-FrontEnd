import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RequestedItems() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user")) || null;
    const isAuthorized = user?.IsAdmin || user?.IsStaff;

    const [showResolveModal, setShowResolveModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [awardUsername, setAwardUsername] = useState("");
    const [query, setQuery] = useState("");


    const openResolveModal = (item) => {
        setSelectedItem(item);
        setAwardUsername("");
        setShowResolveModal(true);
    };

    const closeResolveModal = () => {
        setShowResolveModal(false);
        setSelectedItem(null);
    };

    const handleResolveConfirm = async () => {
        if (!awardUsername || !selectedItem) {
            alert("Please enter a username.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/item/reward_user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    itemId: selectedItem.id,
                    username: awardUsername
                })
            });

            if (response.ok) {
                alert("Item resolved and reward issued.");
                closeResolveModal();
                fetchData();
            } else {
                alert("Failed to resolve item.");
            }
        } catch (err) {
            console.error(err);
            alert("Server error while resolving item.");
        }
    };


    const mocks = [
        {
            id: "req-1",
            name: "iPhone 13",
            description: "Black case, cracked screen protector",
            location: "Student Union / Cafe",
            date: "Oct 26, 2023",
            bounty: 200,
        },
        {
            id: "req-2",
            name: "Blue Backpack",
            description: "Contains a chemistry textbook and a calculator",
            location: "Science Building Room 302",
            date: "Oct 27, 2023",
            bounty: 0,
        },
    ];

    const fetchData = async (searchQuery = "") => {
        try {
            setLoading(true);

            const response = await fetch(
                `http://localhost:8080/api/item/get_requested?search=${encodeURIComponent(searchQuery)}`
            );

            if (response.ok) {
                const backendData = await response.json();

                const formattedBackendData = backendData.map(backendItem => ({
                    id: backendItem.Item.itemId || Math.random(),
                    name: backendItem.Item?.Name || "No Name",
                    description: backendItem.Item?.Description || "No Description",
                    location: backendItem.LastLocation || "Unknown",
                    date: backendItem.LastDate,
                    bounty: backendItem.Bounty,
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

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h1 style={styles.title}>Requested Items</h1>
                <p style={styles.subtitle}>Browse items reported as lost or requested</p>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        fetchData(query);
                    }}
                    style={styles.searchForm}
                >
                    <input
                        type="text"
                        placeholder="Search requested items..."
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
                                <div style={styles.cardContent}>
                                    <h3 style={styles.itemTitle}>{item.name}</h3>
                                    <p style={styles.itemDesc}>{item.description}</p>

                                    <div style={styles.metaContainer}>
                                        <div style={styles.metaItem}>
                                            <span style={styles.metaLabel}>Last Seen:</span> {item.location}
                                        </div>
                                        <div style={styles.metaItem}>
                                            <span style={styles.metaLabel}>Date Reported:</span> {item.date}
                                        </div>
                                        <div style ={styles.metaItem}>
                                            <span style={styles.metaLabel}>Bounty:</span> ${item.bounty}
                                        </div>
                                        {isAuthorized && (
                                            <button
                                                onClick={() => openResolveModal(item)}
                                                style={styles.resolveButton}
                                            >
                                                Resolve
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={styles.empty}>No requested items at this time.</p>
                    )}
                </div>

                {showResolveModal && (
                    <div style={styles.modalOverlay}>
                        <div style={styles.modal}>
                            <h3 style={{ marginBottom: "12px" }}>Resolve Item</h3>

                            <p style={{ fontSize: "14px", marginBottom: "8px" }}>
                                Award bounty for: <strong>{selectedItem?.name}</strong>
                            </p>

                            <input
                                type="text"
                                placeholder="User to award"
                                value={awardUsername}
                                onChange={(e) => setAwardUsername(e.target.value)}
                                style={styles.input}
                            />

                            <div style={styles.modalActions}>
                                <button
                                    onClick={handleResolveConfirm}
                                    style={styles.confirmButton}
                                >
                                    Confirm
                                </button>
                                <button
                                    onClick={closeResolveModal}
                                    style={styles.cancelButton}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

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

    resolveButton: {
        marginTop: "12px",
        padding: "8px 12px",
        background: "#10b981",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "12px",
        fontWeight: "600"
    },

    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000
    },

    modal: {
        background: "#fff",
        padding: "24px",
        borderRadius: "12px",
        width: "320px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
    },

    input: {
        width: "100%",
        padding: "8px",
        marginBottom: "16px",
        borderRadius: "6px",
        border: "1px solid #d1d5db"
    },

    modalActions: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px"
    },

    confirmButton: {
        background: "#10b981",
        color: "#fff",
        border: "none",
        padding: "8px 14px",
        borderRadius: "6px",
        cursor: "pointer"
    },

    cancelButton: {
        background: "#e5e7eb",
        border: "none",
        padding: "8px 14px",
        borderRadius: "6px",
        cursor: "pointer"
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
        flexDirection: "column",
        minHeight: "180px" // Adjusted height since images are gone
    },
    cardContent: {
        padding: "20px",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column"
    },
    itemTitle: {
        fontSize: "18px",
        marginBottom: "8px",
        fontWeight: "bold",
        color: "#111827"
    },
    itemDesc: {
        fontSize: "14px",
        color: "#4b5563",
        marginBottom: "20px",
        lineHeight: "1.5"
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
        color: "#6b7280",
        gridColumn: "1 / -1",
        marginTop: "40px"
    },
    backButton: {
        marginTop: "40px",
        background: "#000",
        color: "#fff",
        border: "none",
        padding: "12px 24px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "500"
    }
};

export default RequestedItems;