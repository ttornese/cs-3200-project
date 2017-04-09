import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ability extends Component {
  static propTypes = {
    ability_name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  };

  render() {
    return (
      <div className="ability">
        <h4 className="ability-header">
          {"Ability: " + this.props.ability_name}
        </h4>
        <p className="ability-description">
          {this.props.description}
        </p>
      </div>
    );
  }
}

export default Ability;
