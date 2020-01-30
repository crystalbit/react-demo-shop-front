import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../Components/Header';

test('Header equals its snaphot', () => {
  const component = renderer.create(
    <Header />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
