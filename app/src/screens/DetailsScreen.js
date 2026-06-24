import React, { useState } from 'react';
import { StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

// Importando nossos componentes visuais limpos
import BotaoPrimario from '../components/BotaoPrimario';
import CardDetalhes from '../components/CardDetalhes';
import MiniMapa from '../components/MiniMapa';

export default function DetailsScreen({ route }) {
  const { academia } = route.params;
  const [loadingCheckin, setLoadingCheckin] = useState(false);

  const fazerCheckin = async () => {
    setLoadingCheckin(true);
    try {
      let location = await Location.getCurrentPositionAsync({});
      
      const pacoteParaOBackend = {
        polo_id: academia._id,
        nome_polo: academia.nome_oficial,
        latitude_usuario: location.coords.latitude,
        longitude_usuario: location.coords.longitude,
        data_hora: new Date().toISOString()
      };

      console.log("Pacote pronto para envio via POST:", pacoteParaOBackend);
      Alert.alert("Check-in Preparado!", `Registrando treino no polo: ${academia.nome_oficial || academia.bairro}.` );

      // O fetch(POST) entrará aqui

    } catch (error) {
      Alert.alert("Erro", "Não foi possível obter sua localização para o check-in.");
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
        <ActivityIndicator size="large" color="#4CAF50" style={{ marginVertical: 20 }} />
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









// import React, { useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import * as Location from 'expo-location';

// // Reutilizando o nosso componente de botão
// import BotaoPrimario from '../components/BotaoPrimario';

// export default function DetailsScreen({ route }) {
//   // Recebe os dados da academia que foi clicada na HomeScreen
//   const { academia } = route.params;
//   const [loadingCheckin, setLoadingCheckin] = useState(false);

//   // Função que será disparada ao clicar no botão
//   const fazerCheckin = async () => {
//     setLoadingCheckin(true);
//     try {
//       // 1. Pega a localização atual do usuário no momento do check-in
//       let location = await Location.getCurrentPositionAsync({});
//       const coordsUsuario = {
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//       };

//       // 2. Monta o pacote de dados que o professor exigiu
//       const pacoteParaOBackend = {
//         polo_id: academia._id,
//         nome_polo: academia.nome_oficial,
//         latitude_usuario: coordsUsuario.latitude,
//         longitude_usuario: coordsUsuario.longitude,
//         data_hora: new Date().toISOString()
//       };

//       // Mostramos no console apenas para você ver a mágica acontecendo por enquanto
//       console.log("Pacote pronto para envio via POST:", pacoteParaOBackend);

//       Alert.alert(
//         "Check-in Preparado!", 
//         `Você está registrando treino no polo do bairro ${academia.bairro}.\n\nEm breve isso será salvo no seu servidor Node.js!`
//       );

//       // Aqui entrará o fetch() com o método POST na próxima etapa

//     } catch (error) {
//       Alert.alert("Erro", "Não foi possível obter sua localização para o check-in.");
//     } finally {
//       setLoadingCheckin(false);
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       {/* Card de Informações */}
//       <View style={styles.infoCard}>
//         <Text style={styles.title}>{academia.nome_oficial || `Polo ${academia.bairro}`}</Text>
        
//         <Text style={styles.label}>BAIRRO</Text>
//         <Text style={styles.value}>{academia.bairro || 'Não informado'}</Text>
        
//         <Text style={styles.label}>ENDEREÇO</Text>
//         <Text style={styles.value}>{academia.logradouro || 'Endereço não cadastrado'}</Text>
//       </View>

//       {/* Mini-mapa focado na localização da academia */}
//       {academia.latitude && academia.longitude ? (
//         <View style={styles.mapContainer}>
//           <Text style={styles.labelMap}>LOCALIZAÇÃO DO POLO</Text>
//           <MapView
//             style={styles.map}
//             initialRegion={{
//               latitude: parseFloat(academia.latitude),
//               longitude: parseFloat(academia.longitude),
//               latitudeDelta: 0.01, // Zoom mais próximo
//               longitudeDelta: 0.01,
//             }}
//             scrollEnabled={false} // Trava o mapa para não atrapalhar a rolagem da tela
//             zoomEnabled={false}
//           >
//             <Marker
//               coordinate={{
//                 latitude: parseFloat(academia.latitude),
//                 longitude: parseFloat(academia.longitude)
//               }}
//               pinColor="green"
//             />
//           </MapView>
//         </View>
//       ) : (
//         <View style={styles.mapPlaceholder}>
//           <Text style={{ color: '#999' }}>Coordenadas indisponíveis para este polo.</Text>
//         </View>
//       )}

//       {/* Botão de Check-in */}
//       {loadingCheckin ? (
//         <ActivityIndicator size="large" color="#105bab" style={{ marginVertical: 20 }} />
//       ) : (
//         <BotaoPrimario 
//           titulo="✅ Fazer Check-in neste Polo" 
//           onPress={fazerCheckin} 
//         />
//       )}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f4f4f4' },
//   infoCard: { backgroundColor: '#fff', padding: 20, margin: 15, borderRadius: 8, elevation: 1 },
//   title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#333' },
//   label: { fontSize: 12, color: '#999', marginTop: 10, fontWeight: 'bold' },
//   value: { fontSize: 16, color: '#444', marginTop: 2 },
  
//   mapContainer: { marginHorizontal: 15, marginBottom: 20, backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden', elevation: 1 },
//   labelMap: { fontSize: 12, color: '#999', fontWeight: 'bold', padding: 15, backgroundColor: '#fff' },
//   map: { width: '100%', height: 200 },
//   mapPlaceholder: { height: 200, backgroundColor: '#e0e0e0', margin: 15, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }
// });