# vremark-parse

## Installation

[npm][]:

```sh
npm install vremark-parse
```

## Usage

```js
var unified = require('unified');
var createStream = require('unified-stream');
var markdown = require('vremark-parse');
var html = require('remark-html');

var processor = unified()
  .use(markdown, {commonmark: true})
  .use(html)

process.stdin
  .pipe(createStream(processor))
  .pipe(process.stdout);
```

## Preset

### math

(upmath)[https://upmath.me/]


### footnoteDefinition
footnoteDefinition position


### VAST