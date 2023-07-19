import {
  FETCH_POKEMON,
  FETCH_POKEMON_DETAIL,
  ADD_POKEMON_FAVORITE,
  REMOVE_POKEMON_FAVORITE,
  CATCH_POKEMON,
  INSERT_POKEMON,
  FETCH_POKEMON_FAVORITE,
} from "../actionsType/pokemonType";
import axios from "../../APIs/pokemonApi";
import catchPokemon from "../../APIs/catchApi";

export const catchPokemonAction = () => async (dispatch) => {
  try {
    const response = await catchPokemon({
      method: "get",
      url: "/catch-probability",
    });
    // console.log("ini response", response);
    dispatch({
      type: CATCH_POKEMON,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const setInsertPokemonAction = (values) => async (dispatch) => {
  try {
    console.log("ini values", values);
    let reqBody = {
      pokemon_name: values.pokemon_name,
      pokemon_picture: values.pokemon_picture,
      number: parseInt(values.number),
    };
    const register = await catchPokemon({
      method: "post",
      url: "/release-pokemon",
      data: reqBody,
    });
    console.log("ini register", register.data);
    dispatch({
      type: INSERT_POKEMON,
      payload: register.data,
    });
  } catch (error) {
    console.log(error);
  }
};

const fetchPokemonFavoriteAction = () => async (dispatch) => {
  try {
    const response = await catchPokemon({
      method: "get",
      url: "/list-pokemon",
    });
    // console.log("ini response", response);
    dispatch({
      type: FETCH_POKEMON_FAVORITE,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

const fetchPokemon = () => async (dispatch) => {
  try {
    const response = await axios({
      method: "get",
      url: "/pokemon?limit=100&offset=200",
    });
    // console.log("ini response", response);
    dispatch({
      type: FETCH_POKEMON,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

const fetchPokemonDetail = (name) => async (dispatch) => {
  try {
    const response = await axios({
      method: "get",
      url: `/pokemon/${name}`,
    });
    // console.log("ini response detail", response);
    dispatch({
      type: FETCH_POKEMON_DETAIL,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

const handleRemove = (name) => (dispatch) => {
  dispatch({ type: REMOVE_POKEMON_FAVORITE, name });
};

export const pokemonFavorite = (favoriteObj) => (dispatch) => {
  try {
    dispatch({
      type: ADD_POKEMON_FAVORITE,
      payload: favoriteObj,
    });
  } catch (error) {
    console.log(error);
  }
};

const pokemonAction = {
  fetchPokemonFavoriteAction,
  fetchPokemon,
  fetchPokemonDetail,
  handleRemove,
};

export default pokemonAction;
