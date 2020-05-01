import { values, mark } from "./Consts";

export function calculateStars(power: number) {
  let stars = -0.5;
  values.forEach((value) => {
    if (value === "??") {
    } else if (power >= value) {
      stars += 0.5;
    }
  });

  return stars;
}

export function createInfoForPopup() {
  let info = "";
  mark.forEach((value, index) => {
    info += `\n ${values[index]}-${values[index + 1]} : ${value}  , `;
  });

  info = info.slice(0, info.length - 4);
  return info;
}
