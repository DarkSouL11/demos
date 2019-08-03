export function randomInt(min, max) {
  var random = Math.floor(Math.random() * (max - min + 1)) + min;

  if (random > max) random = max;
  return random;
}
