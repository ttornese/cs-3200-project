import React, { Component } from 'react';

class PartiesPage extends Component {
  static propTypes = {
    parties: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="parties-page">
        {
          Object.keys(this.props.parties).map(party => {
            return (
              <h1 key={this.props.parties[party].party_id}>
                {this.props.parties[party].party_id}
              </h1>
            )
          })
        }
      </div>
    );
  }
}

export default PartiesPage;
