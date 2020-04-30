import React, { Component } from "react";
import {
  Button,
  Header,
  Input,
  Form,
  Card,
  CardContent,
} from "semantic-ui-react";
import axios from "axios";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

const values = [9, 18, 27, 35];
const mark = [0, 0.5, 1.0, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

interface Iprops {}

interface Istate {
  link: string;
  stats: {
    id: string;
    player: string;
    info: { name: string; level: string }[];
  }[];
  chose: number;
  filter: boolean;
}

class App extends Component<Iprops, Istate> {
  constructor(props: Readonly<Iprops>) {
    super(props);
    this.state = {
      link: "",
      stats: [],
      chose: 8,
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

  async readTeam(loopLink?: string) {
    const str = loopLink ? loopLink : this.state.link;
    await axios
      .get("https://cors-anywhere.herokuapp.com/" + str)
      .then((res) => {
        const responseText = res.data;
        let counter = 0;
        let follower = 0;
        const find = "data-age";
        const findAfter = `name="`;
        const findAfter2 = `data-id="`;
        let temp: { name: string; level: string }[] = [];
        const info = this.state.stats;
        while (counter < responseText.length) {
          if (responseText[counter] === find[follower]) {
            follower++;
          } else {
            follower = 0;
          }
          if (follower + 1 === find.length) {
            counter -= 10 + find.length;
            while (responseText[counter] !== `"`) {
              counter -= 1;
            }
            counter += 1;
            let level: string = "";
            let name: string = "";
            let id: string = "";
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
            follower = 0;
            name = "";
            while (counter < responseText.length) {
              if (responseText[counter] === findAfter[follower]) {
                follower++;
              } else {
                follower = 0;
              }
              if (follower === findAfter.length) {
                counter += 1;
                while (responseText[counter] !== `"`) {
                  name += responseText[counter];
                  counter++;
                }
                break;
              }
              counter++;
            }
            follower = 0;
            name += " ";
            while (counter < responseText.length) {
              if (responseText[counter] === findAfter[follower]) {
                follower++;
              } else {
                follower = 0;
              }
              if (follower === findAfter.length) {
                counter += 1;
                while (responseText[counter] !== `"`) {
                  name += responseText[counter];
                  counter++;
                }
                break;
              }
              counter++;
            }
            follower = 0;
            while (counter < responseText.length) {
              if (responseText[counter] === findAfter2[follower]) {
                follower++;
              } else {
                follower = 0;
              }
              if (follower === findAfter2.length) {
                counter += 1;
                while (responseText[counter] !== `"`) {
                  id += responseText[counter];
                  counter++;
                }
                break;
              }
              counter++;
            }
            follower = 0;
            info.push({ id: id, player: name, info: temp });
            name = "";
            temp = [];
          }
          counter += 1;
        }
        this.setState({ link: "", stats: info });
      });
  }

  readPage() {
    axios
      .get("https://cors-anywhere.herokuapp.com/" + this.state.link)
      .then((res) => {
        const id = this.state.link.split("player/")[1].split("/"[0]);
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
        const temp: { name: string; level: string }[] = [];
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
        const info = this.state.stats;
        info.push({ id: id.join(""), player: name, info: temp });

        this.setState({ stats: info, link: "" });
      });
  }

  calculateStars(power: number) {
    let stars = 0;
    values.forEach((value) => {
      if (power >= value) {
        stars += 0.5;
      }
    });

    return stars;
  }

  render() {
    return (
      <div className="my-total-reader">
        <Header className="my-header" size="huge">
          Total Reader
        </Header>
        <Button
          onClick={() => {
            this.setState({ stats: [] });
          }}
        >
          Delete All
        </Button>
        <Form
          onSubmit={() => {
            let temp = this.state.link.length;
            if (temp > 0) {
              const help = this.state.link.split("/");
              help[help.length - 1] = "";
              if (
                help[help.length - 2] === "player" ||
                help[help.length - 3] === "player"
              ) {
                this.readPage();
              } else if (help[help.length - 2] === "squad") {
                this.readTeam();
              } else if (
                help[help.length - 2] === "team" ||
                help[help.length - 3] === "team"
              ) {
                this.readTeam(this.state.link + "/squad/");
              } else if (this.state.link === "All") {
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
          {this.state.filter ? "Filter" : "Mark"}
        </Button>
        {mark.map((value) => {
          return (
            <Button
              className="my-button"
              color={this.state.chose === value ? "yellow" : "red"}
              onClick={() => {
                this.setState({ chose: value });
              }}
            >
              {value}
            </Button>
          );
        })}
        <div className="player-info">
          {this.state.stats.map((playerInformation) => {
            return !this.state.filter ||
              this.calculateStars(Number(playerInformation.info[0].level)) >=
                this.state.chose ? (
              <Card className="my-card">
                <a
                  href={`https://www.total-football.org/player/${playerInformation.id}/`}
                >
                  <Header textAlign="center" className="info-name" size="small">
                    {playerInformation.player}
                  </Header>
                </a>
                {playerInformation.info.map((info) => {
                  return (
                    <CardContent
                      key={info.name}
                      className={
                        !this.state.filter &&
                        this.state.chose ===
                          this.calculateStars(Number(info.level))
                          ? "info-header-mark"
                          : "info-header"
                      }
                    >
                      {info.name} : {info.level}, stars:{" "}
                      {this.calculateStars(Number(info.level))}
                    </CardContent>
                  );
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
