import React, { Component } from 'react';

class PartiesPage extends Component {
  static propTypes = {
    parties: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="parties-page">
        <h1>Parties page</h1>
      </div>
    );
  }
}

export default PartiesPage;
