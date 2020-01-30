import React from 'react';
import renderer from 'react-test-renderer';
import Thumbnail from '../Components/Cart/Thumbnail';
import { BrowserRouter as Router } from "react-router-dom";


test('Cart/Thumbnail with cart sum == $100 equals its snaphot', () => {
  const component = renderer.create(
    <Router>
      <Thumbnail sum={100} />
    </Router>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
