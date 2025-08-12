import "../CSS/Favorites.css"; // Assuming you have a CSS file for Favorites styles
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useMovieContext();
  if (favorites) {
    return (
      <div className="favorites">
        <h2>Your Favorite Movies</h2>
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="favorites-empty">
      <h2>No Favorites Added yet</h2>
      <p>Add your favorite movies to this list.</p>
    </div>
  );
}

export default Favorites;
