# @hasparus/rng

tiny pseudorandom number generator

## API

```ts
function createRNG(seedString: string): RandomNumberGenerator;
interface RandomNumberGenerator {
  (): number;
  seed: string;
}
```
