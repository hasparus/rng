# @hasparus/rng

## API

```ts
function createRNG(seedString: string): RandomNumberGenerator;
interface RandomNumberGenerator {
  (): number;
  seed: string;
}
```
