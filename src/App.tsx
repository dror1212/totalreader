import React, { Component } from "react";
import { Button, Header, Input, Form } from "semantic-ui-react";
import axios from "axios";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

interface Iprops {}

interface Istate {
  link: string;
  stats: { name: string; level: string }[];
  name: string;
}

class App extends Component<Iprops, Istate> {
  constructor(props: Readonly<Iprops>) {
    super(props);
    this.state = {
      link: "",
      stats: [],
      name: "",
    };
  }

  readPage() {
    axios
      .get("https://cors-anywhere.herokuapp.com/" + this.state.link)
      .then((res) => {
        const responseText = res.data;
        let counter = 0;
        const find = "data-positions=";
        let follower = 0;
        const findName = "<title>";
        let followerName = 0;
        let name = "";
        while (counter < responseText.length && follower + 1 !== find.length) {
          if (responseText[counter] === find[follower]) {
            follower++;
          } else {
            follower = 0;
          }
          if (!name && responseText[counter] === findName[followerName]) {
            followerName++;
          } else {
            followerName = 0;
          }
          counter += 1;
          if (followerName + 1 === findName.length) {
            while (responseText[++counter] !== "<") {
              name += responseText[counter];
            }
          }
        }
        counter += 2;
        const temp = [];
        if (counter < responseText.length - 1) {
          let level: string = "";
          let name: string = "";
          let status = true;
          while (responseText[counter] !== `"`) {
            if (responseText[counter] === ":") {
              status = false;
            } else if (responseText[counter] === ",") {
              status = true;
              temp.push({ name, level });
              level = "";
              name = "";
            } else if (status) {
              name += responseText[counter];
            } else {
              level += responseText[counter];
            }
            counter++;
          }
        }
        this.setState({ stats: temp, link: "", name: name });
      });
  }

  render() {
    return (
      <div className="my-tic-tac-toe">
        <Header className="my-header" size="huge">
          Total Reader
        </Header>
        <Form
          onSubmit={() => {
            let temp = this.state.link.length;
            if (temp > 0) {
              const help = this.state.link.split("/");
              help[help.length - 1] = "";
              const full = help.join("/");
              console.log(full);
              if (
                full === "https://www.total-football.org/player/" ||
                full === "www.total-football.org/player/"
              ) {
                this.readPage();
              }
            }
          }}
        >
          <Form.Field className="my-field">
            <Button color="twitter" type="submit">
              Submit
            </Button>
            <Input
              className="my-input"
              value={this.state.link}
              placeholder="Link to the player..."
              onChange={(e) => {
                this.setState({ link: e.target.value });
              }}
            />
          </Form.Field>
        </Form>
        <div className="bottom-div">
          <Header textAlign="center" className="info-name" size="small">
            {this.state.name}
          </Header>
        </div>
        <div className="player-info">
          {this.state.stats.map((position) => {
            return (
              <Header
                key={position.name}
                textAlign="center"
                className="info-header"
                size="small"
              >
                {position.name} : {position.level}
              </Header>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
