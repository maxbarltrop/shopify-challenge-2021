import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import omdbService from "../services/omdb";
import ResultItem from "./resultItem";
import uuid from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
const Search = (props) => {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const useStyles = makeStyles({
    input: {
      background: "rgba(255,255,255,0.5)",
      width: "100%",
      opacity: "1",
      borderRadius: "3px",
    },
    inputText: {
      color: "#9D6381",
      "&.focused": {
        color: "white",
        fontSize: "16px",
        fontWeight: "500",
      },
      "&.shrink": {
        color: "white",
        fontSize: "16px",
        fontWeight: "500",
      },
    },
    loader: {
      color: "white",
    },
    button: {
      border: "1px solid white",
      color: "white",
      opacity: 0.85,
      "&:hover": {
        opacity: "1",
      },
    },
    disabled: {
      border: "1px solid grey",
      color: "white",
    },
  });
  const classes = useStyles();

  const inputChanged = async (newInput, page) => {
    setLoading(true);
    let _page = page;
    if (input !== newInput) {
      setPage(1);
      _page = 1;
    }
    setInput(newInput);
    const searchResults = await omdbService.getMovies(newInput, _page);
    const { movies } = searchResults;
    setList(movies);
    setTotal(searchResults.total);
    setLoading(false);
  };

  const isNominated = (movie) => {
    return !!props.nominees.find((n) => n.imdbID === movie.imdbID);
  };

  const selectMovie = (movie) => {
    props.addNominee(movie);
  };

  const highlightMovie = (movie) => {
    props.highlightMovie(movie);
  };

  const resultHeader = () => {
    if (!input) {
      return (
        <div className="result-header">
          Enter a search term to find some movies!
        </div>
      );
    } else if (total === -1) {
      return (
        <div className="result-header">
          Too Many Results! Try Narrowing Your Search Term.
        </div>
      );
    } else if (!list || list.length === 0) {
      return <div className="result-header">No Results Found</div>;
    }
    const current = (page - 1) * 10 + 1;
    const max = current + list.length - 1;
    return (
      <div className="result-header">{`Showing ${current}-${max} of ${total}`}</div>
    );
  };

  const tableHeader = () => {
    if (!list || list.length === 0) {
      return null;
    }
    return (
      <div className="movie-result-header-row">
        <div className="movie-list__column-header"></div>
        <div className="movie-list__column-header">Title</div>
        <div className="movie-list__column-header">Year</div>
        <div className="movie-list__column-header"></div>
        <div className="movie-list__column-header"></div>
      </div>
    );
  };

  const results = () => {
    if (loading) {
      return (
        <div className="loading">
          <CircularProgress className={classes.loader} size="60px" />
        </div>
      );
    }
    return (
      <React.Fragment>
        {resultHeader()}
        {tableHeader()}
        {list &&
          list.map((movie) => {
            return (
              <ResultItem
                movie={movie}
                select={() => selectMovie(movie)}
                highlight={() => highlightMovie(movie)}
                isNominated={isNominated(movie)}
                key={uuid()}
              />
            );
          })}
      </React.Fragment>
    );
  };

  const pageButtons = () => {
    if (total <= 10 || !input) {
      return null;
    }
    const isFirstPage = page === 1;
    const isLastPage = page === Math.ceil(total / 10);
    const increment = () => {
      inputChanged(input, page + 1);
      setPage(page + 1);
    };
    const decrement = () => {
      inputChanged(input, page - 1);
      setPage(page - 1);
    };
    return (
      <div className="page-button-container">
        <Button
          className={classes.button}
          disabled={isFirstPage}
          onClick={decrement}
          classes={{ root: classes.button, disabled: classes.disabled }}
        >
          <ArrowBackIcon />
          Prev. Page
        </Button>
        <div className="button-padding" />
        <Button
          className={classes.button}
          disabled={isLastPage}
          onClick={increment}
        >
          Next Page
          <ArrowForwardIcon />
        </Button>
      </div>
    );
  };

  return (
    <div className="search-container">
      <div className="search-container__search-area">
        <div className="search-container-header">Search for a Movie!</div>
        <TextField
          variant="outlined"
          label="Movie Title"
          value={input}
          onChange={(e) => inputChanged(e.target.value, page)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            classes: {
              root: classes.inputText,
              focused: "focused",
              shrink: "shrink",
            },
          }}
          floatingLabelFocusStyle={classes.inputText}
          className={classes.input}
        />
      </div>
      {results()}
      {pageButtons()}
    </div>
  );
};

export default Search;
