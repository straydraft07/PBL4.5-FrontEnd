import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RequestedItems() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
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

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Requested Items</h1>
        <p style={styles.subtitle}>
          Requests submitted by users who lost their items
        </p>

        <div style={styles.list}>
          {items.map((item) => (
            <div
              key={item.id}
              style={styles.listItem}
              onClick={() => setSelectedItem(item)}
            >
              <div>
                <h3 style={styles.itemName}>{item.name}</h3>
                <p style={styles.description}>{item.description}</p>
              </div>

              <div style={styles.meta}>
                <span>{item.owner}</span>
                <span>{item.date}</span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          style={styles.backButton}
        >
          Back to Dashboard
        </button>
      </div>

      {/* MODAL */}
      {selectedItem && (
        <div
          style={styles.modalOverlay}
          onClick={() => setSelectedItem(null)}
        >
          <div
            style={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginBottom: "16px" }}>
              Request Details
            </h2>

            <p><strong>Item:</strong> {selectedItem.name}</p>
            <p><strong>Description:</strong> {selectedItem.description}</p>
            <p><strong>Requested by:</strong> {selectedItem.owner}</p>
            <p><strong>Date:</strong> {selectedItem.date}</p>

            <button
              style={styles.closeButton}
              onClick={() => setSelectedItem(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
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
    maxWidth: "800px",
    margin: "0 auto"
  },
  title: {
    fontSize: "32px",
    marginBottom: "6px"
  },
  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "30px"
  },
  list: {
    background: "#fff",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    overflow: "hidden"
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px 20px",
    borderBottom: "1px solid #e5e7eb",
    cursor: "pointer",
    transition: "background 0.15s"
  },
  itemName: {
    fontSize: "16px",
    marginBottom: "4px"
  },
  description: {
    fontSize: "13px",
    color: "#6b7280"
  },
  meta: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    fontSize: "12px",
    color: "#9ca3af"
  },
  backButton: {
    marginTop: "30px",
    background: "#000",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    cursor: "pointer"
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000
  },
  modalContent: {
    background: "#fff",
    padding: "24px",
    borderRadius: "16px",
    width: "90%",
    maxWidth: "400px"
  },
  closeButton: {
    marginTop: "20px",
    width: "100%",
    padding: "12px",
    background: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }
};

export default RequestedItems;
