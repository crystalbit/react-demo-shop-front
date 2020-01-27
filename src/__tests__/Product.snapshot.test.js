import React from 'react';
import renderer from 'react-test-renderer';
import Product from '../Components/Product';

test('Product equals its snaphot', () => {
  const component = renderer.create(
    <Product
      product={{
        id: 1,
        name: 'A Product',
        subheader: 'sub',
        image: 'california.jpg',
        description: 'good product',
        price: 100
      }}
      quantity={5}
      onAdd={console.log}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
