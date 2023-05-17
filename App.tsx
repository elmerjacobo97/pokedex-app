import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';
import {PersistGate} from 'redux-persist/integration/react';

import {persistor, store} from './src/store';
import {Tabs} from './src/navigator';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          {/*<TabList />*/}
          <Tabs />
          <Toast />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
