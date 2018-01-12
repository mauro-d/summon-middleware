# summon-middleware

## Dinamically enable or disable express middleware

This wrapper allows you to dinamically enable or disable an express or connect
middleware or an array of them.
In some circumstances you would use one or more middlewares only if some
conditions are met.

## Installation

If you want to use summon-middleware you have to install it.
There are two methods to do that:

In your package.json add the following item:

```json
"summon-middleware": "version"
```

then digit:

```console
npm install
```

### Example

```json
"summon-middleware": "*" for the latest version
"summon-middleware": "1.0.0" for the version 1.0.0
```

or launch this command:

```console
npm install summon-middleware --save
```

## Use

```javascript
summonMiddleware(<your express or connect middleware(s)>, <predicate>);
```

```javascript
var summonMiddleware = require('summon-middleware');

// Import some other required modules
var express = require('express');
var app = express();
var responsePoweredBy = require('response-powered-by');
var POWERED_BY = "@NickNaso";
// Some other configuration for the express app and session

// predicate as function
app.use(summonMiddleware(
  responsePoweredBy(POWERED_BY),
  function () {
    // some instructions...
    if (<your condition>) {
      return true;
    }
    return false;
  }
));
```

The first parameter for summon-middleware is an express or connect middleware
or an array of them.
The second parameter is a predicate function that returns a boolean value
and that represents the condition for which the provided middlewares
have to be used or not.

If the parameters' type does not match with those required, an error will be
thrown. In pariticular, the error will be an
instance of **SummonMiddlewareError**.