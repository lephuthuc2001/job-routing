import axios from "axios";
import { BASE_URL } from "./config";

export const apiService = axios.create({
  baseURL: BASE_URL,
});
