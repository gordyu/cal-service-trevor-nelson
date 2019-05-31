
// const request = require('supertest');
// const app = require('./server/server.js');

// describe('Serve static files', () => {
//   test('Should serve static files on an intial GET request', (done) => {
//     request(app).get('/').then((response) => {
//       expect(response.type).toBe('text/html');
//     });
//   });
// });

// describe('Test Database Seeding', () => {
//   test('It should send response success', (done) => {
//     request(app).get('/seedDb').then((response) => {
//       expect(response).toBe('success');
//     });
//   });
// });

import React from 'react';
import { shallow, mount, render } from 'enzyme';

test('render a label', () => {
  const wrapper = shallow(
    <Label>Hello Jest!</Label>
  );
  expect(wrapper).toMatchSnapshot();
});