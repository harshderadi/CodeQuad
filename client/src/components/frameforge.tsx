import { useEffect } from "react";
import { PiCubeBold } from "react-icons/pi";

const FrameForgeHome: React.FC = () => {
  useEffect(() => {
    // Auto-redirect after 5 seconds
    const timer = setTimeout(() => {
      window.location.href = "https://frameforge.netlify.app/";
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.glassCard}>
        <PiCubeBold style={styles.icon} />
        <h1 style={styles.title}>Welcome to FrameForge</h1>
        <p style={styles.subtitle}>
          Convert wireframes into React code instantly.
        </p>
        <img
          src="https://frameforge.netlify.app/_next/image?url=%2FWireframetocode.png&w=1920&q=75"
          alt="FrameForge Preview"
          style={styles.image}
        />
        <p style={styles.description}>
          Developed by <strong>Team QuadVerse</strong> at CodeQuad Development,  
          FrameForge is a revolutionary tool that transforms UI wireframes into clean, production-ready React components effortlessly. 🚀  
        </p>
        <p style={styles.redirectMessage}>
          Redirecting you to FrameForge in <strong>5 seconds</strong>...
        </p>
        <button
          style={styles.button}
          onClick={() => (window.location.href = "https://frameforge.netlify.app/")}
        >
          Enter FrameForge
        </button>
      </div>
    </div>
  );
};

// Modern Glassmorphism Styling
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "linear-gradient(to bottom right, #0d1117, #1e293b)",
    color: "white",
    textAlign: "center",
    fontFamily: "'Poppins', sans-serif",
    padding: "20px",
  },
  glassCard: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "12px",
    padding: "30px",
    maxWidth: "600px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
  },
  icon: {
    fontSize: "70px",
    color: "#3b82f6",
    marginBottom: "15px",
    animation: "spin 3s linear infinite",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "20px",
    color: "#d1d5db",
    marginBottom: "10px",
  },
  image: {
    width: "100%",
    borderRadius: "10px",
    marginBottom: "15px",
    boxShadow: "0 4px 8px rgba(255, 255, 255, 0.2)",
  },
  description: {
    fontSize: "16px",
    color: "#f3f4f6",
    lineHeight: "1.5",
    marginBottom: "15px",
  },
  redirectMessage: {
    fontSize: "14px",
    color: "#9ca3af",
    marginBottom: "20px",
  },
  button: {
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#3b82f6",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.3s ease-in-out",
  },
};

export default FrameForgeHome;
