import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews, setSearchQuery } from "../features/newsSlice";
import "./SearchBar.css";

function SearchBar() {
  const dispatch = useDispatch();
  const [inputVal, setInputVal] = useState("");
  const activeQuery = useSelector((state) => state.news.searchQuery);
  const activeCategory = useSelector((state) => state.news.category);

  function handleSubmit(e) {
    e.preventDefault();
    if (!inputVal.trim()) return;

    dispatch(setSearchQuery(inputVal.trim()));
    dispatch(fetchNews({ query: inputVal.trim(), category: null }));
  }

  function handleClear() {
    setInputVal("");
    dispatch(setSearchQuery(""));
    dispatch(fetchNews({ query: null, category: activeCategory }));
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Search for a news topic..."
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
      />
      <button type="submit" className="search-btn">
        Search
      </button>
      {activeQuery && (
        <button type="button" className="clear-btn" onClick={handleClear}>
          ✕ Clear
        </button>
      )}
    </form>
  );
}

export default SearchBar;