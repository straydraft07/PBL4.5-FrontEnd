import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
      { id: 6, name: "Backpack", description: "North Face, black" }
    ];
    setItems(mockData);
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Found Items</h1>
        <p style={styles.subtitle}>
          Browse items that have been found
        </p>

        <div style={styles.grid}>
          {items.length > 0 ? (
            items.map((item, index) => (
              <div key={item.id} style={styles.card}>
                <div style={styles.imagePlaceholder}>
                  Item {index + 1}
                </div>
                <div style={styles.cardContent}>
                  <h3 style={styles.itemTitle}>{item.name}</h3>
                  <p style={styles.itemDesc}>{item.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p style={styles.empty}>No items found.</p>
          )}
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
    boxShadow: "0 10px 20px rgba(0,0,0,0.05)"
  },
  imagePlaceholder: {
    height: "160px",
    background: "linear-gradient(135deg, #e5e7eb, #f3f4f6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#9ca3af",
    fontSize: "20px"
  },
  cardContent: {
    padding: "16px"
  },
  itemTitle: {
    fontSize: "18px",
    marginBottom: "6px"
  },
  itemDesc: {
    fontSize: "14px",
    color: "#6b7280"
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
