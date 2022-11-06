/**
 * Creates random number generator from seed string.
 * Based on https://stackoverflow.com/a/47593316/6003547.
 *
 * @example
 * import { createRNG } from "@hasparus/random";
 * const random = createRNG("my seed");
 * console.log(random())
 */

export function createRNG(seedString: string): RandomNumberGenerator {
  const seed = xmur3(seedString);
  const random = sfc32(seed(), seed(), seed(), seed()) as RandomNumberGenerator;
  random.seed = seedString;

  return random;
}

export interface RandomNumberGenerator {
  (): number;
  seed: string;
}

/**
 * Creates a seed function from string
 */
function xmur3(str: string) {
  let i: number, h: number;
  for (i = 0, h = 1779033703 ^ str.length; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}

function sfc32(a: number, b: number, c: number, d: number) {
  return function () {
    a >>>= 0;
    b >>>= 0;
    c >>>= 0;
    d >>>= 0;
    let t = (a + b) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    d = (d + 1) | 0;
    t = (t + d) | 0;
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
}
