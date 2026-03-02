import { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import NewsFeed from "./components/NewsFeed";
import SavedPage from "./components/SavedPage";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="app">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-content">
        {activeTab === "home" && (
          <>
            <SearchBar />
            <CategoryFilter />
            <NewsFeed />
          </>
        )}

        {activeTab === "saved" && <SavedPage />}
      </main>

      <footer className="footer">
        <p>GoodNews © 2026 — Built with React &amp; Redux Toolkit</p>
      </footer>
    </div>
  );
}

export default App;