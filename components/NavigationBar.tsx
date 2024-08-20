import {useState} from 'react';
import {StyleSheet} from 'react-native';
import {BottomNavigation, Text} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

export default function NavigationBar() {
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes.length} codes!`);
      console.log(`Scanned ${codes}`);
    },
  });
  requestPermission();
  if (!hasPermission) return <Text>No Permission</Text>;
  if (device == null) return <Text>No Camera</Text>;

  const QrRoute = () => (
    <>
      <Camera
        style={StyleSheet.absoluteFill}
        codeScanner={codeScanner}
        device={device}
        isActive={true}
      />
    </>
  );

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
