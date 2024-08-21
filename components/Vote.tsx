import {useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';

export default function Vote() {
  const voteTitle = ['2024학년도 총학생회 선거', '2023학년도 총학생회 선거', '제22회 학생회 선거'];

  const pan1 = useRef(new Animated.ValueXY()).current;
  const pan2 = useRef(new Animated.ValueXY()).current;
  const [scrollViewWidth, setScrollViewWidth] = useState(0);
  const boxWidth = scrollViewWidth * 0.8;
  const boxDistance = scrollViewWidth - boxWidth;
  const halfBoxDistance = boxDistance / 2;

  const renderItem1: ListRenderItem<string> = ({item, index}) => (
    <Animated.View
      style={{
        transform: [
          {
            scale: pan1.x.interpolate({
              inputRange: [
                (index - 1) * boxWidth - halfBoxDistance,
                index * boxWidth - halfBoxDistance,
                (index + 1) * boxWidth - halfBoxDistance,
              ],
              outputRange: [0.8, 1, 0.8],
              extrapolate: 'clamp',
            }),
          },
        ],
      }}>
      <Card style={[styles.card, {width: boxWidth}]}>
        <Card.Content>
          <Text variant="bodyMedium">{item}</Text>
          <Button mode="contained-tonal" style={styles.btn}>
            투표하기
          </Button>
        </Card.Content>
      </Card>
    </Animated.View>
  );

  const renderItem2: ListRenderItem<string> = ({item, index}) => (
    <Animated.View
      style={{
        transform: [
          {
            scale: pan2.x.interpolate({
              inputRange: [
                (index - 1) * boxWidth - halfBoxDistance,
                index * boxWidth - halfBoxDistance,
                (index + 1) * boxWidth - halfBoxDistance,
              ],
              outputRange: [0.8, 1, 0.8],
              extrapolate: 'clamp',
            }),
          },
        ],
      }}>
      <Card style={[styles.card, {width: boxWidth}]}>
        <Card.Content>
          <Text variant="bodyMedium">{item}</Text>
          <Button mode="elevated" style={styles.btn}>
            투표하기
          </Button>
        </Card.Content>
      </Card>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.header}>vote</Text>
      </View>

      <View style={styles.subHeader}>
        <Text style={styles.subTitle}>참여하지 않은 투표</Text>
      </View>

      <FlatList
        horizontal
        data={voteTitle}
        contentContainerStyle={{paddingVertical: 16}}
        contentInsetAdjustmentBehavior="never"
        snapToAlignment="center"
        decelerationRate="fast"
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
        snapToInterval={boxWidth}
        contentInset={{
          left: halfBoxDistance,
          right: halfBoxDistance,
        }}
        contentOffset={{x: halfBoxDistance * -1, y: 0}}
        onLayout={e => {
          setScrollViewWidth(e.nativeEvent.layout.width);
        }}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {x: pan1.x}}}], {
          useNativeDriver: false,
        })}
        keyExtractor={(item, index) => `${index}-${item}`}
        renderItem={renderItem1}
      />

      <View style={styles.subHeader}>
        <Text style={styles.subTitle}>참여한 투표</Text>
      </View>

      <FlatList
        horizontal
        data={voteTitle}
        contentContainerStyle={{paddingVertical: 16}}
        contentInsetAdjustmentBehavior="never"
        snapToAlignment="center"
        decelerationRate="fast"
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
        snapToInterval={boxWidth}
        contentInset={{
          left: halfBoxDistance,
          right: halfBoxDistance,
        }}
        contentOffset={{x: halfBoxDistance * -1, y: 0}}
        onLayout={e => {
          setScrollViewWidth(e.nativeEvent.layout.width);
        }}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {x: pan2.x}}}], {
          useNativeDriver: false,
        })}
        keyExtractor={(item, index) => `${index}-${item}`}
        renderItem={renderItem2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 30,
  },
  title: {alignItems: 'center'},
  header: {
    fontSize: 23,
    fontWeight: '300',
  },
  subHeader: {
    marginTop: 30,
    marginLeft: 10,
  },
  subTitle: {fontSize: 16},
  notVotedTitle: {
    alignItems: 'center',
  },
  current: {
    marginTop: 10,
  },
  btn: {
    marginTop: 10,
    paddingHorizontal: 50,
  },
  card: {},
});
