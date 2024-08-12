/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, Text, useColorScheme} from 'react-native';
import type {InitConfig} from '@credo-ts/core';
import {Agent} from '@credo-ts/core';
import {agentDependencies} from '@credo-ts/react-native';
import { HttpOutboundTransport, WsOutboundTransport } from '@credo-ts/core';
import {AskarModule} from '@credo-ts/askar';
import {ariesAskar} from '@hyperledger/aries-askar-react-native';

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

function App(): React.JSX.Element {
  return <Text>hello</Text>;
}

const styles = StyleSheet.create({
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

export default App;
