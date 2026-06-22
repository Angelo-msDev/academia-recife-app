// src/services/api.js

const BASE_URL = 'https://dados.recife.pe.gov.br/api/3/action/datastore_search';

// Coloque aqui o ID exato que você encontrou e que fez o app funcionar
const RESOURCE_ID = 'db9cfac3-a78b-43d5-9f5e-0fb26220364e'; 

export const getAcademiasRecife = async () => {
  try {
    const url = `${BASE_URL}?resource_id=${RESOURCE_ID}`;
    const response = await fetch(url);
    const json = await response.json();

    if (json.success && json.result && json.result.records) {
      // Retorna apenas a lista limpa, escondendo a bagunça da API
      return json.result.records; 
    } else {
      throw new Error("A estrutura da resposta não é válida.");
    }
  } catch (error) {
    console.error("Erro no Service de API:", error);
    throw error; // Lança o erro para a tela tratar (exibir um alerta, etc)
  }
};