import {FlatList, StyleSheet, View} from 'react-native';
import {Appbar, Text} from 'react-native-paper';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {useEffect, useState} from 'react';
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
      // console.log(`Scanned ${codes[0].value}`);
      setPage(false);
      codes[0].value !== null ? setPage(true) : null;
    },
  });

  useEffect(() => {
    requestPermission();
  }, []);
  

  if (!hasPermission)
    return (
      <View style={styles.nope}>
        <Text>No Permission</Text>
      </View>
    );
  if (device == null)
    return (
      <View style={styles.nope}>
        <Text>No Camera</Text>
      </View>
    );

  useEffect(() => {
    if (page === true)
      navigation.navigate('Vote', {
        VoteRoomData,
      });
  }, [page, navigation])
  

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
        <Text style={styles.title}>
          {route.params.VoteRoomData[0].voteRoomName}
        </Text>
        <FlatList
          style={styles.item}
          data={route.params.VoteRoomData}
          renderItem={({item}) => <VoteRoomCell item={item} />}
        />
      </View>
    </>
  );
};

export default function Screen() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="QR" component={QRScreen} />
        <Stack.Screen name="Vote" component={VoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  nope: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 200,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  item: {
    marginTop: 10,
  },
});
