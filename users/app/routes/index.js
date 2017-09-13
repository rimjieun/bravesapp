import React from 'react';
import { Scene, Router } from 'react-native-router-flux';

import Concessions from './../Components/Concessions/Concessions';
import Menu from './../Components/Menu/Menu';
import Confirmation from './../Components/Confirmation/Confirmation';

export default () => (
  <Router>
    <Scene key="root">
      <Scene key="concessions" component={Concessions} initial hideNavBar />
      <Scene key="menu" component={Menu} hideNavBar />
      <Scene key="confirmation" component={Confirmation} hideNavBar />
    </Scene>
  </Router>
);
