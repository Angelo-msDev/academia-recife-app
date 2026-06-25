import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

// Importando o novo serviço
import { getHistoricoCheckins } from '../services/my-api';

export default function HistoryScreen() {
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarHistorico() {
      try {
        const dados = await getHistoricoCheckins();
        setHistorico(dados);
      } catch (error) {
        alert("Não foi possível carregar o histórico.");
      } finally {
        setLoading(false);
      }
    }

    carregarHistorico();
  }, []);

  const formatarData = (dataIso) => {
    const data = new Date(dataIso);
    return data.toLocaleString('pt-BR');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Seus últimos treinos salvos</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#105bab" style={{ marginTop: 50 }} />
      ) : historico.length === 0 ? (
        <Text style={styles.emptyText}>Você ainda não fez nenhum check-in.</Text>
      ) : (
        <FlatList
            data={historico}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    {/* Nome do Polo em destaque */}
                    <Text style={styles.title}>Academia do Recife - {item.nome_polo || item.bairro_polo}</Text>
                        
                    {/* Informações de Endereço */}
                    <Text style={styles.infoText}><Text style={styles.bold}>Bairro:</Text> {item.bairro_polo || 'N/A'}</Text>
                    <Text style={styles.infoText}><Text style={styles.bold}>Endereço:</Text> {item.longradouro_polo || 'N/A'}</Text>
                        
                    {/* Data e Hora */}
                    <Text style={styles.infoText}><Text style={styles.bold}>Data:</Text> {formatarData(item.data_hora)}</Text>
                        
                    {/* Separador visual para as coordenadas */}
                    <View style={styles.divider} />
                        
                    <Text style={styles.coords}>
                        📍 Polo: {item.latitude_polo?.toFixed(4)}, {item.longitude_polo?.toFixed(4)}
                    </Text>
                    <Text style={styles.coords}>
                        🧍 Você estava em: {item.latitude_usuario?.toFixed(4)}, {item.longitude_usuario?.toFixed(4)}
                    </Text>
                </View>
            )}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4' },
  headerText: { fontSize: 16, color: '#333', padding: 15, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#666', fontSize: 16 },
  listContainer: { paddingHorizontal: 15, paddingBottom: 20 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 8, marginBottom: 10, elevation: 1 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#105bab' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 4 },
  coords: { fontSize: 12, color: '#999', marginTop: 8 },


  infoText: { fontSize: 14, color: '#444', marginTop: 4 },
  bold: { fontWeight: 'bold', color: '#333' },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 10 },
});