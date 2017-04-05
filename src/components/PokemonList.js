import React, { Component, PropTypes } from 'react';
import PokemonPreview from './PokemonPreview';

class PokemonList extends Component {
  render() {
    return (
      <div className="pokemon-list">
        {
          Object.keys(this.props.pokemon).map(
            pokemonId =>
              <PokemonPreview
                key={pokemonId}
                id={Number(pokemonId)}
                onClick={this.props.onPokemonClick}
                name={this.props.pokemon[pokemonId]['name']} />
          )
        }
      </div>
    );
  }
}

PokemonList.propTypes = {
  pokemon: PropTypes.object.isRequired,
  onPokemonClick: PropTypes.func.isRequired
}

export default PokemonList;
