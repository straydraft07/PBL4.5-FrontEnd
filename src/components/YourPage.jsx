import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function YourPage() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user")) || null;
    const [claimedItems, setClaimedItems] = useState([]);
    const [requestedItems, setRequestedItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        Promise.all([fetchClaimData(), fetchRequestedData()])
            .finally(() => setLoading(false));
    }, []);

    const fetchClaimData = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/item/get_claim?query=", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                const backendData = await response.json();
                const formatted = backendData.map(item => ({
                    id: item.id || crypto.randomUUID(),
                    name: item.Item?.Name || "No Name",
                    description: item.Item?.Description || "No Description",
                    status: "Claimed"
                }));
                setClaimedItems(formatted);
            }
        } catch (err) {
            console.error("Claim fetch error:", err);
        }
    };


    const fetchRequestedData = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/item/get_requested?query=", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                const backendData = await response.json();
                const formatted = backendData.map(item => ({
                    id: item.id || crypto.randomUUID(),
                    name: item.Item?.Name || "No Name",
                    description: item.Item?.Description || "No Description",
                    status: "Requested"
                }));
                setRequestedItems(formatted);
            }
        } catch (err) {
            console.error("Request fetch error:", err);
        }
    };

    const renderItems = (items) => (
        items.length > 0 ? (
            items.map(item => (
                <div key={item.id} style={styles.card}>
                    <div style={styles.cardContent}>
                        <h3 style={styles.itemTitle}>{item.name}</h3>
                        <p style={styles.itemDesc}>{item.description}</p>
                        <span style={styles.statusBadge}>{item.status}</span>
                    </div>
                </div>
            ))
        ) : (
            <p style={styles.empty}>No items here.</p>
        )
    );

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h1 style={styles.title}>Your Activity</h1>
                <p style={styles.subtitle}>Manage your reported and claimed items</p>

                <div style={styles.profileSection}>
                    <p style={{ margin: "5px 0" }}>
                        <strong>Logged in as:</strong> {user?.username}
                    </p>
                    <p style={{ margin: "5px 0" }}>
                        <strong>Role:</strong>{" "}
                        {user?.IsAdmin ? "Admin" : user?.IsStaff ? "Staff" : "User"}
                    </p>
                    <p style={{ margin: "5px 0" }}>
                        <strong>Bounty Credit:</strong> $0
                    </p>
                </div>

                {/* ---- CLAIMED ITEMS ---- */}
                <h2 style={{ marginBottom: "12px" }}>Your Claims</h2>
                <div style={styles.grid}>
                    {renderItems(claimedItems)}
                </div>

                {/* ---- REQUESTED ITEMS ---- */}
                <h2 style={{ marginTop: "40px", marginBottom: "12px" }}>
                    Your Requests
                </h2>
                <div style={styles.grid}>
                    {renderItems(requestedItems)}
                </div>

                <button
                    onClick={() => navigate("/dashboard")}
                    style={styles.backButton}
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
}

const styles = {
    // --- LAYOUT STYLES (REQUIRED FOR ALL PAGES) ---
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
    empty: {
        textAlign: "center",
        color: "#6b7280",
        gridColumn: "1 / -1",
        padding: "40px"
    },
    backButton: {
        marginTop: "40px",
        background: "#000",
        color: "#fff",
        border: "none",
        padding: "12px 24px",
        borderRadius: "8px",
        cursor: "pointer"
    },

    // --- YOURPAGE SPECIFIC STYLES ---
    profileSection: {
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "20px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        border: "1px solid #e5e7eb"
    },
    statusBadge: {
        display: "inline-block",
        padding: "4px 8px",
        background: "#fef3c7",
        color: "#92400e",
        borderRadius: "4px",
        fontSize: "12px",
        fontWeight: "bold"
    }
};

export default YourPage;