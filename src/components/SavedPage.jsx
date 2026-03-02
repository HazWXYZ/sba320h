import { useSelector } from "react-redux";
import NewsCard from "./NewsCard";
import "./NewsFeed.css";

function SavedPage() {
  const savedArticles = useSelector((state) => state.news.savedArticles);

  if (!savedArticles.length) {
    return (
      <div className="feed-msg">
        <p>Nothing saved yet!</p>
        <p style={{ marginTop: 8, fontSize: 13 }}>
          Hit ☆ Save on any article to bookmark it here. Your saves persist
          even after closing the browser.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: 20, color: "#16213e" }}>
        Your Saved Articles ({savedArticles.length})
      </h2>
      <div className="news-grid">
        {savedArticles.map((article, i) => (
          <NewsCard key={i} article={article} />
        ))}
      </div>
    </div>
  );
}

export default SavedPage;