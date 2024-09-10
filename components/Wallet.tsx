import {Appbar, Card, Text} from 'react-native-paper';
import {useBottomNavigation} from './NavigationBar';
import {FlatList, StyleSheet, View} from 'react-native';
import WalletCell from './WalletCell';

export default function Wallet() {
  const {voteRoomData}: any = useBottomNavigation();
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Wallet" />
      </Appbar.Header>
      <FlatList
        data={voteRoomData}
        renderItem={({item}) => <WalletCell item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: -10,
    marginBottom: 55
  }
})