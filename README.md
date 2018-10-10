# remark-parse2

## Installation

[npm][]:

```sh
npm install remark-parse2
```

## Usage

```js
var unified = require('unified');
var createStream = require('unified-stream');
var markdown = require('remark-parse2');
var html = require('remark-html');

var processor = unified()
  .use(markdown, {commonmark: true})
  .use(html)

process.stdin
  .pipe(createStream(processor))
  .pipe(process.stdout);
```

