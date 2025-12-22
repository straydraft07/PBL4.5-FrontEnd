import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.headerLeft}>
            <span style={styles.tagline}>
              Find your lost items or help others reunite with their belongings.
            </span>
          </div>

          <div style={styles.headerRight}>
            <Link to="/login" style={styles.loginLink}>
              Login
            </Link>
            <Link to="/register" style={styles.signupButton}>
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>
          <span style={styles.welcome}>Welcome to</span>
          <span style={styles.brand}>
            <span style={styles.safe}>Safe</span>
            <span style={styles.place}>Place</span>
          </span>
        </h1>

        <Link to="/register" style={styles.getStarted}>
          Get Started
        </Link>
      </section>

      {/* How It Works */}
      <section style={styles.howItWorks}>
        <h2 style={styles.howTitle}>How It Works</h2>

        <div style={styles.steps}>
          <div style={styles.step}>
            <div style={styles.stepCircle}>1</div>
            <h3 style={styles.stepTitle}>Report or Search</h3>
            <p style={styles.stepText}>
              Post your lost item or search for found items.
            </p>
          </div>

          <div style={styles.step}>
            <div style={styles.stepCircle}>2</div>
            <h3 style={styles.stepTitle}>Get Matched</h3>
            <p style={styles.stepText}>
              The system connects lost items with owners.
            </p>
          </div>

          <div style={styles.step}>
            <div style={styles.stepCircle}>3</div>
            <h3 style={styles.stepTitle}>Recover Items</h3>
            <p style={styles.stepText}>
              Claim your item and thank the finder.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;

const styles = {
  page: {
    minHeight: "100vh",
    background: "#fff"
  },

  header: {
    borderBottom: "1px solid #e5e7eb",
    position: "sticky",
    top: 0,
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(6px)"
  },
  headerInner: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerLeft: {
    maxWidth: "600px"
  },
  tagline: {
    fontSize: "16px",
    color: "#000"
  },
  headerRight: {
    display: "flex",
    gap: "12px"
  },
  loginLink: {
    padding: "10px 16px",
    color: "#374151",
    textDecoration: "none"
  },
  signupButton: {
    padding: "10px 16px",
    background: "#000",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none"
  },

  hero: {
    textAlign: "center",
    padding: "100px 20px"
  },
  heroTitle: {
    marginBottom: "32px"
  },
  welcome: {
    display: "block",
    fontSize: "22px",
    marginBottom: "8px",
    color: "#6b7280"
  },
  brand: {
    display: "block",
    lineHeight: "1"
  },
  safe: {
    display: "block",
    fontSize: "64px",
    fontStyle: "italic",
    color: "#4682B4"
  },
  place: {
    display: "block",
    fontSize: "64px",
    fontStyle: "italic",
    color: "#9CA3AF"
  },
  getStarted: {
    padding: "14px 32px",
    border: "2px solid #000",
    borderRadius: "8px",
    textDecoration: "none",
    color: "#000"
  },

  howItWorks: {
    background: "#f9fafb",
    padding: "100px 20px"
  },
  howTitle: {
    textAlign: "center",
    fontSize: "36px",
    marginBottom: "60px"
  },
  steps: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "40px"
  },
  step: {
    textAlign: "center"
  },
  stepCircle: {
    width: "80px",
    height: "80px",
    margin: "0 auto 20px",
    borderRadius: "16px",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
  },
  stepTitle: {
    fontSize: "20px",
    marginBottom: "10px"
  },
  stepText: {
    color: "#6b7280"
  }
};
