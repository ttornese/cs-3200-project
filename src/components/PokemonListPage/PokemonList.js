import React, { Component, PropTypes } from 'react';
import PokemonPreview from './PokemonPreview';

class PokemonList extends Component {
  static propTypes = {
    onClickPokemon: PropTypes.func.isRequired,
    pokemon: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="pokemon-list">
        {
          Object.keys(this.props.pokemon).map(
            pokemonId =>
              <PokemonPreview
                key={pokemonId}
                id={Number(pokemonId)}
                onClickPokemon={this.props.onClickPokemon}
                name={this.props.pokemon[pokemonId]['name']}
                pokemon={this.props.pokemon[pokemonId]}
              />
          )
        }
      </div>
    );
  }
}

export default PokemonList;
