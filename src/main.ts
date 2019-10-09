import React from 'react';
import { render } from 'react-dom';

import App from './app';

const el = document.getElementById('app');

render(React.createElement(App, null), el);
