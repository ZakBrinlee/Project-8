import React from 'react';
import SignupScreen from '../screens/auth/SignupScreen';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<SignupScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});