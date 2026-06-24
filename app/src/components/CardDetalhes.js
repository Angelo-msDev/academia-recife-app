import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CardDetalhes({ academia }) {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.title}>{academia.nome_oficial || `Polo ${academia.bairro}`}</Text>
      
      <Text style={styles.label}>BAIRRO</Text>
      <Text style={styles.value}>{academia.bairro || 'Não informado'}</Text>
      
      <Text style={styles.label}>ENDEREÇO</Text>
      <Text style={styles.value}>{academia.logradouro || 'Endereço não cadastrado'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  infoCard: { backgroundColor: '#fff', padding: 20, margin: 15, borderRadius: 8, elevation: 1 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  label: { fontSize: 12, color: '#999', marginTop: 10, fontWeight: 'bold' },
  value: { fontSize: 16, color: '#444', marginTop: 2 },
});