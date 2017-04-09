import React, { Component, PropTypes } from 'React';

class Ability extends Component {
  static propTypes = {
    ability_name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  };

  render() {
    return (
      <div className="ability">
        <h3 className="ability-header">
          {this.props.ability_name}
        </h3>
        <p className="ability-description">
          {this.props.description}
        </p>
      </div>
    );
  }
}

export default Ability;
