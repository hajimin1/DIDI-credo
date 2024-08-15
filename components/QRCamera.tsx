import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Appbar, Button} from 'react-native-paper';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

export default function QRCamera() {
  const {hasPermission, requestPermission} = useCameraPermission();
  const [onQrScanner, setQrScanner] = useState(false);
  const device = useCameraDevice('front');
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes.length} codes!`);
      console.log(`Scanned ${codes}`);
    },
  });

  const handleQrScanner = () => setQrScanner(event => !event);

  requestPermission();
  if (!hasPermission) return <Text>No Permission</Text>;
  if (device == null) return <Text>No Camera </Text>;

  const cameraModule = (
    <>
      <Camera
        style={StyleSheet.absoluteFill}
        codeScanner={codeScanner}
        device={device}
        isActive={true}
      />
      <Appbar.BackAction onPress={handleQrScanner}/>
    </>
  );
  return (
    <>
      {onQrScanner ? (
        cameraModule
      ) : (
        <Button icon="qrcode" onPress={handleQrScanner}>
          QR
        </Button>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  qrBtn: {
    backgroundColor: '#FFFFFF', // 버튼 배경색상 추가
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 6,
    borderColor: '#3498db',
    alignItems: 'center',
  },
  txt: {
    color: '#000000',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
