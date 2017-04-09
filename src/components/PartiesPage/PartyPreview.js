import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PartyPreview extends Component {
  static propTypes = {
    onClickParty: PropTypes.func.isRequired,
    party: PropTypes.object.isRequired
  };

  handleClick() {
    this.props.onClickParty(this.props.party.party_id);
  }

  render() {
    return (
      <div
        className="party-preview"
        onClick={this.handleClick.bind(this)}
      >
        <h3 className="party-preview-name">
          {"Party " + this.props.party.party_id}
        </h3>
      </div>
    );
  }
}

export default PartyPreview;
