import userReducers from "./userReducers";
import pokemonReducer from "./pokemonReducers";

const rootReducers = {
  pokemon: pokemonReducer,
  user: userReducers,
};

export default rootReducers;
