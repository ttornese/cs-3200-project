import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../../api';

class PokemonPreview extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onClickPokemon: PropTypes.func.isRequired,
  };

  componentDidMount() {
    api.fetchPokemonPreview(this.props.name).then(pokemon => {
      this.setState({
        pokemon
      });
    });
  }

  calculateFirstType() {
    if (this.state) {
      return this.state.pokemon.types[0];
    }

    return "";
  }

  calculateSecondType() {
    if (this.state) {
      if (this.state.pokemon.types[1]) {
        return this.state.pokemon.types[1];
      } else {
        return this.state.pokemon.types[0];
      }
    }

    return "";
  }

  generateDivClassName() {
    return `pokemon-preview ${this.calculateFirstType()} ${this.calculateSecondType()}-border`;
  }

  formatDexNumber() {
    let dexNumber = "";

    if (this.state) {
      dexNumber = `${this.state.pokemon.id}`;
      if (this.state.pokemon.id < 10) {
        dexNumber = `00${this.state.pokemon.id}`;
      } else if (this.state.pokemon.id < 100) {
        dexNumber = `0${this.state.pokemon.id}`;
      }
    }

    return dexNumber;
  }

  handleClick() {
    if (this.state) {
      this.props.onClickPokemon(this.state.pokemon.id);
    }
  }

  getImageSrc() {
    if (this.state) {
      return `http://www.serebii.net/sunmoon/pokemon/${this.formatDexNumber()}.png`;
    }

    return "";
  }

  render() {
    return (
      <div
        className={this.generateDivClassName()}
        onClick={this.handleClick.bind(this)}
      >
        <img
          className="pokemon-preview-sprite"
          src={this.getImageSrc()}
        />
        <h3 className="pokemon-preview-name">
          {`# ${this.formatDexNumber()} ${this.props.name}`}
        </h3>
      </div>
    );
  }
}

export default PokemonPreview;
