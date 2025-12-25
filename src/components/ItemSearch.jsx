import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Field({ label, children }) {
  return (
    <div>
      <label style={styles.label}>{label}</label>
      {children}
    </div>
  );
}

function ItemSearch() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [dateLost, setDateLost] = useState("");

  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [saved, setSaved] = useState([]);

  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) navigate("/");
  }, [navigate]);

   const itemsDataBase =[
    { id: 1, name: "Keys", description: "Blue keychain near library", category: "Keys", location: "Library", dateLost: "2025-12-10" },
    { id: 2, name: "Laptop", description: "Silver MacBook", category: "Electronics", location: "Study Room", dateLost: "2025-12-15" },
    { id: 3, name: "Wallet", description: "Brown leather", category: "Wallet", location: "Cafeteria", dateLost: "2025-12-12" },
    { id: 4, name: "Water Bottle", description: "Hydroflask", category: "Bottle", location: "Gym", dateLost: "2025-12-18" },
    { id: 5, name: "Glasses", description: "Rayban frames", category: "Other", location: "Bus Stop", dateLost: "2025-12-20" },
    { id: 6, name: "Backpack", description: "North Face, black", category: "Other", location: "Library", dateLost: "2025-12-21" }
  ];

  
  useEffect(() => {
    const raw = localStorage.getItem("savedSearchCriteria");
    if (raw) setSaved(JSON.parse(raw));
  }, []);

  const saveToLocal = (next) => {
    setSaved(next);
    localStorage.setItem("savedSearchCriteria", JSON.stringify(next));
  };

  const saveCriteria = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const newOne = {
      id: Date.now(),
      user: user?.name || "User",
      keyword: keyword.trim(),
      category,
      location,
      dateLost,
      savedAt: new Date().toISOString()
    };
    saveToLocal([newOne, ...saved].slice(0, 10));
    alert("Saved.");
  };

  const removeSaved = (id) => saveToLocal(saved.filter((s) => s.id !== id));

  const clearFilters = () => {
    setKeyword("");
    setCategory("");
    setLocation("");
    setDateLost("");
    setResults([]);
    setHasSearched(false);
  };

  const onSearch = (e) => {
    e.preventDefault();
    setHasSearched(true);

    const kw = keyword.trim().toLowerCase();
    const filtered = itemsDataBase.filter((it) => {
      const hitKeyword =
        !kw ||
        it.name.toLowerCase().includes(kw) ||
        it.description.toLowerCase().includes(kw);

      const hitCategory = !category || it.category === category;
      const hitLocation = !location || it.location === location;
      const hitDate = !dateLost || it.dateLost === dateLost;

      return hitKeyword && hitCategory && hitLocation && hitDate;
    });

    setResults(filtered);
  };



  
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.iconBox}>🔎</div>
          <h1 style={styles.title}>Item Search</h1>
          <p style={styles.subtitle}>Search by keyword, category, location, and date.</p>
        </div>

        <form onSubmit={onSearch}>
          <div style={styles.grid}>
            <Field label="Keyword">
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={styles.input}
                placeholder="keys, wallet..."
              />
            </Field>

            <Field label="Category">
              <select value={category} onChange={(e) => setCategory(e.target.value)} style={styles.input}>
                <option value="">All</option>
                {["Keys", "Wallet", "Electronics", "Bottle", "Other"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>

            <Field label="Location">
              <select value={location} onChange={(e) => setLocation(e.target.value)} style={styles.input}>
                <option value="">All</option>
                {["Library", "Cafeteria", "Study Room", "Gym", "Bus Stop"].map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </Field>

            <Field label="Date Lost">
              <input type="date" value={dateLost} onChange={(e) => setDateLost(e.target.value)} style={styles.input} />
            </Field>
          </div>

          <div style={styles.actions}>
            <button type="submit" style={styles.btnPrimary}>Search</button>
            <button type="button" onClick={saveCriteria} style={styles.btnGhost}>Save Criteria</button>
            <button type="button" onClick={clearFilters} style={styles.btnGhost}>Clear</button>
            <button type="button" onClick={() => navigate("/dashboard")} style={styles.btnGhost}>Back</button>
          </div>
        </form>

        <Section title="Results">
          <div style={styles.box}>
            {!hasSearched ? (
              <p style={styles.muted}>Run a search to see results.</p>
            ) : results.length === 0 ? (
              <p style={styles.muted}>No Result Found.</p>
            ) : (
              results.map((it) => (
                <div
                  key={it.id}
                  style={styles.itemRow}
                  onClick={() => setSelectedItem(it)}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <div style={styles.itemTop}>
                    <strong>{it.name}</strong>
                    <span style={styles.badge}>{it.category}</span>
                  </div>
                  <div style={styles.small}>{it.location} • {it.dateLost}</div>
                  <div style={styles.smallMuted}>{it.description}</div>
                </div>
              ))
            )}
          </div>
        </Section>

        <Section title="Saved Searches">
          <div style={{ ...styles.box, background: "#fff" }}>
            {saved.length === 0 ? (
              <p style={styles.muted}>No saved criteria.</p>
            ) : (
              saved.map((s) => (
                <div key={s.id} style={styles.savedRow}>
                  <div style={{ flex: 1 }}>
                    <div style={styles.small}>
                      <strong>{s.user}</strong>{" "}
                      <span style={styles.smallMuted}>({new Date(s.savedAt).toLocaleString()})</span>
                    </div>
                    <div style={styles.smallMuted}>
                      Keyword: {s.keyword || "-"} • Category: {s.category || "All"} • Location: {s.location || "All"} • Date: {s.dateLost || "-"}
                    </div>
                  </div>
                  <button onClick={() => removeSaved(s.id)} style={styles.deleteBtn} title="Remove">✕</button>
                </div>
              ))
            )}
          </div>
        </Section>
      </div>

      {selectedItem && (
        <div style={styles.modalOverlay} onClick={() => setSelectedItem(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0 }}>Item Details</h3>
            <p><strong>Name:</strong> {selectedItem.name}</p>
            <p><strong>Category:</strong> {selectedItem.category}</p>
            <p><strong>Location:</strong> {selectedItem.location}</p>
            <p><strong>Date Lost:</strong> {selectedItem.dateLost}</p>
            <p><strong>Description:</strong> {selectedItem.description}</p>

            <button onClick={() => setSelectedItem(null)} style={{ ...styles.btnGhost, width: "100%", marginTop: 10 }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginTop: 22 }}>
      <h3 style={{ margin: "0 0 10px", fontSize: 16 }}>{title}</h3>
      {children}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f3f4f6, #e5e7eb)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "30px 20px"
  },
  card: {
    width: "100%",
    maxWidth: 900,
    background: "#fff",
    borderRadius: 16,
    padding: 28,
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
  },
  header: { textAlign: "center", marginBottom: 18 },
  iconBox: {
    width: 56, height: 56, borderRadius: 12,
    background: "#000", color: "#fff", fontSize: 24,
    display: "flex", alignItems: "center", justifyContent: "center",
    margin: "0 auto 16px"
  },
  title: { fontSize: 24, marginBottom: 6 },
  subtitle: { color: "#6b7280", fontSize: 14, margin: 0 },

  grid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 18 },
  label: { display: "block", marginBottom: 8, fontSize: 14 },

  input: {
    width: "100%",
    height: 44,
    padding: "0 12px",
    borderRadius: 10,
    border: "1px solid #d1d5db",
    background: "#fff",
    boxSizing: "border-box",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    fontSize: 14,
    lineHeight: "44px"
  },

  actions: { display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 },
  btnPrimary: { padding: "12px 14px", background: "#000", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" },
  btnGhost: { padding: "12px 14px", background: "transparent", color: "#000", border: "1px solid #d1d5db", borderRadius: 8, cursor: "pointer" },

  box: { border: "1px solid #eee", borderRadius: 10, background: "#fafafa", padding: 10, maxHeight: 320, overflowY: "auto" },
  muted: { color: "#6b7280", fontSize: 14, margin: 0, padding: 10 },

  itemRow: { padding: 12, borderBottom: "1px solid #e5e7eb", borderRadius: 8, cursor: "pointer", transition: "background 0.2s" },
  itemTop: { display: "flex", justifyContent: "space-between", gap: 12 },

  badge: { fontSize: 12, padding: "4px 8px", borderRadius: 999, border: "1px solid #d1d5db", color: "#374151", background: "#fff", whiteSpace: "nowrap" },
  small: { fontSize: 12, marginTop: 6 },
  smallMuted: { fontSize: 12, marginTop: 6, color: "#6b7280" },

  savedRow: { display: "flex", alignItems: "center", gap: 10, padding: 10, borderBottom: "1px solid #f0f0f0" },
  deleteBtn: { width: 34, height: 34, borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer" },

  modalOverlay: {
    position: "fixed", inset: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex", justifyContent: "center", alignItems: "center",
    zIndex: 1000, padding: 20
  },
  modal: { backgroundColor: "#fff", padding: 22, borderRadius: 12, width: "100%", maxWidth: 520 }
};

export default ItemSearch;
