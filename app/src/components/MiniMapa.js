import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MiniMapa({ latitude, longitude }) {
  // Se não vierem coordenadas válidas, exibe um bloco cinza amigável
  if (!latitude || !longitude) {
    return (
      <View style={styles.mapPlaceholder}>
        <Text style={{ color: '#999' }}>Coordenadas indisponíveis para este polo.</Text>
      </View>
    );
  }

  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);

  return (
    <View style={styles.mapContainer}>
      <Text style={styles.labelMap}>LOCALIZAÇÃO DO POLO</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        scrollEnabled={false}
        zoomEnabled={false}
      >
        <Marker coordinate={{ latitude: lat, longitude: lng }} pinColor="green" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: { marginHorizontal: 15, marginBottom: 20, backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden', elevation: 1 },
  labelMap: { fontSize: 12, color: '#999', fontWeight: 'bold', padding: 15, backgroundColor: '#fff' },
  map: { width: '100%', height: 200 },
  mapPlaceholder: { height: 200, backgroundColor: '#e0e0e0', margin: 15, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }
});