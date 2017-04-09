import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../../api';
import Ability from '../shared/Ability';

class Pokemon extends Component {
  static propTypes = {
    ability: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    types: PropTypes.array.isRequired
  };

  componentDidMount() {
    api.fetchAbility(this.props.ability).then(ability => {
      this.setState({
        ability
      });
    });
  }

  formatDexNumber() {
    let dexNumber = `${this.props.id}`;
    if (this.props.id < 10) {
      dexNumber = `00${this.props.id}`;
    } else if (this.props.id < 100) {
      dexNumber = `0${this.props.id}`;
    }

    return dexNumber;
  }

  renderAbility() {
    if (this.state) {
      return <Ability {...this.state.ability} />
    }

    return;
  }

  render() {
    return (
      <div className="pokemon">
        <h2 className="pokemon-header">
          {"# " + this.formatDexNumber() + " - " + this.props.name}
        </h2>
        <div className={`pokemon-sprite-container ${this.props.types[0]} ${this.props.types[1]}-border`}>
          <img
            className="pokemon-sprite"
            src={`http://www.serebii.net/sunmoon/pokemon/${this.formatDexNumber()}.png`}
          />
        </div>
        <div className="pokemon-type-container">
          {
            this.props.types.map(type => {
              if (type.length > 0) {
                return (
                  <p
                    className={`pokemon-type ${type}`}
                    key={type}
                  >
                    {type}
                  </p>
                );
              }
            })
          }
        </div>
        {this.renderAbility()}
      </div>
    );
  }
}

export default Pokemon;
