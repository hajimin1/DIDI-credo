import {Card} from 'react-native-paper';
import {useBottomNavigation} from './NavigationBar';
import {FlatList, StyleSheet} from 'react-native';
import WalletCell from './WalletCell';

export default function Wallet() {
  const {voteRoomData}: any = useBottomNavigation();
  return (
    <FlatList
      data={voteRoomData}
      renderItem={({item}) => <WalletCell item={item} />}
    />
  );
}

