import Colors from "./colorsEnum";

function getRandomColor() {
  const values = Object.values(Colors);
  const randomIndex = Math.floor(Math.random() * values.length);

  return values[randomIndex];
}

export { getRandomColor };
