import {Dimensions, StyleSheet, View} from 'react-native';
import {VoteRoom} from './VoteRoom';
import {Button, Text} from 'react-native-paper';
import {useBottomNavigation} from './NavigationBar';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export default function VoteRoomCell({item}: {item: VoteRoom}) {
  const {setIndex, setVoteRoomData} = useBottomNavigation();
  return (
    <View style={styles.container}>
      {item.candidates.map((candidate) => (
        <Button
          key={candidate.candidateId}
          style={styles.btn}
          mode="contained-tonal"
          onPress={() => {
            console.log(candidate);
            setVoteRoomData((prevData: {voteRoomVC: number, voteRoomId: number}[]) => [...prevData, {voteRoomVC: item.voteRoomVC, voteRoomId: item.voteRoomId}]);
            setIndex(1);
          }}>
          <Text>{`${candidate.candidateId}   ${candidate.candidateName}`}</Text>
        </Button>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginTop: 20,
    marginHorizontal: 10,
    width: SCREEN_WIDTH - 100,
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center'
  },
});
