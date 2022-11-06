import { describe, expect, it } from "vitest";
import * as fc from "fast-check";

import { createRNG } from "./index";

describe(createRNG.name, () => {
  it("generates numbers from 0 to 1", () => {
    fc.assert(
      fc.property(fc.string(), (seed) => {
        const random = createRNG(seed);
        const result = random();

        return result >= 0 && result < 1;
      })
    );
  });

  it("generates same number sequence given the same seed", () => {
    fc.assert(
      fc.property(fc.string(), (seed) => {
        const firstGenerator = createRNG(seed);
        const firstRun = Array.from({ length: 20 }).map(() => firstGenerator());

        const secondGenerator = createRNG(seed);
        const secondRun = Array.from({ length: 20 }).map(() =>
          secondGenerator()
        );

        expect(firstRun).toStrictEqual(secondRun);
      })
    );
  });
});
