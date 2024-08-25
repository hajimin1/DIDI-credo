import { View } from "react-native";
import { VoteRoom } from "./VoteRoom";
import { Text } from "react-native-paper";

export default function VoteRoomCell({item}: {item: VoteRoom}) {
    return (
        <View>
            <Text>{item.id}</Text>
            <Text>{item.elector}</Text>
        </View>
    )
}