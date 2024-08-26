import { Dimensions, StyleSheet } from 'react-native';
import {VoteRoom} from './VoteRoom';
import {Button} from 'react-native-paper';

const {width:SCREEN_WIDTH} = Dimensions.get("window");
console.log(SCREEN_WIDTH);

export default function VoteRoomCell({item}: {item: VoteRoom}) {
  return (
    <Button style={styles.btn} mode="contained-tonal" onPress={() => console.log(item.id)}>
      {item.id} {item.elector}
    </Button>
  );
}

const styles = StyleSheet.create({
    btn: {
        marginTop: 20,
        marginHorizontal: 10,
        width: SCREEN_WIDTH - 100
    }
})