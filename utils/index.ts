export function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function hexToHsl(hex: string): Array<number | undefined> {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  var r = parseInt(result[1], 16);
  var g = parseInt(result[2], 16);
  var b = parseInt(result[3], 16);

  (r /= 255), (g /= 255), (b /= 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  s = s * 100;
  s = Math.round(s);
  l = l * 100;
  l = Math.round(l);
  h = Math.round(360 * h);

  var colorInHSL = "hsl(" + h + ", " + s + "%, " + l + "%)";
  console.log(colorInHSL);

  return [h, s, l];
}

export function colorShades(
  color: string,
  amount: number,
  pug?: number
): Array<string> {
  pug = pug || 60;
  const hsl = hexToHsl(color);
  const h = hsl[0];
  const s = hsl[1];
  const l = hsl[2];
  const hslArray = [h, s, l];
  const shades: any = [];
  for (
    let i = amount - Math.floor(amount / 2) - (amount % 2 !== 0 ? 1 : 0);
    i > 0;
    i--
  ) {
    const newS = s + -1 * i * (pug / amount);
    const newL = l + -1 * i * (pug / 1.3 / amount);
    const newHsl = [h, newS, newL];
    shades.push(hslToHex(...newHsl));
  }
  // if (amount % 2 !== 0) {
  shades.push(color);
  // }
  for (let i = 0; i < amount / 2 - 1; i++) {
    const newS = s + i * (pug / amount);
    const newL = l + (i + 1) * ((pug * 1.3) / amount);
    const newHsl = [h, newS > 100 ? 100 : newS, newL];
    shades.push(hslToHex(...newHsl));
  }
  return reverse(shades);
}

function reverse(arr: any[]) {
  return arr.slice().reverse();
}
// function getColorpal

export function arrayToObject(array: Array<any>, key: string) {
  let object: any = {};
  if (key) {
    array.forEach((item, index) => {
      object[`${key}${index === 0 ? 50 : index * 100}`] = item;
    });
  } else {
    array.forEach((item, index: number) => {
      object[index === 0 ? "50" : `${index * 100}`] = item;
    });
  }
  return object;
}
