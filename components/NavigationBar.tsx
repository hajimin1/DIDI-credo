import {useState} from 'react';
import {BottomNavigation} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import QrCamera from './QrCamera';
import Wallet from './Wallet';

export default function NavigationBar() {
  const QrRoute = () => <QrCamera />;

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
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </SafeAreaProvider>
  );
}
