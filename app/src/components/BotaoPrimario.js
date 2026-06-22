import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function BotaoPrimario({ titulo, onPress, corFundo = '#105bab' }) {
  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: corFundo }]} 
      onPress={onPress}
    >
      <Text style={styles.text}>{titulo}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { 
    marginHorizontal: 15, 
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginBottom: 15 
  },
  text: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  }
});