import {FlatList, StyleSheet, View} from 'react-native';
import {Appbar, Text} from 'react-native-paper';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import VoteRoomData from './VoteRoomData.json';
import VoteRoomCell from './VoteRoomCell';

const Stack = createNativeStackNavigator();

const QRScreen = ({navigation}: any) => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const [page, setPage] = useState(false);
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes[0].value}`);
      setPage(false);
      codes[0].value !== null ? setPage(true) : null;
    },
  });

  requestPermission();

  if (!hasPermission) return <Text>No Permission</Text>;
  if (device == null) return <Text>No Camera</Text>;
  if (page === true)
    navigation.navigate('Vote', {
      VoteRoomData,
    });

  return (
    <Camera
      style={StyleSheet.absoluteFill}
      codeScanner={codeScanner}
      device={device}
      isActive={true}
    />
  );
};

const VoteScreen = ({navigation, route}: any) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('QR');
          }}
        />
        <Appbar.Content title="Vote" />
      </Appbar.Header>
      <View style={styles.container}>
        <Text style={styles.title}>{route.params.VoteRoomData[0].voteRoomName}</Text>
        <FlatList style={styles.item} data={route.params.VoteRoomData} renderItem={VoteRoomCell} />
      </View>
    </>
  );
};

const WalletScreen = () => {
  return <></>;
}

export default function QrCamera() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="QR" component={QRScreen} />
        <Stack.Screen name="Vote" component={VoteScreen} />
        <Stack.Screen name="Wallet" component={WalletScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 200
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40
  },
  item: {
    marginTop: 10
  }
});
