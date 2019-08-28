import React from 'react';

class OverallRev extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div>
          <div>Overall Reviews:</div>
          <span>{positiveOrNegative}</span>
          <span>({something} reviews)</span>
          <a class="tooltip">{something}</a>
        </div>
      </div>
    );
  }
};

export default OverallRev;
