import React from 'react';
import { render } from '@testing-library/react';
import Main from './Main';

test('renders clear link', () => {
  const { getByText } = render(<Main />);
  const linkElement = getByText(/clear/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders image', () => {
  const { getByAltText } = render(<Main />);
  const linkElement = getByAltText(/img/i);
  expect(linkElement).toBeInTheDocument();
});

