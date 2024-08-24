import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import Vote from './Vote';

export default function QrCamera() {
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes.length} codes!`);
      console.log(`Scanned ${codes[0].value}`);
    },
  });
  requestPermission();
  if (!hasPermission) return <Text>No Permission</Text>;
  if (device == null) return <Text>No Camera</Text>;
  return (
    <>
      <Camera
        style={StyleSheet.absoluteFill}
        codeScanner={codeScanner}
        device={device}
        isActive={true}
      />
    </>
  );
}
