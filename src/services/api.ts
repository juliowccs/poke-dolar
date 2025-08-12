import axios from "axios";

export const pokeApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export const priceApi = axios.create({
  baseURL: "https://economia.awesomeapi.com.br",
});