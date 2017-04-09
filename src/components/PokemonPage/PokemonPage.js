import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pokemon from './Pokemon';

class PokemonPage extends Component {
  static propTypes = {
    pokemon: PropTypes.object.isRequired
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
