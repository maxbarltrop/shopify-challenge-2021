import React, { useState, useEffect } from "react";
import Search from "../Search";
import Nominees from "../Nominees";

class PageContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      nominees: [],
    };
  }
  addNominee = (movie) => {
    const _nominees = this.state.nominees;
    _nominees.push(movie);
    this.setState({ nominees: _nominees });
  };

  render() {
    return (
      <div className="page-container">
        <div className="page-action-area">
          <Search nominees={this.state.nominees} addNominee={this.addNominee} />
          <Nominees nominees={this.state.nominees} />
        </div>
      </div>
    );
  }
}

export default PageContainer;
