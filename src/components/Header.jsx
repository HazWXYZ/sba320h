import "./Header.css";

function Header({ activeTab, setActiveTab }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <span className="logo-icon">📰</span>
          <div>
            <span className="logo-name">GoodNews</span>
            <span className="logo-tagline">positive stories, every day</span>
          </div>
        </div>
        <nav className="nav">
          <button
            className={`nav-btn ${activeTab === "home" ? "active" : ""}`}
            onClick={() => setActiveTab("home")}
          >
            Home
          </button>
          <button
            className={`nav-btn ${activeTab === "saved" ? "active" : ""}`}
            onClick={() => setActiveTab("saved")}
          >
            ⭐ Saved
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;