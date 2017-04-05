import React, { Component, PropTypes } from 'react';
import PokemonList from './PokemonList';

class PokemonListPage extends Component {
  static propTypes = {
    onClickPokemon: PropTypes.func.isRequired,
    pokemon: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="pokemon-list-page">
        <PokemonList
          onClickPokemon={this.props.onClickPokemon}
          pokemon={this.props.pokemon}
        />
      </div>
    );
  }
}

export default PokemonListPage;
