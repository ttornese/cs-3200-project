import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PartiesList from './PartiesList';

class PartiesPage extends Component {
  static propTypes = {
    onClickCreateParty: PropTypes.func.isRequired,
    onClickParty: PropTypes.func.isRequired,
    parties: PropTypes.object.isRequired
  };

  handleCreateClick() {
    this.props.onClickCreateParty();
  }

  render() {
    return (
      <div className="parties-page">
        <h2 className="parties-page-header">
          Parties List
        </h2>
        <PartiesList
          onClickParty={this.props.onClickParty}
          parties={this.props.parties}
        />
        <button
          className="parties-page-create-button"
          onClick={this.props.onClickCreateParty}
        >
          Create New Party
        </button>
      </div>
    );
  }
}

export default PartiesPage;
