import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

// Reaproveitando nosso serviço limpo!
import { getAcademiasRecife } from '../services/api-rec';

export default function MapScreen() {
  const [localizacaoUsuario, setLocalizacaoUsuario] = useState(null);
  const [polos, setPolos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarMapaEDados() {
      try {
        // 1. Pede permissão de GPS
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permissão negada', 'Precisamos da sua localização para mostrar os polos próximos.');
          setLoading(false);
          return;
        }

        // 2. Pega a coordenada atual do usuário
        let location = await Location.getCurrentPositionAsync({});
        setLocalizacaoUsuario({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.05, // Controla o zoom do mapa
          longitudeDelta: 0.05,
        });

        // 3. Busca os polos na API
        const dados = await getAcademiasRecife();
        
        // Filtra para garantir que só vamos tentar desenhar pinos que tenham latitude e longitude válidas
        const polosValidos = dados.filter(polo => polo.latitude && polo.longitude);
        setPolos(polosValidos);

      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar o mapa.');
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
          showsUserLocation={true} // Coloca a bolinha azul nativa no usuário
        >
          {/* Loop para desenhar todos os polos da prefeitura no mapa */}
          {polos.map((polo) => (
            <Marker
              key={polo._id}
              coordinate={{
                latitude: parseFloat(polo.latitude),
                longitude: parseFloat(polo.longitude)
              }}
              title={polo.nome_oficial}
              description={polo.bairro}
              pinColor="green" // Cor do pino para combinar com seu app
            />
          ))}
        </MapView>
      ) : (
        <View style={styles.center}>
          <Text>Não foi possível carregar o mapa.</Text>
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





// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default function MapScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>A visualização em tela cheia do mapa entrará aqui, exibindo o raio verde ao seu redor e os polos próximos.</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
//   text: { fontSize: 16, textAlign: 'center', color: '#666' }
// });