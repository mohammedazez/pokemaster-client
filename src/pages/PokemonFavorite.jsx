import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import pokemonAction from "../redux/actions/pokemonActions";

const PokemonFavorite = () => {
  const dispatch = useDispatch();

  const pokemon = useSelector((state) => state.pokemon.dataPokemonFavorite);
  console.log("list pokemon", pokemon);
  useEffect(() => {
    dispatch(pokemonAction.fetchPokemonFavoriteAction());
  }, [dispatch]);

  return (
    <>
      <div className="container-fluid ttl-container" id="ghost-type">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1 className="display-1 title">My Pokémon</h1>
              <p className="subtitle">
                You will find your Pokémon Collections here.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid crd-container">
        <div className="container">
          <div className="row">
            {pokemon.data &&
              pokemon.data.map((item, index) => {
                return (
                  <div className="col-md crd-col" key={index}>
                    <div
                      className="card poke-card"
                      style={{ width: "18rem", height: "19rem" }}
                    >
                      <div className="img-container">
                        <img
                          src={item.pokemon_picture}
                          className="card-img-top poke-img"
                          alt="..."
                        />
                      </div>
                      <div className="card-body">
                        <h4 className="card-title">
                          Nickname: {item.pokemon_name}
                        </h4>
                        <p className="card-title">Number: {item.number}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonFavorite;
