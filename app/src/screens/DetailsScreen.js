import React, { useState } from 'react';
import { StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

// Importando a nova função do service
import { enviarCheckinBackend } from '../services/my-api';

// Importando componentes visuais limpos
import BotaoPrimario from '../components/BotaoPrimario';
import CardDetalhes from '../components/CardDetalhes';
import MiniMapa from '../components/MiniMapa';

export default function DetailsScreen({ route }) {
  const { academia } = route.params;
  const [loadingCheckin, setLoadingCheckin] = useState(false);

  const fazerCheckin = async () => {
    setLoadingCheckin(true);
    try {
      // 1. Pega a localização
      let location = await Location.getCurrentPositionAsync({});
      
      // 2. Prepara o pacote de dados COMPLETO
      const pacoteParaOBackend = {
        polo_id: academia._id,
        nome_polo: academia.nome_oficial,
        bairro_polo: academia.bairro,            // NOVA COLUNA
        longradouro_polo: academia.logradouro,   // NOVA COLUNA
        latitude_polo: parseFloat(academia.latitude),   // NOVA COLUNA
        longitude_polo: parseFloat(academia.longitude), // NOVA COLUNA
        latitude_usuario: location.coords.latitude,
        longitude_usuario: location.coords.longitude,
        data_hora: new Date().toISOString()
      };

      // 3. Chama o Service (Regra de negócio separada da UI!)
      await enviarCheckinBackend(pacoteParaOBackend);

      Alert.alert("Sucesso! ✅", `Check-in no Polo: ${academia.nome_oficial || academia.bairro} registrado no seu servidor!`);

    } catch (error) {
      Alert.alert(
        "Erro de Conexão", 
        "Não foi possível conectar ao servidor. Verifique se o Node está rodando e se o IP está correto."
      );
    } finally {
      setLoadingCheckin(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <CardDetalhes academia={academia} />

      <MiniMapa 
        latitude={academia.latitude} 
        longitude={academia.longitude} 
      />

      {loadingCheckin ? (
        <ActivityIndicator size="large" color="#105bab" style={{ marginVertical: 20 }} />
      ) : (
        <BotaoPrimario 
          titulo="✅ Fazer Check-in neste Polo" 
          onPress={fazerCheckin} 
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4' }
});