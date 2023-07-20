import {
  FETCH_POKEMON,
  FETCH_POKEMON_DETAIL,
  ADD_POKEMON_FAVORITE,
  REMOVE_POKEMON_FAVORITE,
  CATCH_POKEMON,
  INSERT_POKEMON,
  FETCH_POKEMON_FAVORITE,
  UPDATE_POKEMON,
} from "../actionsType/pokemonType";
import axios from "../../APIs/pokemonApi";
import catchPokemon from "../../APIs/catchApi";
import Swal from "sweetalert2";

export const catchPokemonAction = () => async (dispatch) => {
  try {
    const response = await catchPokemon({
      method: "get",
      url: "/catch-probability",
    });
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
    const data = localStorage.getItem("accessToken");
    const parsedData = JSON.parse(data);
    const idValue = parsedData.id;
    let reqBody = {
      pokemon_name: values.pokemon_name,
      pokemon_picture: values.pokemon_picture,
      number: parseInt(values.number),
      user_id: idValue,
    };
    const insert = await catchPokemon({
      method: "post",
      url: "/release-pokemon",
      data: reqBody,
    });

    Swal.fire({
      icon: "success",
      title: "Your pokemon has been saved",
      showConfirmButton: false,
      timer: 1500,
    });

    dispatch({
      type: INSERT_POKEMON,
      payload: insert.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const setUpdatePokemonAction = (values, id) => async (dispatch) => {
  try {
    let reqBody = {
      pokemon_name: values,
    };
    const update = await catchPokemon({
      method: "put",
      url: "/rename-pokemon/" + id,
      data: reqBody,
    });
    dispatch({
      type: UPDATE_POKEMON,
      payload: update.data,
    });

    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

const fetchPokemonFavoriteAction = () => async (dispatch) => {
  try {
    const data = localStorage.getItem("accessToken");
    const parsedData = JSON.parse(data);
    const idValue = parsedData.id;

    const queryParams = {
      user_id: idValue,
    };
    const queryString = new URLSearchParams(queryParams).toString();

    const response = await catchPokemon({
      method: "get",
      url: `/list-pokemon?${queryString}`,
    });
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
