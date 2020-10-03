# random-id
random id generator

## Installation

`npm install --save random-id`

or with yarn

`yarn add random-id`

## Usage

npm
```js
var randomId = require('random-id');

// length of the id (default is 30)
var len = 30;

// pattern to determin how the id will be generated
// default is aA0 it has a chance for lowercased capitals and numbers
var pattern = 'aA0'

var id = randomId(len, pattern)
```

using it in a script tag it'll add randomId to the window
for global use
```js
// length of the id (default is 30)
var len = 30;

// pattern to determin how the id will be generated
// default is aA0 it has a chance for lowercased capitals and numbers
var pattern = 'aA0'

var id = randomId(len, pattern)
```