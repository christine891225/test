import axios from "axios";

const API_PORT = 
  process.env.NODE_ENV === "production"
  ? "/api"
  : "http://localhost:4000/api";

export const api = axios.create({ baseURL: API_PORT });