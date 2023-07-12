# Node.js object flattening

## flattening

## Instalation

`npm i -S flattening`

## Usage

```javascript
const flattening = require('flattening');

const obj = {a: 1, b: {c: { d: 4 }}};
const flatObj = flattening(obj);

console.log(flatObj); // { a: 1, 'b.c.d': 4 }
```
