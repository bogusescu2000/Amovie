import "../../styles/lastMovies.scss";
import moment from "moment";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { LastMoviesType } from "../../Types/Types";

export default function LastMovies() {
  const {
    data: movies,
    error,
    loading,
  } = useFetch<LastMoviesType[]>("http://localhost:7063/api/movies/lastmovies");
  
  return (
    <div className="container">
      <div className="movies-title">
        <div className="title-block">
          <p className="title">Latest Movies</p>
          <div className="blue-line">
            <div> </div>
          </div>
        </div>
      </div>

      <div className="movies-block">
        {loading && <p>Loading data...</p>}
        {movies &&
          movies.map((movie) => (
            <div className="movie" key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <div className="image">
                  <img src={`./images/${movie.image}`} alt={movie.title} />
                </div>
              </Link>
              <div className="content">
                <div className="title-rating">
                  <h2>{movie.title}</h2>
                  <p>
                    {" "}
                    IMDb <span>{movie.rating}</span>
                  </p>
                </div>
                <div className="movie-text">
                  {movie.description} <span>..more</span>
                </div>
                <div className="date">
                  <p>{moment(movie.release).format("MMMM d yyyy")}</p>
                </div>
              </div>
            </div>
          ))}
        {error && JSON.stringify(error)}
      </div>

      <div className="movie-button">
        <Link to={`/movies`}>
          <button>
            <p>View all movies</p>
          </button>
        </Link>
      </div>
    </div>
  );
}
