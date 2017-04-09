import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PartyPreview extends Component {
  static propTypes = {
    onClickDeleteParty: PropTypes.func.isRequired,
    onClickParty: PropTypes.func.isRequired,
    party: PropTypes.object.isRequired
  };

  handleClickDelete() {
    this.props.onClickDeleteParty(this.props.party.party_id);
  }

  handleClickParty() {
    this.props.onClickParty(this.props.party.party_id);
  }

  render() {
    return (
      <div className="party-preview">
        <h3
          className="party-preview-name"
          onClick={this.handleClickParty.bind(this)}
        >
          {"Party " + this.props.party.party_id}
        </h3>
        <div className="party-preview-buttons">
          <button
            className="party-preview-button"
            onClick={this.handleClickDelete.bind(this)}
          >
            Delete Party
          </button>
          <button
            className="party-preview-button"
            onClick={this.handleClickParty.bind(this)}
          >
            View Party
          </button>
        </div>
      </div>
    );
  }
}

export default PartyPreview;
