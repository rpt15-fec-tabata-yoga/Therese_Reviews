import React from 'react';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <div class="avatar">
              <div>
                <img src={img}></img>
              </div>
            </div>
            <div class="name">{author}</div>
            <div>{numOfGames} products in account</div>
            <div>{numOfReviews} reviews</div>
          </div>
          <div></div>
        </div>
      </div>
    );
  }
};

export default Reviews;
