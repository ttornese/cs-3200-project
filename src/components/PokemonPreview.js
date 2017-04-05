import React, { Component, PropTypes } from 'react';

class PokemonPreview extends Component {
  handleClick = () => {
    this.props.onClick(this.props.id);
  };
  render() {
    return (
      <div className="pokemon-preview" onClick={this.handleClick}>
        <h2>{this.props.name}</h2>
      </div>
    );
  }
}

PokemonPreview.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default PokemonPreview;
