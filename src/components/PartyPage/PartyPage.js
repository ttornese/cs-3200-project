import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PartyPage extends Component {
  static propTypes = {
    onClickAddPokemon: PropTypes.func.isRequired,
    party: PropTypes.object.isRequired
  };

  renderPokemon() {
    if (this.props.party.pokemon) {
      return <p>{this.props.party.pokemon}</p>;
    } else {
      return <p>no pokemon</p>;
    }
  }

  handleClick() {
    this.props.onClickAddPokemon(this.props.party.party_id, "Bulbasaur");
  }

  render() {
    return (
      <div className="party-page">
        <h1>{this.props.party.party_id}</h1>
        {this.renderPokemon()}
        <div onClick={this.handleClick.bind(this)}>Add Pokemon</div>
      </div>
    );
  }
}

export default PartyPage;
