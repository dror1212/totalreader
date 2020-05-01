import React, { Component } from "react";
import {
  Button,
  Header,
  Input,
  Form,
  Card,
  CardContent,
  Popup,
  Icon,
} from "semantic-ui-react";
import axios from "axios";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { mark } from "./Consts";
import { Player, Position } from "./Models";
import { findData, mode, pages } from "./enums";
import { calculateStars, createInfoForPopup } from "./Utils";

interface Iprops {}

interface Istate {
  link: string;
  stats: {
    [playerId: string]: Player;
  };
  chose: number;
  filter: boolean;
}

class App extends Component<Iprops, Istate> {
  constructor(props: Readonly<Iprops>) {
    super(props);
    this.state = {
      link: "",
      stats: {},
      chose: -1,
      filter: false,
    };
  }

  async try() {
    let i = 1;
    while (i < 1945) {
      try {
        await this.readTeam(`https://www.total-football.org/team/${i}/squad/`);
      } catch {
        console.log(i);
        break;
      }
      i += 1;
    }
  }

  findInHtml(
    find: string,
    responseText: any,
    counter: number,
    endSign?: string
  ) {
    let follower = 0;
    let newInfo = "";
    const end = endSign ? endSign : `"`;
    while (counter < responseText.length) {
      if (responseText[counter] === find[follower]) {
        follower++;
      } else {
        follower = 0;
      }
      if (follower === find.length) {
        counter += 1;
        while (responseText[counter] !== end) {
          newInfo += responseText[counter];
          counter++;
        }
        break;
      }
      counter++;
    }

    return { newInfo, counter };
  }

  getPositionsInfo(responseText: any, counter: number, temp: Position[]) {
    let level: string = "";
    let name: string = "";
    let status = true;
    while (responseText[counter] !== `"`) {
      if (responseText[counter] === ":") {
        status = false;
      } else if (responseText[counter] === ",") {
        status = true;
        temp.push(new Position(name, level));
        level = "";
        name = "";
      } else if (status) {
        name += responseText[counter];
      } else {
        level += responseText[counter];
      }
      counter++;
    }

    return counter;
  }

  async readTeam(loopLink?: string) {
    const str = loopLink ? loopLink : this.state.link;
    await axios
      .get("https://cors-anywhere.herokuapp.com/" + str)
      .then((res) => {
        const responseText = res.data;
        let counter = 0;
        let follower = 0;
        let temp: Position[] = [];
        const info = this.state.stats;
        let newDataFound;
        while (counter < responseText.length) {
          if (responseText[counter] === findData.age[follower]) {
            follower++;
          } else {
            follower = 0;
          }
          if (follower + 1 === findData.age.length) {
            counter -= 10 + findData.age.length;
            while (responseText[counter] !== `"`) {
              counter -= 1;
            }
            counter += 1;
            let name: string = "";
            let id: string = "";

            counter = this.getPositionsInfo(responseText, counter, temp);

            newDataFound = this.findInHtml(
              findData.name,
              responseText,
              counter
            );
            name = newDataFound.newInfo + " ";
            counter = newDataFound.counter;

            newDataFound = this.findInHtml(
              findData.name,
              responseText,
              counter
            );
            name = name + newDataFound.newInfo;
            counter = newDataFound.counter;

            newDataFound = this.findInHtml(
              findData.dataId,
              responseText,
              counter
            );
            id = newDataFound.newInfo;
            counter = newDataFound.counter;

            follower = 0;
            if (!info[id]) {
              info[id] = { playerName: name, info: temp };
            } else {
              console.log(name + " is already exist");
            }
            temp = [];
          }
          counter += 1;
        }
        this.setState({ link: "", stats: info });
      });
  }

  async readPage() {
    const id = this.state.link.split("player/")[1].split("/"[0]).join("");
    const info = this.state.stats;
    if (!info[id]) {
      await axios
        .get("https://cors-anywhere.herokuapp.com/" + this.state.link)
        .then((res) => {
          const responseText = res.data;
          let counter = 0;
          let name = "";
          let newDataFound;
          const temp: Position[] = [];

          newDataFound = this.findInHtml(
            findData.title,
            responseText,
            counter,
            "<"
          );
          name = newDataFound.newInfo;
          counter = newDataFound.counter;

          newDataFound = this.findInHtml(
            findData.dataPosition,
            responseText,
            counter
          );
          counter = newDataFound.counter + 1;

          counter = this.getPositionsInfo(responseText, counter, temp);
          info[id] = { playerName: name, info: temp };
        });
    } else {
      console.log(this.state.stats[id].playerName + " is already exist");
    }
    this.setState({ stats: info, link: "" });
  }

  render() {
    return (
      <div className="my-total-reader">
        <Header className="my-header" size="huge">
          Total Reader
        </Header>
        <Popup
          hoverable
          basic
          trigger={<Icon className="my-popup" name="info"></Icon>}
        >
          The numbers you will see after the players position are the value of
          this player in this position, each value represent how many stars the
          player deserve.
          <br></br>
          {createInfoForPopup()}
        </Popup>
        <Button
          onClick={() => {
            this.setState({ stats: {}, chose: -1 });
          }}
        >
          Delete All
        </Button>
        <Form
          onSubmit={() => {
            let temp = this.state.link.length;
            if (temp > 0) {
              const help = this.state.link.split("/");
              if (
                help[help.length - 2] === pages.player ||
                help[help.length - 3] === pages.player
              ) {
                this.readPage();
              } else if (
                help[help.length - 2] === pages.squad ||
                help[help.length - 1] === pages.squad
              ) {
                this.readTeam();
              } else if (
                help[help.length - 2] === pages.team ||
                help[help.length - 3] === pages.team
              ) {
                this.readTeam(this.state.link + pages.pageSquad);
              } else if (this.state.link === pages.all) {
                this.try();
              }
              console.log(help);
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
              placeholder="Link to a player/team..."
              onChange={(e) => {
                this.setState({ link: e.target.value });
              }}
            />
          </Form.Field>
        </Form>
        <Button
          onClick={() => {
            this.setState({ filter: !this.state.filter });
          }}
        >
          {this.state.filter ? mode.filter : mode.mark}
        </Button>
        {mark.map((value) => {
          return (
            <Button
              key={value}
              className="my-button"
              color={this.state.chose === value ? "yellow" : "red"}
              onClick={() => {
                this.setState({
                  chose: this.state.chose === value ? -1 : value,
                });
              }}
            >
              {value}
            </Button>
          );
        })}
        <div className="player-info">
          {Object.entries(this.state.stats).map((playerInfo) => {
            return !this.state.filter ||
              calculateStars(Number(playerInfo[1].info[0].level)) >=
                this.state.chose ? (
              <Card className="my-card">
                <a
                  href={`https://www.total-football.org/player/${playerInfo[0]}/`}
                >
                  <Header textAlign="center" className="info-name" size="small">
                    {playerInfo[1].playerName}
                  </Header>
                </a>
                {playerInfo[1].info.map((info) => {
                  return !this.state.filter ||
                    calculateStars(Number(info.level)) >= this.state.chose ? (
                    <CardContent
                      key={info.position + playerInfo[0]}
                      className={
                        !this.state.filter &&
                        this.state.chose === calculateStars(Number(info.level))
                          ? "info-header-mark"
                          : "info-header"
                      }
                    >
                      {info.position} : {info.level}, stars:{" "}
                      {calculateStars(Number(info.level))}
                    </CardContent>
                  ) : null;
                })}
              </Card>
            ) : null;
          })}
        </div>
      </div>
    );
  }
}

export default App;
