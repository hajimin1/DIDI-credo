import {useState} from 'react';
import {BottomNavigation, Text} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import QrCamera from './QrCamera';

export default function NavigationBar() {
  const QrRoute = () => <QrCamera />;

  const VoteRoute = () => <Text>vote</Text>;

  const WalletRoute = () => <Text>wallet</Text>;

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'vote',
      title: 'Vote',
      focusedIcon: 'vote',
      unfocusedIcon: 'vote-outline',
    },
    {key: 'QR', title: 'QR', focusedIcon: 'qrcode'},
    {
      key: 'wallet',
      title: 'Wallet',
      focusedIcon: 'wallet',
      unfocusedIcon: 'wallet-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    vote: VoteRoute,
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
