import React from 'react';
import {Provider} from 'react-redux';
import './static/css/main1';
import Routers from './routes/index';
import configureStore from './store/configureStore';
const store = configureStore();

// store.subscribe(() =>
//     console.log('store'),
//     console.log(store.getState())
// );


const Root = () => (
    <Provider store={store}>
      <Routers />
    </Provider>
);

export default Root;
