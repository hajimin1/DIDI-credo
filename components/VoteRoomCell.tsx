import {Dimensions, StyleSheet, View} from 'react-native';
import {Candidate, VoteRoom} from './VoteRoom';
import {Button, Modal, PaperProvider, Portal, Text} from 'react-native-paper';
import {useBottomNavigation} from './NavigationBar';
import { useEffect, useState } from 'react';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export default function VoteRoomCell({item}: {item: VoteRoom}) {
  const {setIndex, setVoteRoomData} = useBottomNavigation();
  const [visible, setVisible] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate|null>(null);

  const showModal = () => {
    console.log('Opening Modal...');
    setVisible(true);
  }

  const hideModal = () => {
    setVisible(false);
    console.log('Closing Modal...');
  }

  const handleConfirm = () => {
    console.log('Confirmed, navigating...');
    setVoteRoomData(
      (prevData: {voteRoomVC: number; voteRoomId: number}[]) => [
        ...prevData,
        {voteRoomVC: item.voteRoomVC, voteRoomId: item.voteRoomId},
      ],
    );
    setIndex(1);
    hideModal();
  }

  const handleCandidatePress = (candidate: Candidate) => {
    console.log(candidate);
    setSelectedCandidate(candidate);
    showModal();
  }

  const containerStyle = { backgroundColor: 'white', padding: 20 }
  return (
    <>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}> 
          <Text>{selectedCandidate?.candidateId}번 후보자{selectedCandidate?.candidateName}님을 투표하시겠습니까?</Text>
          <Button onPress={handleConfirm}>예</Button>
          <Button onPress={hideModal}> 아니오</Button>
        </Modal>
      </Portal>
      <View style={styles.container}>
        {item.candidates.map(candidate => (
          <Button
            key={candidate.candidateId}
            style={styles.btn}
            mode="contained-tonal"
            onPress={() => {
              handleCandidatePress(candidate);}}>
            <Text>{`${candidate.candidateId}   ${candidate.candidateName}`}</Text>
          </Button>
        ))}
      </View>
      </>
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
    alignItems: 'center',
  },
});
