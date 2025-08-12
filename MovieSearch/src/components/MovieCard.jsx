import "../CSS/MovieCard.css"; // Assuming you have a CSS file for MovieCard styles
import { useMovieContext } from "../context/MovieContext";
function MovieCard({ movie }) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
  const isFav = isFavorite(movie.id);

  function onFavoriteClick(event) {
    event.preventDefault();
    if (isFav) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  }
  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`${import.meta.env.VITE_IMAGE_URL}${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${isFav ? "active" : ""}`}
            onClick={onFavoriteClick}
          >
            ♥
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split("-")[0]}</p>
      </div>
    </div>
  );
}

export default MovieCard;
