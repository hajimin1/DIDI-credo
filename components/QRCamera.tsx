import React, {useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View} from 'react-native';
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
    <Camera
      style={StyleSheet.absoluteFill}
      codeScanner={codeScanner}
      device={device}
      isActive={true}
    />
  );
  return (
    <>
      {onQrScanner ? (
        cameraModule
      ) : (
        <TouchableOpacity style={styles.qrBtn} onPress={handleQrScanner}>
          <Text>QR</Text>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  qrBtn: {
    backgroundColor: '#3498db', // 버튼 배경색상 추가
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 6,
    borderColor: '#3498db',
    alignItems: 'center',
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
