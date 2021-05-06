import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";

const Item = ({ movie, select, isNominated }) => {
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
          <Button onClick={select} variant="outlined" disabled={isNominated}>
            Nominate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Item;
