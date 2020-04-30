import React, { Component } from "react";
import { Button, Header, Input, Form, Card } from "semantic-ui-react";
import axios from "axios";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

const stands = 16;
const values = [9, 18, 27, 35];
const mark = [0, 0.5, 1.0, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

interface Iprops {}

interface Istate {
  link: string;
  stats: { name: string; level: string }[];
  name: string[];
  chose: number;
  filter: boolean;
}

class App extends Component<Iprops, Istate> {
  constructor(props: Readonly<Iprops>) {
    super(props);
    this.state = {
      link: "",
      stats: [],
      name: [],
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
        const temp = this.state.stats;
        const names: string[] = this.state.name;
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
            names.push(name);
          }
          counter += 1;
        }
        this.setState({ link: "", stats: temp, name: names });
      });
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
        const temp = this.state.stats;
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
        const names = this.state.name;
        names.push(name);
        this.setState({ stats: temp, link: "", name: names });
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
            this.setState({ name: [], stats: [] });
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
              const full = help.join("/");
              if (
                full === "https://www.total-football.org/player/" ||
                full === "www.total-football.org/player/"
              ) {
                this.readPage();
              } else if (help[help.length - 2] === "squad") {
                this.readTeam();
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
          {this.state.name.map((name, index) => {
            return !this.state.filter ||
              this.calculateStars(
                Number(this.state.stats[index * (stands - 1)].level)
              ) >= this.state.chose ? (
              <Card className="my-card">
                <div>
                  <Header textAlign="center" className="info-name" size="small">
                    {name}
                  </Header>
                </div>
                {this.state.stats.map((position, offset) => {
                  if (
                    (index + 1) * (stands - 1) > offset &&
                    index * (stands - 1) <= offset
                  ) {
                    return (
                      <Header
                        key={position.name}
                        className={
                          !this.state.filter &&
                          this.state.chose ===
                            this.calculateStars(Number(position.level))
                            ? "info-header-mark"
                            : "info-header"
                        }
                        size="small"
                      >
                        {position.name} : {position.level}, stars:{" "}
                        {this.calculateStars(Number(position.level))}
                      </Header>
                    );
                  } else {
                    return null;
                  }
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
