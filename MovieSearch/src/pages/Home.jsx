import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import "../CSS/Home.css"; // Assuming you have a CSS file for Home styles

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (error) {
        console.error("Failed to fetch popular movies:", error);
        setError("Failed to fetch popular movies...");
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) return; // Prevent search if input is empty
    if (loading) return; // Prevent search while loading
    setLoading(true);
    const fetchSearchedMovies = async () => {
      try {
        const searchedMovies = await searchMovies(searchQuery);
        setMovies(searchedMovies);
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error("Failed to fetch searched movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchedMovies();
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {error && <div className="error">{error}</div>}
      {loading ? (
        <div className="loading">Loading movies...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
