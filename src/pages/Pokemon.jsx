import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import pokemonAction from "../redux/actions/pokemonActions";

const Pokemon = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const pokemon = useSelector((state) => state.pokemon.dataApi);
  useEffect(() => {
    dispatch(pokemonAction.fetchPokemon());
  }, [dispatch]);

  const handleClick = (name) => {
    history.push(`/pokemondetail/${name}`);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="container-fluid ttl-container">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1 className="display-1 title">Pokédex</h1>
              <p className="subtitle">
                Search for your favourite Pokémon and fill and collect your
                favorite pokemon list
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid src-container">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="frm-search" className="form-label src-label">
                <h3>Search by Name </h3>
              </label>
              <input
                className="form-control form-control-lg"
                id="frm-search"
                type="text"
                placeholder="Example Pineco"
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid crd-container">
        <div className="container">
          <div className="row">
            {pokemon.results &&
              pokemon.results
                .filter((item) => {
                  return item === ""
                    ? item
                    : item.name.toLowerCase().includes(search.toLowerCase());
                })
                .map((item, index) => {
                  return (
                    <div className="col-md crd-col" key={index}>
                      <div
                        className="card poke-card"
                        style={{ width: "18rem", height: "19rem" }}
                        onClick={() => handleClick(item.name)}
                      >
                        <div className="img-container">
                          <img
                            src={`https://img.pokemondb.net/artwork/large/${item.name}.jpg`}
                            className="card-img-top poke-img"
                            alt="..."
                          />
                        </div>
                        <div className="card-body">
                          <h4 className="card-title">{item.name}</h4>
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

export default Pokemon;
