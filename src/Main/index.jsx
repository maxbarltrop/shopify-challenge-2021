import React from "react";
import Search from "../Search";
import Nominees from "../Nominees";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import Header from "../Header";

class PageContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      nominees: [],
      bannerDisplayed: false,
      style: { display: "none", opacity: 0 },
    };
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
    this.setState({ nominees: _nominees });
    if (!this.state.bannerDisplayed && _nominees.length === 5) {
      this.setState({ bannerDisplayed: true });
      this.showBanner();
    }
  };
  removeNominee = (movie) => {
    let _nominees = this.state.nominees;
    _nominees = _nominees.filter((n) => n.imdbID !== movie.imdbID);
    this.setState({ nominees: _nominees });
  };

  render() {
    return (
      <div className="page-container">
        <Header />
        <div className="page-action-area">
          <Search nominees={this.state.nominees} addNominee={this.addNominee} />
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
      </div>
    );
  }
}

export default PageContainer;
