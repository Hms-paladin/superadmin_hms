import React from 'react';
import Routes from './router/router.js'
import Homepage from './drawerpage/drawerpage.js';


import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './store/configureStore';

const store = configureStore();

export const apiurl="http://52.200.251.222:8158/api/v1/"

class App extends React.Component {
  render(){
    return (
      <div>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            {/* <Routes /> */}
            <Homepage />
          </ConnectedRouter>
        </Provider>
          
      </div>
    );
  }
}

export default App;
