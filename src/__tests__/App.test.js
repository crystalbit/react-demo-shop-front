import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import Strings from '../Helpers/Strings';

test('renders App and checks the title', () => {
  const { getByText } = render(<App />);
  const titleText = getByText(new RegExp(Strings.shop.name));
  expect(titleText).toBeInTheDocument();
});
