# Academia Recife App

Aplicativo mobile desenvolvido em React Native com Expo que permite explorar os polos da Academia Recife, visualizá-los no mapa e fazer check-ins com a localização do usuário.

## 🚀 Tecnologias

* **React Native** — framework para desenvolvimento mobile multiplataforma
* **Expo SDK 54** — plataforma de desenvolvimento e build
* **Expo Location** — acesso à geolocalização do dispositivo
* **React Native Maps** — exibição de mapas interativos
* **React Navigation** — navegação entre telas com Stack Navigator
* **API Dados Abertos Recife** — fonte dos dados dos polos de academia
* **Fetch API** — chamadas HTTP para o backend e API pública

## 📱 Funcionalidades

* **Lista de polos** — exibe os polos da Academia Recife com nome e bairro
* **Busca por nome ou bairro** — filtra a lista em tempo real conforme o usuário digita
* **Detalhes do polo** — exibe informações completas (nome, bairro, endereço) e um mini mapa com a localização do polo
* **Mapa de polos próximos** — usa a geolocalização do dispositivo para exibir os polos em um mapa interativo
* **Check-in** — registra a presença do usuário em um polo, salvando sua localização GPS no backend
* **Histórico de check-ins** — exibe todos os check-ins realizados com nome do polo, bairro, coordenadas e data/hora

## 📂 Estrutura do projeto

```text
academia-recife-app/
├── src/
│   ├── components/
│   │   ├── BarraBusca.js       # Componente de input para filtro
│   │   ├── BotaoPrimario.js    # Botão padrão reutilizável
│   │   ├── CardDetalhes.js     # Exibição de texto na tela de detalhes
│   │   ├── CardPolo.js         # Item da lista de academias
│   │   └── MiniMapa.js         # Mapa fixo para a tela de detalhes
│   ├── screens/
│   │   ├── DetailsScreen.js    # Tela de informações completas e check-in
│   │   ├── HistoryScreen.js    # Tela de histórico de check-ins salvos
│   │   ├── HomeScreen.js       # Tela principal com lista e busca
│   │   └── MapScreen.js        # Tela com mapa interativo geral
│   └── services/
│       ├── api-rec.js          # Comunicação com a API da Prefeitura
│       ├── location.js         # Lógica de permissão e captura de GPS
│       └── my-api.js           # Comunicação com o backend Node.js
├── App.js                      # Arquivo principal e rotas de navegação
├── app.json                    # Configurações do Expo
└── package.json                # Dependências do projeto

```

## ⚙️ Como executar localmente

### Pré-requisitos

* Node.js v18 ou superior
* App Expo Go instalado no celular (Android ou iOS)
* Backend Node.js (com SQLite) rodando localmente na mesma rede
* Git

### Instalação

```bash
git clone https://github.com/Angelo-msDev/academia-recife-app
cd academia-recife-app
npm install

```

### Configuração

Abra o arquivo `src/services/my-api.js` e substitua o IP pelo IP local da sua máquina:

```javascript
const BACKEND_URL = 'http://SEU_IP_LOCAL:3000';

```

> Para descobrir seu IP local rode `ipconfig` no Windows ou `ifconfig` no Mac/Linux e copie o Endereço IPv4.

### Executar

```bash
cd app
npx expo start

```

Escaneie o QR code com o app **Expo Go** no celular. O celular e o PC precisam estar na mesma rede Wi-Fi.

## 📱 Telas

| Tela | Descrição |
| --- | --- |
| **Lista (Home)** | Exibe todos os polos com busca por nome/bairro |
| **Detalhes** | Informações completas + mini mapa de localização e Check-in |
| **Mapa** | Mapa interativo mostrando sua localização e polos ao redor |
| **Histórico** | Check-ins realizados com dados completos de endereço e coordenadas |

## 📊 Fonte dos dados

Os dados brutos consumidos por esta aplicação são fornecidos diretamente pelo [Portal de Dados Abertos da Cidade do Recife](https://dados.recife.pe.gov.br/dataset/academia-recife)

---

*Desenvolvido por Angelo-msDev*
