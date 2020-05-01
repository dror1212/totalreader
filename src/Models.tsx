export class Player {
  playerName: string = "";
  info: Position[] = [];
}

export class Position {
  position: string;
  level: string;

  constructor(position: string, level: string) {
    this.position = position;
    this.level = level;
  }
}
