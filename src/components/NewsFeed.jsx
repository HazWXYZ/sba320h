import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../features/newsSlice";
import NewsCard from "./NewsCard";
import "./NewsFeed.css";

function NewsFeed() {
  const dispatch = useDispatch();
  const { articles, status, searchQuery } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews({ query: null, category: "general" }));
  }, [dispatch]);

  if (status === "loading") {
    return <div className="feed-msg">⏳ Loading stories...</div>;
  }

  if (!articles.length) {
    return <div className="feed-msg">No articles found. Try a different search!</div>;
  }

  return (
    <div>
      {status === "failed" && (
        <div className="api-notice">
          ⚠️ Couldn't connect to GNews — showing sample stories. Add your free API key in <code>newsSlice.js</code> to load live articles.
        </div>
      )}
      {searchQuery && (
        <p className="search-label">
          Results for: <strong>"{searchQuery}"</strong>
        </p>
      )}
      <div className="news-grid">
        {articles.map((article, i) => (
          <NewsCard key={i} article={article} />
        ))}
      </div>
    </div>
  );
}

export default NewsFeed;