import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import omdbService from "../services/omdb";
import ResultItem from "./resultItem";

const Search = (props) => {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);

  const inputChanged = async (newInput) => {
    setInput(newInput);
    const searchResults = await omdbService.getMovies(newInput);
    const { movies } = searchResults;
    setList(movies);
  };

  const isNominated = (movie) => {
    return !!props.nominees.find((n) => n.imdbID === movie.imdbID);
  };

  const selectMovie = (movie) => {
    props.addNominee(movie);
  };

  return (
    <div className="search-container">
      <TextField
        variant="outlined"
        label="Movie Title"
        value={input}
        onChange={(e) => inputChanged(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      {list.map((movie) => {
        return (
          <ResultItem
            movie={movie}
            select={() => selectMovie(movie)}
            key={movie.imdbID}
            isNominated={isNominated(movie)}
          />
        );
      })}
    </div>
  );
};

export default Search;
