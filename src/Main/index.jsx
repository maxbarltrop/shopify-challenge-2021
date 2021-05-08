import React from "react";
import Search from "../Search";
import Nominees from "../Nominees";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import Header from "../Header";
import omdbService from "../services/omdb";
import Loader from "./loader";

class PageContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      nominees: [],
      style: { display: "none", opacity: 0 },
      highlight: null,
    };
    this.classes = {
      root: {
        color: "white",
      },
    };
  }

  componentDidMount() {
    if (!localStorage.getItem("nominees")) {
      return;
    }
    const nominees = JSON.parse(localStorage.getItem("nominees"));
    this.setState({ nominees });
  }

  showBanner = () => {
    this.setState({ style: { opacity: 1, display: "flex" } });
    setTimeout(() => {
      this.setState({ style: { opacity: 0, display: "flex" } });
    }, 2000);
    setTimeout(() => {
      this.setState({ opacity: 0, display: "none" });
    }, 3000);
  };

  addNominee = (movie) => {
    const _nominees = this.state.nominees;
    _nominees.push(movie);
    localStorage.setItem("nominees", JSON.stringify(_nominees));
    this.setState({ nominees: _nominees });
    if (_nominees.length === 5) {
      this.setState({ bannerDisplayed: true });
      this.showBanner();
    }
  };
  removeNominee = (movie) => {
    let _nominees = this.state.nominees;
    _nominees = _nominees.filter((n) => n.imdbID !== movie.imdbID);
    localStorage.setItem("nominees", JSON.stringify(_nominees));
    this.setState({ nominees: _nominees });
  };

  highlightMovie = async (movie) => {
    this.setState({ loading: true });
    const fullInfo = await omdbService.getFullMovie(movie.imdbID);
    this.setState({ loading: false });
    if (!fullInfo) return;
    this.setState({ highlight: fullInfo });
    document.getElementById("highlight").scrollIntoView({
      behavior: "auto",
      block: "center",
      inline: "center",
    });
  };

  highlightSection = () => {
    const info = (name, detail) => {
      if (!detail) return null;
      return (
        <div className="highlight-details__section">
          <span className="highlight-type">{name}: </span>
          {detail}
        </div>
      );
    };
    if (!this.state.loading && !this.state.highlight) return null;
    if (this.state.loading) {
      return (
        <div className="highlight-area">
          <div className="highlight-loader">
            <Loader />
          </div>
        </div>
      );
    }
    const { highlight } = this.state;
    return (
      <div className="highlight-area">
        <div className="highlight-title">{highlight.Title}</div>
        <div className="highlight-info">
          <img
            src={highlight.Poster}
            alt={highlight.Title}
            className="highlight-poster"
          />
          <div className="highlight-details">
            {info("Year", highlight.Year)}
            {info("Country", highlight.Country)}
            {info("Genre", highlight.Genre)}
            {info("Actors", highlight.Actors)}
            {info("Runtime", highlight.Runtime)}
            {info("IMDB Rating", highlight.imdbRating)}
            {info("Plot", highlight.Plot)}
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="page-container">
        <Header />
        <div className="page-action-area">
          <Search
            nominees={this.state.nominees}
            addNominee={this.addNominee}
            highlightMovie={this.highlightMovie}
          />
          <Nominees
            nominees={this.state.nominees}
            removeNominee={this.removeNominee}
          />
        </div>
        <div className="completion-banner" style={this.state.style}>
          <div className="completion-banner__icon">
            <DoneAllIcon fontSize="inherit" />
          </div>

          <div className="completion-banner__text">
            <span>You've Nominated Five Movies!</span>
          </div>
        </div>
        <div id="highlight">{this.highlightSection()}</div>
      </div>
    );
  }
}

export default PageContainer;
