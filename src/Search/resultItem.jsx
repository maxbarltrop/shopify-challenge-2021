import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const Item = ({ movie, select, isNominated, highlight }) => {
  const useStyles = makeStyles({
    button: {
      color: "white",
      border: "2px solid #FFD700",
      opacity: 0.85,
      height: "40px",
      "&:hover": { opacity: 1 },
    },
    highlight: {
      color: "white",
      border: "2px solid white",
      opacity: 0.85,
      fontSize: "10px",
      height: "40px",
      "&:hover": { opacity: 1 },
    },
  });
  const classes = useStyles();

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
        <div className="movie-highlight">
          <Button
            onClick={highlight}
            variant="outlined"
            disabled={isNominated}
            className={classes.highlight}
          >
            Tell Me More
          </Button>
        </div>
      </div>
      <div className="movie-list__item">
        <div className="movie-button">
          <Button
            onClick={select}
            variant="outlined"
            disabled={isNominated}
            className={classes.button}
          >
            Nominate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Item;
