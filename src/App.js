import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

// components
import Navbar from "./components/navbar";
import Footer from "./components/footer";

// pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Pokemon from "./pages/Pokemon";
import PokemonDetail from "./pages/PokemonDetail";
import PokemonFavorite from "./pages/PokemonFavorite";

function App() {
  return (
    <>
      <div className="container-fluid">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Pokemon />
            </Route>
            <Route path="/pokemondetail/:name">
              <PokemonDetail />
            </Route>
            <Route path="/pokemonfavorite">
              <PokemonFavorite />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        </Router>
      </div>
      <Footer />
    </>
  );
}

export default App;
