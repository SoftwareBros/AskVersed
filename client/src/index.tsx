import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { StripeProvider } from 'react-stripe-elements';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <StripeProvider apiKey="pk_live_snq5kCX0DQrFNwptyy58gnVE">
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </StripeProvider> ,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
