import React from 'react';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';

import Root from "./components/Root";
import history from "./config/history";
import store from './redux';

export default () => (
   <Provider store={store}>
      <ConnectedRouter history={history}>
         <Root history={history}/>
      </ConnectedRouter>
   </Provider>
);
