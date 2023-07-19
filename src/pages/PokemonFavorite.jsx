import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import pokemonAction from "../redux/actions/pokemonActions";
import { setUpdatePokemonAction } from "../redux/actions/pokemonActions";
import styled from "styled-components";
import Swal from "sweetalert2";

const PokemonFavorite = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const pokemon = useSelector((state) => state.pokemon.dataPokemonFavorite);
  useEffect(() => {
    dispatch(pokemonAction.fetchPokemonFavoriteAction());
  }, [dispatch]);

  const handleCatch = (id) => {
    Swal.fire({
      title: "Update Pokemon",
      html: `<input type="text" id="nickname" class="swal2-input" placeholder="Nickname">`,
      confirmButtonText: "Update",
      focusConfirm: false,
      preConfirm: () => {
        const nickname = Swal.getPopup().querySelector("#nickname").value;
        if (!nickname) {
          Swal.showValidationMessage(`Please enter nickname`);
        }
        return { nickname: nickname };
      },
    }).then((result) => {
      if (result.value) {
        let insert = "";
        insert = result.value.nickname;
        dispatch(setUpdatePokemonAction(insert, id));
        Swal.fire({
          icon: "success",
          title: "Your pokemon has been update",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload();
      }
    });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const Button = styled.button`
    cursor: pointer;
    background: #c1292e;
    font-size: 17px;
    border-radius: 5px;
    border: 3px solid #c1292e;
    padding: 0.25em 0.5em;
    transition: 0.2s all ease-out;
    color: #f4f4f6;
    font-weight: bold;
    text-transform: capitalize;
    width: 100%;

    &:hover {
      background-color: #f4f4f6;
      color: #c1292e;
    }
  `;

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
            {pokemon.data &&
              pokemon.data
                .filter((item) => {
                  return item === ""
                    ? item
                    : item.pokemon_name
                        .toLowerCase()
                        .includes(search.toLowerCase());
                })
                .map((item, index) => {
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
                        <Button onClick={() => handleCatch(item.id)}>
                          Update
                        </Button>
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
