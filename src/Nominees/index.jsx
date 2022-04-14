import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import uuid from "uuid";
import _ from "lodash";
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
          className="nominee-poster"
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

  const list = () => {
    if (_.isEmpty(nominees)) {
      return (
        <div className="nominee-list__empty">
          When you nominate films they'll appear here
        </div>
      );
    }
    return (
      <React.Fragment>
        {nominees.map((movie) => {
          return <NomineeItem movie={movie} key={uuid()} />;
        })}
      </React.Fragment>
    );
  };

  return (
    <div className="nominee-list">
      <div className="nominee-header">Your Nominees</div>
      {list()}
    </div>
  );
};

export default Nominees;
