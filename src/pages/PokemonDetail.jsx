import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import pokemonAction from "../redux/actions/pokemonActions";
import {
  pokemonFavorite,
  catchPokemonAction,
  setInsertPokemonAction,
} from "../redux/actions/pokemonActions";
import Swal from "sweetalert2";
import styled from "styled-components";
import {
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
} from "recharts";

const PokemonDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [insert, setInsert] = useState({
    pokemon_name: "",
    pokemon_picture: "",
    number: "",
  });

  console.log("insert", insert);

  // show detail data pokemon
  const listPokemonDetail = useSelector((state) => state.pokemon.detail);
  // console.log("listPokemonDetail", listPokemonDetail);

  const catchPokemon = useSelector((state) => state.pokemon.dataCatch);
  console.log("catchPokemon", catchPokemon);

  const { name } = useParams();
  useEffect(() => {
    dispatch(pokemonAction.fetchPokemonDetail(name));
    // eslint-disable-next-line
  }, [dispatch]);

  // fungsi klik untuk favorite pokomon
  const handleClick = (event) => {
    if (listPokemonDetail === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: "<a href>Why do I have this issue?</a>",
      });
    } else {
      dispatch(pokemonFavorite(event));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Add Favourite Success",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // fungsi klik untuk login terlebih dahulu
  const handleLogin = () => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Login dulu ya",
      showConfirmButton: false,
      timer: 1500,
    });
    history.push("/login");
  };

  useEffect(() => {
    dispatch(catchPokemonAction());
    // eslint-disable-next-line
  }, [dispatch]);

  const handleCatch = () => {
    dispatch(catchPokemonAction(catchPokemon));

    if (catchPokemon.data.success === true) {
      Swal.fire({
        title: `<strong>${catchPokemon.data.information}</strong>`,
        html: `Probability ${catchPokemon.data.probability}`,
        icon: "success",
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Add to Favorite!',
        cancelButtonText: '<i class="fa fa-thumbs-down">ok</i>',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Add to favorite",
            html: `<input type="text" id="nickname" class="swal2-input" placeholder="Input Nickname">
            <input type="number" id="number" class="swal2-input" placeholder="Input Prime Number">`,
            confirmButtonText: "Add to Favorite",
            focusConfirm: false,
            preConfirm: () => {
              const nickname = Swal.getPopup().querySelector("#nickname").value;
              const number = Swal.getPopup().querySelector("#number").value;
              if (!nickname || !number) {
                Swal.showValidationMessage(
                  `Please enter nickname and prime number`
                );
              }
              return { nickname: nickname, number: number };
            },
          }).then((result) => {
            if (result.value) {
              insert.pokemon_name = result.value.nickname;
              insert.pokemon_picture = `https://img.pokemondb.net/artwork/large/${listPokemonDetail.name}.jpg`;
              insert.number = result.value.number;

              dispatch(setInsertPokemonAction(insert));
            }
          });
        }
      });
    } else if (catchPokemon.data.success === false) {
      Swal.fire({
        title: `<strong>${catchPokemon.data.information}</strong>`,
        html: `Probability ${catchPokemon.data.probability}`,
        icon: "error",
        cancelButtonText: '<i class="fa fa-thumbs-down">Try Again</i>',
      });
    }
  };
  let PokeWeight = (weight) => {
    parseFloat(weight).toFixed(2);
    return weight;
  };

  const FavButton = styled.button`
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
      <div className="container-fluid ttl-container" id="dark-type">
        <div className="container">
          <br />
          {/* {console.log(listPokemonDetail)} */}
          <div className="row">
            <div className="col-md">
              <div className="container-fluid container-md">
                <div className="row">
                  <div className="col-md">
                    <Link to="/">
                      <FavButton className="btn-fav">Back</FavButton>
                    </Link>
                  </div>
                  {/* <div className="col-md">
                    <FavButton onClick={handleCatch} className="btn-fav">
                      Catch Pokemon
                    </FavButton>
                  </div> */}
                  <div className="col-md">
                    {!localStorage.getItem("accessToken") ? (
                      <FavButton onClick={handleLogin}>
                        Catch Pokemon {listPokemonDetail.name}
                      </FavButton>
                    ) : (
                      <FavButton onClick={handleCatch}>
                        Catch Pokemon {listPokemonDetail.name}
                      </FavButton>
                    )}
                  </div>
                </div>
                <br />
                <div className="dtl-img-container">
                  <img
                    src={`https://img.pokemondb.net/artwork/large/${listPokemonDetail.name}.jpg`}
                    alt=""
                    className="img-fluid img-thumbnail poke-img-dtl"
                  />
                </div>

                <div>
                  <h4 className="card-title">Moves</h4>
                  <h5>
                    {listPokemonDetail.moves &&
                      listPokemonDetail.moves.map((item, index) => {
                        return (
                          <span
                            key={index}
                            className="badge dtl-poke"
                            id={`${item.move.name}-type`}
                          >
                            {item.move.name}
                          </span>
                        );
                      })}
                  </h5>
                </div>
              </div>
            </div>
            <div className="col-md dt-ttl-container">
              <h3 className="dt-poke-id">#{listPokemonDetail.id}</h3>
              <h2 className="display-3 dt-poke-name">
                {listPokemonDetail.name}
              </h2>
              <br />
              <br />
              <div className="row">
                <div className="col-md">
                  <h4 className="card-title">Type</h4>
                  <h5>
                    {listPokemonDetail.types &&
                      listPokemonDetail.types.map((item, index) => {
                        return (
                          <span
                            key={index}
                            className="badge dtl-poke"
                            id={`${item.type.name}-type`}
                          >
                            {item.type.name}
                          </span>
                        );
                      })}
                  </h5>
                </div>
                <div className="col-md">
                  <h4 className="card-title">Description</h4>
                  <h5>
                    <span className="badge dtl-poke" id="flying-type">
                      Height : {listPokemonDetail.height}
                    </span>
                    <span className="badge dtl-poke" id="flying-type">
                      Weight : {PokeWeight(listPokemonDetail.weight)}
                    </span>
                    <span className="badge dtl-poke" id="flying-type">
                      Base Experience: {listPokemonDetail.base_experience}
                    </span>
                  </h5>
                </div>
              </div>
              <div className="row">
                <div className="col-md">
                  <h4 className="card-title">Abilities</h4>
                  <h5>
                    {listPokemonDetail.abilities &&
                      listPokemonDetail.abilities.map((item, index) => {
                        return (
                          <span
                            key={index}
                            className="badge dtl-poke"
                            id="water-type"
                          >
                            {item.ability.name}
                          </span>
                        );
                      })}
                  </h5>
                </div>
              </div>
              <div className="row">
                <div className="col align-self-end"></div>
                <div className="card poke-info">
                  <div className="card-body">
                    <h4 className="card-title">Stats</h4>
                    <h5 style={{ textTransform: "uppercase" }}>
                      {listPokemonDetail.stats &&
                        listPokemonDetail.stats.map((item, index) => {
                          return (
                            <div key={index}>
                              <ResponsiveContainer>
                                <RadarChart
                                  outerRadius={90}
                                  width={300}
                                  height={100}
                                  data={item.base_stat}
                                >
                                  <PolarGrid />
                                  <PolarAngleAxis dataKey={item.stat.name} />
                                  <PolarRadiusAxis
                                    angle={30}
                                    domain={[0, 150]}
                                  />
                                  <Radar
                                    name={listPokemonDetail.name}
                                    dataKey={item.stat.name}
                                    stroke="#8884d8"
                                    fill="#8884d8"
                                    fillOpacity={0.6}
                                  />
                                  <Legend />
                                </RadarChart>
                              </ResponsiveContainer>
                            </div>
                          );
                        })}
                    </h5>
                    {/* {console.log(listPokemonDetail.stats)} */}
                    <ResponsiveContainer
                      width={450}
                      minWeidth={100}
                      minHeight="90%"
                      height="90%"
                    >
                      <RadarChart
                        outerRadius={90}
                        width={300}
                        height={100}
                        data={listPokemonDetail.stats}
                      >
                        <PolarGrid />
                        <PolarAngleAxis dataKey="stat.name" />
                        <PolarRadiusAxis angle={30} domain={[0, 150]} />
                        <Radar
                          name={listPokemonDetail.name}
                          dataKey="base_stat"
                          stroke="#8884d8"
                          fill="#8884d8"
                          fillOpacity={0.8}
                        />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonDetail;
