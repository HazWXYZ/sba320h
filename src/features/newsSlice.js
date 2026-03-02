import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = "YOUR_KEY_HERE"; // free at gnews.io

function loadSavedFromStorage() {
  try {
    const saved = localStorage.getItem("goodnews_saved");
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    return [];
  }
}

function persistSaved(savedArticles) {
  try {
    localStorage.setItem("goodnews_saved", JSON.stringify(savedArticles));
  } catch (err) {
    console.error("localStorage error:", err);
  }
}

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async ({ query, category }) => {
    let url;
    if (query) {
      url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=9&apikey=${API_KEY}`;
    } else {
      url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&max=9&apikey=${API_KEY}`;
    }
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch from GNews API");
    const data = await response.json();
    return data.articles || [];
  }
);

const MOCK_ARTICLES = [
  {
    title: "Scientists Discover Deep-Sea Organism That Produces Oxygen",
    description: "A newly found microorganism in the Pacific could produce up to 10% of the world's oxygen and may hold the key to future energy sources.",
    url: "#",
    image: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=400&q=80",
    source: { name: "Science Daily" },
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    title: "Community Raises $200K to Save 100-Year-Old Library",
    description: "Residents of a small Ohio town rallied together to keep their local library open, exceeding their fundraising goal in under two weeks.",
    url: "#",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&q=80",
    source: { name: "Ohio Tribune" },
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    title: "16-Year-Old Builds App to Help Homeless Find Shelter",
    description: "A Chicago teen developed a free app showing real-time shelter availability across the city, already helping thousands of people.",
    url: "#",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80",
    source: { name: "Chicago Tribune" },
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
  },
  {
    title: "Study: 20 Minutes Outside Significantly Cuts Stress Hormones",
    description: "Stanford researchers found that brief exposure to green spaces reduces cortisol levels, even in busy urban parks.",
    url: "#",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80",
    source: { name: "Health Weekly" },
    publishedAt: new Date(Date.now() - 14000000).toISOString(),
  },
  {
    title: "Austin Volunteers Plant 10,000 Trees in One Weekend",
    description: "Volunteers across Austin broke a city record by planting over ten thousand trees in underserved neighborhoods in a single weekend.",
    url: "#",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400&q=80",
    source: { name: "Austin Statesman" },
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    title: "Houston Animal Shelter Hits Zero-Euthanasia Milestone",
    description: "The Houston SPCA has officially gone 365 days without a single euthanasia, thanks to an expanded foster network and community adoption drives.",
    url: "#",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80",
    source: { name: "Houston Chronicle" },
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

const newsSlice = createSlice({
  name: "news",
  initialState: {
    articles: [],
    status: "idle",
    error: null,
    category: "general",
    searchQuery: "",
    savedArticles: loadSavedFromStorage(),
  },
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
      state.searchQuery = "";
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    toggleSave(state, action) {
      const articleUrl = action.payload;
      const index = state.savedArticles.findIndex((a) => a.url === articleUrl);
      if (index !== -1) {
        state.savedArticles.splice(index, 1);
      } else {
        const article = state.articles.find((a) => a.url === articleUrl);
        if (article) state.savedArticles.push(article);
      }
      persistSaved(state.savedArticles);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.articles = MOCK_ARTICLES;
      });
  },
});

export const { setCategory, setSearchQuery, toggleSave } = newsSlice.actions;
export default newsSlice.reducer;