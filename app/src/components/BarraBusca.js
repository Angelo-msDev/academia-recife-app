import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function BarraBusca({ valor, onChangeText, placeholder }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={valor}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    marginHorizontal: 15, 
    marginBottom: 15, 
    backgroundColor: '#fff', 
    borderRadius: 8, 
    paddingHorizontal: 15, 
    elevation: 2 
  },
  input: { 
    height: 50, 
    fontSize: 16 
  }
});