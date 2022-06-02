import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'
import Icon from 'react-native-vector-icons/Ionicons'

import AbrirChamado from './AbrirChamado.js'
import Chamados from '../Navigations/index'

const Tab = createBottomTabNavigator();

const icons = {
 
  Chamado:{
    name: 'md-add'
  },

  Chamados:{
    name: 'md-headset'
  },
  Chamado_detalhe:{
    name: 'md-headset'
  }
};

export default function Home() {
 return (
   
            <Tab.Navigator
                initialRouteName='Chamado_detalhe'
                independent={true}
              screenOptions={
                  ({route})  =>({
                    tabBarStyle: { 
                      backgroundColor: '#E8C548',
                      padding: 7,
                      height: 60
                    },
                    tabBarShowLabel: true,
                    tabBarLabelStyle: { paddingBottom: 7, fontSize: 12},
                    tabBarActiveTintColor: 'white',
                    tabBarIcon: ({ color, size}) => {
                    const { name } = icons[route.name];
                    return <Icon name={name} color={color} size={size} />
                  }
                  })
              }
            >
                <Tab.Screen name="Chamados" component={Chamados} options={{ headerShown: false }}/>
                <Tab.Screen name="Chamado" component={AbrirChamado} options={{ headerShown: false }}/>
            </Tab.Navigator>

  );
}