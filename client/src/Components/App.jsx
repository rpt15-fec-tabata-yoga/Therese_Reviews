import React from 'react';
import axios from 'axios';
import isPosOrNeg from '../utils/utilities.js';
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
          <div>
            <div>
              <div>Overall Reviews:</div>
              <span>{this.state.overallPosOrNeg}</span>
              <span>({this.state.reviews.length} reviews)</span>
              {/* <a class="tooltip">{this.state.posOrNeg}</a> */}
            </div>
          </div>
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
            <div className="title">Review Type</div>
          </div>
          <div>
            <div className="title">Purchase Type</div>
          </div>
          <div>
            <div className="title">Language</div>
          </div>
          <div>
            <div className="title">Date Range</div>
          </div>
          <div>
            <span className="title">Display As: </span>
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
            <div className="title">Filters</div>
            <div>Your Languages</div>
          </div>
          <div>
            <div>
              <span>Showing <b>{this.state.reviews.length}</b> reviews that match the filters above ( <span>{this.state.overallPosOrNeg}</span> )</span>
            </div>
          </div>
        </div>
        <div>
          <div>Most Helpful Reviews <span>In the past 30 days</span></div>
          {this.state.reviews.map((rev) => {
            return <Reviews key={rev._id} review={rev} />
          })}
        </div>
      </div>
    );
  }
};

export default App;