import {
  FETCH_POKEMON,
  FETCH_POKEMON_DETAIL,
  ADD_POKEMON_FAVORITE,
  REMOVE_POKEMON_FAVORITE,
  CATCH_POKEMON,
  INSERT_POKEMON,
  FETCH_POKEMON_FAVORITE,
} from "../actionsType/pokemonType";

const initialState = {
  dataApi: [],
  detail: [],
  favorite: [],
  remove: [],
  dataCatch: {},
  // insertPokemon: {},
  dataPokemonFavorite: [],
};

const pokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POKEMON:
      return {
        ...state,
        dataApi: action.payload,
      };
    case FETCH_POKEMON_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case ADD_POKEMON_FAVORITE:
      return {
        ...state,
        favorite: [...state.favorite, action.payload],
      };
    case REMOVE_POKEMON_FAVORITE:
      return {
        ...state,
        remove: state.list.filter((item) => item.name !== action.name),
      };
    case CATCH_POKEMON:
      return {
        ...state,
        dataCatch: action.payload,
      };
    case INSERT_POKEMON:
      return {
        ...state,
        insertPokemon: action.payload,
      };
    case FETCH_POKEMON_FAVORITE:
      return {
        ...state,
        dataPokemonFavorite: action.payload,
      };
    default:
      return state;
  }
};

export default pokemonReducer;
