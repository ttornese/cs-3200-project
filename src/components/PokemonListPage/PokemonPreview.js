import React, { Component, PropTypes } from 'react';

class PokemonPreview extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    onClickPokemon: PropTypes.func.isRequired,
    pokemon: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired
  };

  handleClick = () => {
    this.props.onClickPokemon(this.props.id);
  };

  render() {
    return (
      <div
        className="pokemon-preview"
        onClick={this.handleClick}
      >
        <h2>{this.props.name}</h2>
      </div>
    );
  }
}

export default PokemonPreview;
