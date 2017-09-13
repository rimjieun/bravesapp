import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Concessions from './../Components/Concessions/Concessions';
import Menu from './../Components/Menu/Menu';
import Confirmation from './../Components/Confirmation/Confirmation';
import ConcessionsMap from './../Components/Map/Map';
import Login from './../Components/Login/Login';
import Register from './../Components/Register/Register';

export default (props) => (
    <Router>
    <Scene key='root'>
      <Scene key='concessions' component={Concessions} hideNavBar />
      <Scene key='menu' component={Menu} hideNavBar />
      <Scene key='confirmation' component={Confirmation} hideNavBar />
      <Scene key='map' component={ConcessionsMap} hideNavBar />
      <Scene key='login' component={Login} initial hideNavBar />
      <Scene key='register' component={Register} hideNavBar />
    </Scene>
  </Router>
);