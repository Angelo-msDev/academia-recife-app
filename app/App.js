import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import MapScreen from './src/screens/MapScreen';
import HistoryScreen from './src/screens/HistoryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#105bab' }, // Verde no topo
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Academias Recife' }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Detalhes do Polo' }} />
        <Stack.Screen name="Map" component={MapScreen} options={{ title: 'Polos Próximos' }} />
        <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Meu Histórico' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}