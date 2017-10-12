import React from 'react';
import { render } from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router } from 'react-router';
import { Route } from 'react-router-dom';
// import { AppContainer } from 'react-hot-loader';

import ThemeStore from './stores/ThemeStore';
import TokenStore from './stores/TokenStore';
import App from './App';


import 'normalize.css';

const themeStore = new ThemeStore();
const tokenStore = new TokenStore();

const stores = {
  themeStore,
  tokenStore
}

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

const history = syncHistoryWithStore(browserHistory, routingStore);

render(
  <Provider {...stores}>
    <Router history={history}>
      <Route component={App}/>
    </Router>
  </Provider>,
  
  document.getElementById('root')
  
);

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
