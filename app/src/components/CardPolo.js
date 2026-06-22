import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CardPolo({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{item.nome_oficial || `Polo ${item.bairro}`}</Text>
      <Text style={styles.subtitle}>{`Bairro: ${item.bairro}` || 'Bairro não informado'}</Text>
      <Text style={styles.type}>Academia do Recife</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { 
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 8, 
    marginBottom: 10, 
    elevation: 1 
  },
  title: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 4 },
  type: { fontSize: 12, color: '#999', marginTop: 8 }
});