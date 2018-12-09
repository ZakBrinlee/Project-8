import React from 'react';
import ClientHomeScreen from '../screens/client/ClientHomeScreen';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<ClientHomeScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});