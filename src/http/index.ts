import axios, { AxiosInstance } from "axios"; // Importa o Axios e o tipo AxiosInstance para criar uma instância de cliente HTTP

// Cria uma instância do Axios com a configuração inicial
const clienteHTTP: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/", // Define a URL base para todas as requisições HTTP
});

export default clienteHTTP; // Exporta a instância configurada para ser usada em outras partes da aplicação
