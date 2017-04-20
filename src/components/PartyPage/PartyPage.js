import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PokemonPreview from './PokemonPreview';

class PartyPage extends Component {
  static propTypes = {
    onClickAddPokemon: PropTypes.func.isRequired,
    onClickPokemon: PropTypes.func.isRequired,
    party: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = {
      pokemonName: 'Enter a Pokemon name'
    };
  }

  handleChange(event) {
    this.setState({ pokemonName: event.target.value });
  }

  renderPokemon() {
    if (this.props.party.pokemon) {
      return (
        <div className="party-page-pokemon-list">
          {
            this.props.party.pokemon.map((pokemonName, i) => {
              return (
                <PokemonPreview
                  key={i}
                  onClickPokemon={this.props.onClickPokemon}
                  name={pokemonName}
                />
              );
            })
          }
        </div>
      );
    } else {
      return <p>no pokemon</p>;
    }
  }

  handleClick() {
    this.props.onClickAddPokemon(this.props.party.party_id, this.state.pokemonName);
  }

  render() {
    return (
      <div className="party-page">
        <h1 className="party-page-header">
          {"Party " + this.props.party.party_id}
        </h1>
        {this.renderPokemon()}
        <div className="party-page-add-pokemon">
          <input
            className="party-page-input-field"
            onChange={this.handleChange.bind(this)}
            type="text"
            value={this.state.pokemonName}
          />
          <button
            className="party-page-add-pokemon-button"
            onClick={this.handleClick.bind(this)}
          >
            Add Pokemon
          </button>
        </div>
      </div>
    );
  }
}

export default PartyPage;
