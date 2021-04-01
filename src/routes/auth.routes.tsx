import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Auth = createStackNavigator();

import SignIn from '../pages/SignIn';
import Signup from '../pages/SignUp';

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={Signup} />
  </Auth.Navigator>
);

export default AuthRoutes;
