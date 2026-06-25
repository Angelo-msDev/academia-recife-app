// src/services/my-api.js

// Lembre-se de colocar o seu IPv4 aqui
const BACKEND_URL = 'http://192.168.0.6:3000'; 

export const enviarCheckinBackend = async (pacoteDados) => {
  try {
    const url = `${BACKEND_URL}/checkin`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pacoteDados)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Falha ao salvar no backend");
    }

    return data;
  } catch (error) {
    console.error("Erro no Service do Backend:", error);
    throw error;
  }
};

// NOVA FUNÇÃO: Busca o histórico usando o GET
export const getHistoricoCheckins = async () => {
  try {
    const url = `${BACKEND_URL}/historico`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error("Falha ao buscar o histórico");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar histórico:", error);
    throw error;
  }
};