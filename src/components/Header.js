import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  static propTypes = {
    onClickTitle: PropTypes.func.isRequired
  };

  handleClick() {
    this.props.onClickTitle();
  }

  render() {
    return (
      <div className="header">
        <h2
          className="header-title"
          onClick={this.handleClick.bind(this)}
        >
          Pokemon Party Builder
        </h2>
      </div>
    );
  }
};

export default Header;
