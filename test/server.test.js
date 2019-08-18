const React = require ('react');
const { shallow, mount, render } = require ('enzyme');
const request = require ('request');
// import { exportAllDeclaration } from '@babel/types';

test('Fetch reviews from database', (done) => {
  request('http://localhost:3001/api/reviews', (err, res, body) => {
    var reviews = JSON.parse(body);
    expect(reviews.length).toBe(100);
    done();
  });
});
