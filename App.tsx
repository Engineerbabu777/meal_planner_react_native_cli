import React from 'react';
import {ModalPortal} from 'react-native-modals';
import StackNavigator from './navigation/StackNavigator';

const App: React.FC = () => {
  return (
    <>
      <StackNavigator />
      <ModalPortal />
    </>
  );
};

export default App;
