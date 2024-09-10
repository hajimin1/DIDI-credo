/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import type {InitConfig} from '@credo-ts/core';
import {Agent} from '@credo-ts/core';
import {agentDependencies} from '@credo-ts/react-native';
import {HttpOutboundTransport, WsOutboundTransport} from '@credo-ts/core';
import {AskarModule} from '@credo-ts/askar';
import {ariesAskar} from '@hyperledger/aries-askar-react-native';
import NavigationBar from './components/NavigationBar';
import {
  configureFonts,
  MD3LightTheme,
  PaperProvider,
  Text,
} from 'react-native-paper';
import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

const config: InitConfig = {
  label: 'docs-agent-react-native',
  walletConfig: {
    id: 'wallet-id',
    key: 'testkey0000000000000000000000000',
  },
};

const agent = new Agent({
  config,
  dependencies: agentDependencies,
  modules: {
    // Register the Askar module on the agent
    askar: new AskarModule({
      ariesAskar,
    }),
  },
});

agent.registerOutboundTransport(new HttpOutboundTransport());
agent.registerOutboundTransport(new WsOutboundTransport());

agent
  .initialize()
  .then(() => {
    console.log('Agent initialized!');
  })
  .catch(e => {
    console.error(
      `Something went wrong while setting up the agent! Message: ${e}`,
    );
  });

const receiveInvitation = async (agent: Agent, invitationUrl: string) => {
  const {outOfBandRecord} = await agent.oob.receiveInvitationFromUrl(
    invitationUrl,
  );

  return outOfBandRecord;
};

function App(): React.JSX.Element {
  const fontConfig = {
    fontFamily: 'Inria Sans',
  };

  const theme = {
    ...MD3LightTheme,
    fonts: configureFonts({config: fontConfig}),
  };

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  });

  return (
    <PaperProvider theme={theme}>
      <NavigationBar />
    </PaperProvider>
  );
}

export default App;
