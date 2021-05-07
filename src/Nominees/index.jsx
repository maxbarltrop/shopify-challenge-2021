import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import uuid from "uuid";

const Nominees = (props) => {
  const { nominees, removeNominee } = props;

  const useStyles = makeStyles({
    button: {
      background: "linear-gradient(45deg, #FFD700 30%, #FFFFFF 75%)",
      opacity: 0.85,
      "&:hover": { opacity: 1 },
    },
  });
  const classes = useStyles();

  const NomineeItem = ({ movie }) => {
    return (
      <div className="nominee-result-row">
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
              variant="contained"
              className={classes.button}
              onClick={() => removeNominee(movie)}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="nominee-list">
      <div className="search-container__search-area">
        <div className="nominee-header">Your Nominees</div>
      </div>
      {nominees.map((movie) => {
        return <NomineeItem movie={movie} key={uuid()} />;
      })}
    </div>
  );
};

export default Nominees;
