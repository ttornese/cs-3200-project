import React, { Component } from 'react';
import Pokemon from './Pokemon';

class PokemonPage extends Component {
  static propTypes = {
    pokemon: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="pokemon-page">
        <Pokemon {...this.props.pokemon} />
      </div>
    );
  }
}

export default PokemonPage;
