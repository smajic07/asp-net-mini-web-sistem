const API_BASE_URL_RAZVOJ = "https://localhost:7053";
const API_BASE_URL_PRODUKCIJA =
  "https://aspnetcorereacttutorial-aspnetserver.azurewebsites.net";

const ENDPOINTS = {
  OBJAVE: "objave",
  OBJAVA: "objava",
  KREIRAJ: "kreiraj",
  AZURIRAJ: "azuriraj",
  OBRISI: "obrisi",
};

const razvoj = {
  API_URL_OBJAVE: `${API_BASE_URL_RAZVOJ}/${ENDPOINTS.OBJAVE}`,
  API_URL_OBJAVA: `${API_BASE_URL_RAZVOJ}/${ENDPOINTS.OBJAVA}`,
  API_URL_KREIRAJ: `${API_BASE_URL_RAZVOJ}/${ENDPOINTS.KREIRAJ}`,
  API_URL_AZURIRAJ: `${API_BASE_URL_RAZVOJ}/${ENDPOINTS.AZURIRAJ}`,
  API_URL_OBRISI: `${API_BASE_URL_RAZVOJ}/${ENDPOINTS.OBRISI}`,
};

const produkcija = {
  API_URL_OBJAVE: `${API_BASE_URL_PRODUKCIJA}/${ENDPOINTS.OBJAVE}`,
  API_URL_OBJAVA: `${API_BASE_URL_PRODUKCIJA}/${ENDPOINTS.OBJAVA}`,
  API_URL_KREIRAJ: `${API_BASE_URL_PRODUKCIJA}/${ENDPOINTS.KREIRAJ}`,
  API_URL_AZURIRAJ: `${API_BASE_URL_PRODUKCIJA}/${ENDPOINTS.AZURIRAJ}`,
  API_URL_OBRISI: `${API_BASE_URL_PRODUKCIJA}/${ENDPOINTS.OBRISI}`,
};

const Konstante = process.env.NODE_ENV === "development" ? razvoj : produkcija;

export default Konstante;
