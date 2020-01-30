import React from 'react';
import renderer from 'react-test-renderer';
import Element from '../Components/Cart/Element';

test('Cart Element equals its snaphot', () => {
  const component = renderer.create(
    <Element
      id={1}
      name="A Product"
      onLess={console.log}
      onMore={console.log}
      onDelete={console.log}
      quantity={1}
      price={10}
      image="california.jpg"
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
