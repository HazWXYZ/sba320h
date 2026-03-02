import { useDispatch, useSelector } from "react-redux";
import { toggleSave } from "../features/newsSlice";
import "./NewsCard.css";

function timeAgo(dateStr) {
  const diffMins = Math.floor((Date.now() - new Date(dateStr)) / 60000);
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
  return `${Math.floor(diffMins / 1440)}d ago`;
}

function NewsCard({ article }) {
  const dispatch = useDispatch();
  const savedArticles = useSelector((state) => state.news.savedArticles);
  const isSaved = savedArticles.some((a) => a.url === article.url);

  return (
    <div className="card">
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="card-img"
          onError={(e) => { e.target.style.display = "none"; }}
        />
      )}
      <div className="card-body">
        <div className="card-meta">
          <span className="source-badge">{article.source?.name || "News"}</span>
          <span className="time-ago">{timeAgo(article.publishedAt)}</span>
        </div>
        <h3 className="card-title">{article.title}</h3>
        <p className="card-desc">{article.description}</p>
        <div className="card-footer">
          <a href={article.url} target="_blank" rel="noreferrer" className="read-link">
            Read full story →
          </a>
          <button
            className={`save-btn ${isSaved ? "saved" : ""}`}
            onClick={() => dispatch(toggleSave(article.url))}
          >
            {isSaved ? "★ Saved" : "☆ Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;