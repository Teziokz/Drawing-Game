import React, { Component } from "react";
import "./App.css";
import DrawingGame01 from "./components/games/drawingGame01/drawingGame01-A.jsx";
import Lobby from "./components/lobby/lobby";
import LandingPage from "./components/landing/landingPage";
import { Tests } from "./tests/test";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "LANDING"
    };

    //Tests();
    this.landingSubmitHandleClick = this.landingSubmitHandleClick.bind(this);
    this.lobbySubmitHandleClick = this.lobbySubmitHandleClick.bind(this);
  }

  render() {
    return <div className="App">{this.setLocation()}</div>;
  }

  setLocation() {
    switch (this.state.location) {
      case "LANDING":
        return <LandingPage handleSubmit={this.landingSubmitHandleClick} />;
      case "LOBBY":
        return (
          <Lobby
            socket={this.props.socket}
            submitHandle={this.lobbySubmitHandleClick}
          />
        );
      case "DRAWING_GAME_01":
        return <DrawingGame01 socket={this.props.socket} />;
      default:
        return null;
    }
  }

  landingSubmitHandleClick() {
    console.log("click");
    this.setState({
      location: "LOBBY"
    });
  }

  lobbySubmitHandleClick() {
    console.log("click");

    this.setState({
      location: "DRAWING_GAME_01"
    });
  }
}

export default App;
