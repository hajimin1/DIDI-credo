import {Dimensions, StyleSheet} from 'react-native';
import {VoteRoom} from './VoteRoom';
import {Button, Text} from 'react-native-paper';
import {useBottomNavigation} from './NavigationBar';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export default function VoteRoomCell({item}: {item: VoteRoom}) {
  const {setIndex} = useBottomNavigation();
  return (
    <Button
      style={styles.btn}
      mode="contained-tonal"
      onPress={() => {
        console.log(item.id);
        setIndex(1);
      }}>
      <Text>
        {item.id} {item.elector}
      </Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginTop: 20,
    marginHorizontal: 10,
    width: SCREEN_WIDTH - 100,
  },
});
