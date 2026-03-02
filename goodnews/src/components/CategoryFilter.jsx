import { useDispatch, useSelector } from "react-redux";
import { fetchNews, setCategory } from "../features/newsSlice";
import "./CategoryFilter.css";

// All available GNews categories
const CATEGORIES = [
  "general",
  "world",
  "technology",
  "business",
  "sports",
  "science",
  "health",
];

function CategoryFilter() {
  const dispatch = useDispatch();
  const activeCategory = useSelector((state) => state.news.category);
  const activeQuery = useSelector((state) => state.news.searchQuery);

  function handleClick(cat) {
    dispatch(setCategory(cat));
    dispatch(fetchNews({ query: null, category: cat }));
  }

  return (
    <div className="categories">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          className={`cat-btn ${activeCategory === cat && !activeQuery ? "active" : ""}`}
          onClick={() => handleClick(cat)}
        >
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;