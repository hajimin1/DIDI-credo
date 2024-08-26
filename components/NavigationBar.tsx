import {createContext, useContext, useState} from 'react';
import {BottomNavigation} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Screen from './Screen';
import Wallet from './Wallet';

const BottomNavigationContext = createContext({
  setIndex: (index: number) => {},
});

export function useBottomNavigation() {
  return useContext(BottomNavigationContext);
}

export default function NavigationBar() {
  const QrRoute = () => <Screen />;
  const WalletRoute = () => <Wallet />;
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'QR', title: 'QR', focusedIcon: 'qrcode'},
    {
      key: 'wallet',
      title: 'Wallet',
      focusedIcon: 'wallet',
      unfocusedIcon: 'wallet-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    QR: QrRoute,
    wallet: WalletRoute,
  });

  return (
    <SafeAreaProvider>
      <BottomNavigationContext.Provider value={{setIndex}}>
        <BottomNavigation
          navigationState={{index, routes}}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
      </BottomNavigationContext.Provider>
    </SafeAreaProvider>
  );
}
