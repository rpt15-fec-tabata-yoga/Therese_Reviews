import React from 'react';
import OverallRev from './OverallRev.jsx';
import RecentRev from './RecentRev.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
      <h2>CUSTOMER REVIEWS</h2>
      <div>
        <OverallRev />
        <RecentRev />
      </div>
      </div>
    );
  }
};

export default App;