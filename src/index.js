import React from 'react';
import { render } from 'react-snapshot';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';

render(<App/>, document.getElementById('root'));
registerServiceWorker();
