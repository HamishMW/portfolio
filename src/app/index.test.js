import React from 'react';
import { shallow } from 'enzyme';
import App from './index';

it('renders without crashing', () => {
  shallow(<App />);
});
