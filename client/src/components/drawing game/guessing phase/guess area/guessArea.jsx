import React, { Component } from "react";
import InputGuess from "./input guess/inputGuess";
import OutputResult from "./output result/outputResult";
import Socket from "../../../../sockets/socket";

class guessArea extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      socket: null,
      gotPeerReview: false,
      hasAnsweredQuestion: false,
      peerResult: null
    };

    this.handleUserSelection = this.handleUserSelection.bind(this);
  }

  componentWillMount() {
    console.log("Mounting guessArea");

    this.setState({ socket: new Socket(this.props.socket) }, () => {
      console.log("Setting guessArea", this.state);

      this.state.socket.returnAnswer(data => {
        console.log("Returning answer");

        if (data.guess === data.answer) {
          console.log("updating score");

          this.props.clientData.score++;
          this.props.onScoreUpdate();
        }

        this.setState({
          peerResult: data,
          gotPeerReview: true
        });
      });
      // console.log("destroying socket", this.state.socket);
      // this.state.socket.destroySocket();
    });
  }

  render() {
    if (this.state.hasAnsweredQuestion) {
      return (
        <OutputResult
          gotPeerReview={this.state.gotPeerReview}
          peerResult={this.state.peerResult}
          clientData={this.props.clientData}
          socket={this.props.socket}
          onScoreUpdate={this.props.onScoreUpdate}
        />
      );
    } else {
      return (
        <InputGuess
          gotPeerReview={this.state.gotPeerReview}
          clientData={this.props.clientData}
          socket={this.props.socket}
          peerResult={this.state.peerResult}
          onSelection={this.handleUserSelection}
          onScoreUpdate={this.props.onScoreUpdate}
        />
      );
    }
  }

  handleUserSelection() {
    this.setState({ hasAnsweredQuestion: true });
  }
}

export default guessArea;