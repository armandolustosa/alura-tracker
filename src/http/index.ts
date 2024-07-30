import axios, { AxiosInstance } from "axios";

const clienteHTTP = axios.create({
  baseURL: "http://localhost:3000/",
});

export default clienteHTTP;
