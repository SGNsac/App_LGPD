
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Chamado from '../Home/ListaChamados'
import Chamado_detalhe from '../Home/Chamado_detalhe'
import Responder_chamado from '../Home/Responder_chamado'

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Chamado} options={{headerShown: false }} />
        <Stack.Screen name="Chamado_detalhe" options={{title:'Detalhe' }} component={Chamado_detalhe} />
        <Stack.Screen name="Responder_chamado" options={{title:'Responder' }} component={Responder_chamado} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;