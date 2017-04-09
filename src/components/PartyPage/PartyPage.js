import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PartyPage extends Component {
  static propTypes = {
    party: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="party-page">
        {
          this.props.party.pokemon.map(pokemon => {
            return <h1>{pokemon}</h1>;
          })
        }
      </div>
    );
  }
}

export default PartyPage;
