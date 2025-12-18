import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import LoanListScreen from './src/screens/LoanListScreen';
import {Colors} from './src/constants';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <LoanListScreen />
    </SafeAreaProvider>
  );
};

export default App;
