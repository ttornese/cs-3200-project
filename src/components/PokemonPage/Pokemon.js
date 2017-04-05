import React, { Component, PropTypes } from 'react';

class Pokemon extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    types: PropTypes.array.isRequired
  };

  render() {
    return (
      <div className="pokemon">
        <h2>{this.props.name}</h2>
        <p>{this.props.id}</p>
        <p>{this.props.types[0]}</p>
        <p>{this.props.types[1]}</p>
      </div>
    );
  }
}

export default Pokemon;
