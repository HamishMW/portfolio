import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { config } from 'react-transition-group';

config.disabled = true;

window.matchMedia = jest.fn().mockImplementation(query => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };
});

configure({ adapter: new Adapter() });
