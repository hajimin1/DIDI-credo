import {Dimensions, StyleSheet, View} from 'react-native';
import {Candidate, VoteRoom} from './VoteRoom';
import {Button, Icon, Modal, Portal, Text} from 'react-native-paper';
import {useBottomNavigation} from './NavigationBar';
import {useEffect, useState} from 'react';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export default function VoteRoomCell({item}: {item: VoteRoom}) {
  const {setIndex, setVoteRoomData} = useBottomNavigation();
  const [visible, setVisible] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null,
  );

  const showModal = () => {
    console.log('Opening Modal...');
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
    console.log('Closing Modal...');
  };

  const handleConfirm = () => {
    console.log('Confirmed, navigating...');
    setVoteRoomData((prevData: {voteRoomVC: number; voteRoomId: number}[]) => [
      ...prevData,
      {voteRoomVC: item.voteRoomVC, voteRoomId: item.voteRoomId},
    ]);
    setIndex(1);
    hideModal();
  };

  const handleCandidatePress = (candidate: Candidate) => {
    console.log(candidate);
    setSelectedCandidate(candidate);
    showModal();
  };

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}>
          <View style={styles.question}>
            <Icon source="vote-outline" size={40} />

            <View style={styles.candidateNumContain}>
              <Text style={styles.idQueText}>
                {selectedCandidate?.candidateId}
              </Text>
              <Text>번</Text>
            </View>

            <View style={styles.candidateContain}>
              <Text>후보자 </Text>
              <Text style={styles.nameQueText}>
                {selectedCandidate?.candidateName}
              </Text>
              <Text> 님을 </Text>
            </View>

            <View style={styles.candidateContain}>
              <Text>투표하시겠습니까?</Text>
            </View>
          </View>
          <View style={styles.answer}>
            <Button
              mode="contained-tonal"
              onPress={handleConfirm}
              style={styles.answerbtn}>
               예 
            </Button>
            <Button mode="outlined" onPress={hideModal} style={styles.answerbtn}>
              아니오
            </Button>
          </View>
        </Modal>
      </Portal>
      <View style={styles.container}>
        {item.candidates.map(candidate => (
          <Button
            key={candidate.candidateId}
            style={styles.btn}
            mode="contained-tonal"
            onPress={() => {
              handleCandidatePress(candidate);
            }}>
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
  question: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  idQueText: {
    fontWeight: 800,
    marginTop: 1,
  },
  nameQueText: {
    fontWeight: 800,
  },
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 5,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  answer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 25,
  },
  answerbtn: {
    marginHorizontal: 15,
    width: 110,
    height: 55, 
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  candidateNumContain: {
    flexDirection: 'row',
    marginTop: 40,
  },
  candidateContain: {
    flexDirection: 'row',
    marginTop: 5,
  },
});
