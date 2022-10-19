import axios from "axios";
import { Pokemon } from "../interfaces/pokemon";
import configuration from "../data/configuration.json";

// @ts-ignore
const { apiContext, authorId } = configuration;
const query: string = "?idAuthor=";

const getPokemons = async () => 
   axios.get(apiContext + query + authorId);

const createNewPokemon = async (payload: Pokemon) => 
   axios.post(apiContext + query + authorId, payload);

const updatePokemon = async (payload: Pokemon, id: number) =>
   axios.put(apiContext + id, payload);

const deletePokemon = async (id: number) => 
   axios.delete(apiContext + id);

export default {
   getPokemons,
   createNewPokemon,
   updatePokemon,
   deletePokemon,
}