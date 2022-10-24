import axios, { AxiosPromise } from "axios";
import { NewPokemon, Pokemon, DeletedPokemon } from "../interfaces/pokemon";
import configuration from "../data/configuration.json";

// @ts-ignore
const { apiContext, authorId } = configuration;
const query: string = "?idAuthor=";

const getPokemons = (): AxiosPromise =>
  axios.get<Pokemon>(apiContext + query + authorId);

const createNewPokemon = (payload: NewPokemon): AxiosPromise =>
  axios.post<Pokemon>(apiContext + query + authorId, payload);

const updatePokemon = (payload: NewPokemon, id: number): AxiosPromise =>
  axios.put<Pokemon>(apiContext + id, payload);

const deletePokemon = (id: number): AxiosPromise =>
  axios.delete<DeletedPokemon>(apiContext + id);

export default {
  getPokemons,
  createNewPokemon,
  updatePokemon,
  deletePokemon
};
