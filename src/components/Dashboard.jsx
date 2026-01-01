import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const isAuthorized = user?.IsAdmin || user?.IsStaff;


    useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/");
    }
  }, [navigate]);

// Inside your Dashboard component
    const cards = [
        {
            title: "Requested Items",
            description: "View items people are looking for",
            path: "/requested-items",
            icon: "🔍"
        },
        {
            title: "Found Items",
            description: "Browse items that have been found",
            path: "/found-items",
            icon: "📦"
        },
        {
            title: "Report an Item",
            description: "Submit a new lost or found request",
            path: "/add-request",
            icon: "➕"
        },
        {
            title: "Your Activity",
            description: "View your claims and reports",
            path: "/your-page",
            icon: "👤"
        },
        ...(isAuthorized
            ? [
                {
                    title: "Add Lost",
                    description: "Add a lost item on behalf of a user",
                    path: "/add-lost",
                    icon: "📝"
                }
            ]
            : [])
    ];

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>
          Welcome{user ? `, ${user.username}` : ""}!
        </h1>
        <p style={styles.subtitle}>
          Choose an option to continue
        </p>

        <div style={styles.grid}>
          {cards.map((card) => (
            <button
              key={card.title}
              onClick={() => navigate(card.path)}
              style={styles.card}
            >
              <div style={styles.icon}>{card.icon}</div>
              <h3 style={styles.cardTitle}>{card.title}</h3>
              <p style={styles.cardDesc}>{card.description}</p>
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/");
          }}
          style={styles.logout}
        >
          Log Out
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
    maxWidth: "900px",
    margin: "0 auto"
  },
  title: {
    fontSize: "32px",
    marginBottom: "8px"
  },
  subtitle: {
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
    padding: "24px",
    textAlign: "left",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 10px 20px rgba(0,0,0,0.05)"
  },
  icon: {
    fontSize: "28px",
    marginBottom: "12px"
  },
  cardTitle: {
    fontSize: "18px",
    marginBottom: "6px"
  },
  cardDesc: {
    fontSize: "14px",
    color: "#6b7280"
  },
  logout: {
    marginTop: "40px",
    background: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer"
  }
};

export default Dashboard;
