import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

// Importando nossos serviços organizados
import { obterLocalizacaoSegura } from '../services/location';
import { getAcademiasRecife } from '../services/api-rec';

export default function MapScreen() {
  const [localizacaoUsuario, setLocalizacaoUsuario] = useState(null);
  const [polos, setPolos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarMapaEDados() {
      try {
        // 1. Usa o nosso serviço limpo para pegar a localização
        const coords = await obterLocalizacaoSegura();
        
        // Se o usuário negou a permissão ou deu erro, paramos aqui
        if (!coords) {
          setLoading(false);
          return;
        }

        // Configura o mapa para focar na coordenada retornada
        setLocalizacaoUsuario({
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.05, 
          longitudeDelta: 0.05,
        });

        // 2. Busca os polos na API da Prefeitura
        const dados = await getAcademiasRecife();
        
        // Filtra para desenhar apenas pinos válidos
        const polosValidos = dados.filter(polo => polo.latitude && polo.longitude);
        setPolos(polosValidos);

      } catch (error) {
        console.error("Erro ao carregar mapa:", error);
        Alert.alert('Erro', 'Não foi possível carregar os dados do mapa.');
      } finally {
        setLoading(false);
      }
    }

    carregarMapaEDados();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#105bab" />
        <Text style={{ marginTop: 10 }}>Buscando sua localização...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {localizacaoUsuario ? (
        <MapView 
          style={styles.map} 
          initialRegion={localizacaoUsuario}
          showsUserLocation={true}
        >
          {polos.map((polo) => (
            <Marker
              key={polo._id}
              coordinate={{
                latitude: parseFloat(polo.latitude),
                longitude: parseFloat(polo.longitude)
              }}
              title={polo.nome_oficial}
              description={polo.bairro}
              pinColor="green"
            />
          ))}
        </MapView>
      ) : (
        <View style={styles.center}>
          <Text>Não foi possível carregar o mapa. Permissão de GPS necessária.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});