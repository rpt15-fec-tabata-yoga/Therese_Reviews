import React from 'react';
import axios from 'axios';
import isPosOrNeg from '../utils/utilities.js';
import OverallRev from './OverallRev.jsx';
import RecentRev from './RecentRev.jsx';
import Reviews from './Reviews.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      overallPosOrNeg: '',
      recentPosOrNeg: '',
      recent: []
    };
  }

  componentDidMount () {
    axios.get('/api/reviews/' + 'Stardew Valley')
    .then((data) => {
      this.setState({
        reviews: data.data
      });
    })
    .then(() => {
      let posOrNeg = isPosOrNeg(this.state.reviews);
      this.setState({
        overallPosOrNeg: posOrNeg
      });
    })
    .then(() => {
      let recent = [];
      let today = new Date();
      let thirtyDaysAgo = new Date(today - (30 * 86400000));
      for (let i = 0; i < this.state.reviews.length; ++i) {
        let posted = new Date(this.state.reviews[i].posted);
        if (thirtyDaysAgo <= posted && posted <= today) {
          recent.push(this.state.reviews[i]);
        }
      }
      let posOrNeg = isPosOrNeg(recent);
      this.setState({
        recentPosOrNeg: posOrNeg,
        recent: recent
      });
    })
    .catch((err) => {
      throw(err);
    });
  }

  render() {
    return (
      <div>
        <h2>CUSTOMER REVIEWS</h2>
        <div>
          {/* <OverallRev reviews={this.state.reviews}/> */}
          <div>
            <div>
              <div>Overall Reviews:</div>
              <span>{this.state.overallPosOrNeg}</span>
              <span>({this.state.reviews.length} reviews)</span>
              {/* <a class="tooltip">{this.state.posOrNeg}</a> */}
            </div>
          </div>
          {/* <RecentRev /> */}
          <div>
            <div>
              <div>Recent Reviews:</div>
              <span>{this.state.recentPosOrNeg}</span>
              <span>({this.state.recent.length} reviews)</span>
              {/* <a class="tooltip">{something}</a> */}
            </div>
          </div>
        </div>
        <div>
          <div>
            <div class="title">Review Type</div>
          </div>
          <div>
            <div class="title">Purchase Type</div>
          </div>
          <div>
            <div class="title">Language</div>
          </div>
          <div>
            <div class="title">Date Range</div>
          </div>
          <div>
            <span class="title">Display As: </span>
            <select>
              <option value="summary">Summary</option>
              <option value="all">Most Helpful</option>
              <option value="recent">Recent</option>
              <option value="funny">Funny</option>
            </select>
          </div>
          <div>
            <span>Show Graph</span>
            <div>&nbsp</div>
          </div>
        </div>
        <div>
          <div>
            <div class="title">Filters</div>
            <div>Your Languages</div>
          </div>
          <div>
            <div>
              <span>Showing <b>{this.state.reviews.length}</b> reviews that match the filters above (
                {/* <span>{positiveOrNegative}</span> */}
                 )
              </span>
            </div>
          </div>
        </div>
        <div>
          <div>Most Helpful Reviews <span>In the past 30 days</span></div>
          {/* <Reviews /> */}
        </div>
      </div>
    );
  }
};

export default App;