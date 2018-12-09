import React from 'react';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<ForgotPasswordScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});