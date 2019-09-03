
const isPosOrNeg = (revs) => {
  let pos = 0;
  let neg = 0;
  for (let i = 0; i < revs.length; ++i) {
    if (revs[i].recommended) {
      ++pos;
    } else {
      ++neg;
    }
  }

  if (pos > neg) {
    let percent = (pos / revs.length) * 100;
    if (percent > 50 && percent < 75) {
        return 'Very Positive';
    } else if (percent >= 75) {
        return 'Overwhelmingly Positive';
    }
  } else if (pos < neg) {
    let percent = (pos / revs.length) * 100;
    if (percent > 25 && percent < 50) {
        return 'Very Negative';
    } else if (percent <= 25) {
        return 'Overwhelmingly Negative';
    }
  } else if (pos === neg) {
    return 'Very Positive';
  }
};

export default isPosOrNeg;
