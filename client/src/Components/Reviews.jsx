import React from 'react';
import style from '../Styles/Reviews.css';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toRecOrNot: '',
      toRecOrNotImg: ''
    };
  }

  componentDidMount() {
    this.decideToRecOrNot();
  }

  decideToRecOrNot() {
    if (this.props.review.recommended) {
      this.setState({
        toRecOrNot: 'Recommended',
        toRecOrNotImg: 'https://steamstore-a.akamaihd.net/public/shared/images/userreviews/icon_thumbsUp_v6.png'
      });
    } else {
      this.setState({
        toRecOrNot: 'Not Recommended',
        toRecOrNotImg: 'https://steamcommunity-a.akamaihd.net/public/shared/images/userreviews/icon_thumbsDown.png?v=1'
      });
    }
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <div className="avatar">
              <div>
                <img src={this.props.review.userPhoto}></img>
              </div>
            </div>
            <div className="name">{this.props.review.author}</div>
            <div>{this.props.review.numOfGames} products in account</div>
            <div>{this.props.review.numOfReviews} reviews</div>
          </div>
          <div>
            <div>
              <img src={this.state.toRecOrNotImg}></img>
            </div>
            <img src="https://steamstore-a.akamaihd.net/public/shared/images/userreviews/icon_review_steam.png"></img>
            <div>{this.state.toRecOrNot}</div>
            <div>{this.props.review.recordHours} hrs on record</div>
            <div>Posted: {this.props.review.posted.substring(4, 10)}</div>
            <div>{this.props.review.body}</div>
            <div>------</div>
            <div>
              <span>Was this review helpful?</span>
              <span>
                <img src="https://steamstore-a.akamaihd.net/public/shared/images/buttons/icons_16.png?v=5"></img>
                 Yes
              </span>
              <span>
                <img src="https://steamstore-a.akamaihd.net/public/shared/images/buttons/icons_16.png?v=5"></img>
                 No
              </span>
              <span>
                <img src="https://steamstore-a.akamaihd.net/public/shared/images/buttons/icons_16.png?v=5"></img>
                 Funny
              </span>
            </div>
            <div>
              {this.props.review.helpful} people found this review helpful
              <br></br>
              {this.props.review.unhelpful} people found this review unhelpful
              <br></br>
              {this.props.review.funny} people found this review funny
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Reviews;
