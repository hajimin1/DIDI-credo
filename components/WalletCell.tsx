import {StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-paper';

export default function WalletCell({item}: {item: any}) {
  console.log(item);
  return (
    <>
      <Card style={styles.vcCard}>
        <Text>vote room VC: {item.voteRoomVC}</Text>
        <Text>vote room ID: {item.voteRoomId}</Text>
      </Card>
    </>
  );
}

const styles = StyleSheet.create({

  vcCard: {
    justifyContent: 'center',
    marginHorizontal: 5,
    marginBottom: 10,
    padding: 20,
    marginTop: 10,
  },
});
