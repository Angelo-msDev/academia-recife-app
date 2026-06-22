import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Importando a regra de negócios (API)
import { getAcademiasRecife } from '../services/api-rec';

// Importando os componentes de UI
import BotaoPrimario from '../components/BotaoPrimario';
import BarraBusca from '../components/BarraBusca';
import CardPolo from '../components/CardPolo';

export default function HomeScreen({ navigation }) {
  const [busca, setBusca] = useState('');
  const [dadosApi, setDadosApi] = useState([]);
  const [dadosFiltrados, setDadosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const registros = await getAcademiasRecife();
        setDadosApi(registros);
        setDadosFiltrados(registros);
      } catch (error) {
        alert("Não foi possível carregar os polos. Verifique sua conexão.");
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, []);

  const filtrarLista = (texto) => {
    setBusca(texto);
    const textoFormatado = texto.toLowerCase();
    
    const resultado = dadosApi.filter((item) => {
      const nomeMatch = item.nome_oficial?.toLowerCase().includes(textoFormatado);
      const bairroMatch = item.bairro?.toLowerCase().includes(textoFormatado);
      return nomeMatch || bairroMatch;
    });
    
    setDadosFiltrados(resultado);
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.container}>
        <Text style={styles.headerText}>Encontre seu polo de treino</Text>
        
        {/* Componentes limpos e diretos */}
        <BotaoPrimario 
            titulo="🗺️ Ver polos próximos a mim" 
            onPress={() => navigation.navigate('Map')} 
        />

        <BarraBusca 
            placeholder="Buscar por nome ou bairro..." 
            valor={busca} 
            onChangeText={filtrarLista} 
        />

        {loading ? (
            <ActivityIndicator size="large" color="#105bab" style={{ marginTop: 50 }} />
        ) : (
            <FlatList
            data={dadosFiltrados}
            keyExtractor={(item, index) => item._id?.toString() || index.toString()}
            renderItem={({ item }) => (
                <CardPolo 
                item={item} 
                onPress={() => navigation.navigate('Details', { academia: item })} 
                />
            )}
            contentContainerStyle={styles.listContainer}
            />
        )}
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4' },
  headerText: { fontSize: 14, color: '#666', padding: 15, paddingBottom: 5 },
  listContainer: { paddingHorizontal: 15, paddingBottom: 20 },
});