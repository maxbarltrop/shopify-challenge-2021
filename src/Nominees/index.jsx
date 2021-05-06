import React from "react";
import Button from "@material-ui/core/Button";

const Nominees = (props) => {
  const { nominees } = props;

  const NomineeItem = ({ movie }) => {
    return (
      <div className="movie-result-row">
        <img
          src={movie.Poster}
          className="movie-poster"
          alt={`${movie.Title} poster`}
        />
        <div className="movie-list__item">
          <div className="movie-title">{movie.Title}</div>
        </div>
        <div className="movie-list__item">
          <div className="movie-year">{movie.Year}</div>
        </div>
        <div className="movie-list__item">
          <div className="movie-button">
            <Button
            //   onClick={selectMovie}
            //   variant="outlined"
            //   disabled={isNominated || disable}
            >
              Nominate
            </Button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="nominee-list">
      {nominees.map((movie) => {
        return <NomineeItem movie={movie} key={movie.imdbID} />;
      })}
    </div>
  );
};

export default Nominees;
