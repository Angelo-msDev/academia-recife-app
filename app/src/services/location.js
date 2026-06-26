// src/utils/location.js
import * as Location from 'expo-location';
import { Alert } from 'react-native';

export const obterLocalizacaoSegura = async () => {
  try {
    // 1. Centraliza o pedido de permissão
    let { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        "Permissão Necessária", 
        "Precisamos da sua localização para o funcionamento correto deste recurso."
      );
      return null; // Retorna nulo se o usuário negar
    }

    // 2. Centraliza a captura da coordenada
    let location = await Location.getCurrentPositionAsync({});
    return location.coords; // Retorna apenas o que importa: latitude e longitude

  } catch (error) {
    console.error("Erro no serviço de localização:", error);
    Alert.alert("Erro de GPS", "Não foi possível capturar sua localização atual.");
    return null;
  }
};