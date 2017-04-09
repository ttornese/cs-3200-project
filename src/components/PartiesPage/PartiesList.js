import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PartyPreview from './PartyPreview';

class PartiesList extends Component {
  static propTypes = {
    onClickDeleteParty: PropTypes.func.isRequired,
    onClickParty: PropTypes.func.isRequired,
    parties: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="parties-list">
        {
          Object.keys(this.props.parties).map(partyId => {
            return (
              <PartyPreview
                key={partyId}
                onClickDeleteParty={this.props.onClickDeleteParty}
                onClickParty={this.props.onClickParty}
                party={this.props.parties[partyId]}
              />
            );
          })
        }
      </div>
    );
  }
}

export default PartiesList;
