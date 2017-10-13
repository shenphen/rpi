import React from 'react';
import { render } from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router } from 'react-router';
import { Route } from 'react-router-dom';
import WebFont from 'webfontloader';
// import { AppContainer } from 'react-hot-loader';

import ThemeStore from './stores/ThemeStore';
import TokenStore from './stores/TokenStore';
import App from './App';


import 'normalize.css';

const themeStore = new ThemeStore();
const tokenStore = new TokenStore();

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

const history = syncHistoryWithStore(browserHistory, routingStore);

const stores = {
  themeStore,
  tokenStore,
  routing: routingStore
}

render(
  <Provider {...stores}>
    <Router history={history}>
      <Route component={App}/>
    </Router>
  </Provider>,
  
  document.getElementById('root')
  
);

WebFont.load({
  google: {
    families: ['Roboto:n3,n4,n7', 'sans-serif']
  }
});

// if (module.hot) {
//   module.hot.accept('./components/App', () => {
//     const NextApp = require('./components/App').default;

//     render(
//       <AppContainer>
//         <NextApp store={store} />
//       </AppContainer>,
//       document.getElementById('root')
//     );
//   });
// }
