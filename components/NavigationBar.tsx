import {createContext, useContext, useState, Dispatch, SetStateAction} from 'react';
import {BottomNavigation} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Screen from './Screen';
import Wallet from './Wallet';

const BottomNavigationContext = createContext<{
  setIndex: (index: number) => void;
  voteRoomData: { voteRoomVC: number; voteRoomId: number }[];
  setVoteRoomData: Dispatch<SetStateAction<{ voteRoomVC: number; voteRoomId: number }[]>>;
}>({
  setIndex: () => {},
  voteRoomData: [],
  setVoteRoomData: () => {},
});

export function useBottomNavigation() {
  return useContext(BottomNavigationContext);
}

export default function NavigationBar() {
  const QrRoute = () => <Screen />;
  const WalletRoute = () => <Wallet />;
  const [index, setIndex] = useState(0);
  const [voteRoomData, setVoteRoomData] = useState<{voteRoomVC: number, voteRoomId: number}[]>([]);
  const [routes] = useState([
    {key: 'QR', title: 'QR', focusedIcon: 'qrcode'},
    {
      key: 'wallet',
      title: 'Wallet',
      focusedIcon: 'wallet',
      unfocusedIcon: 'wallet-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    QR: QrRoute,
    wallet: WalletRoute,
  });

  return (
    <SafeAreaProvider>
      <BottomNavigationContext.Provider value={{setIndex, setVoteRoomData, voteRoomData}}>
        <BottomNavigation
          navigationState={{index, routes}}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
      </BottomNavigationContext.Provider>
    </SafeAreaProvider>
  );
}
