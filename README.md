# summon-middleware
### Dinamically enable or disable express middleware

This wrapper allow you to dinamically enable or disable an express or connect middleware.
In some circumstances you would use a middleware only if some conditions are
met.

#### Installation
If you want use summon-middleware you have to install it. There are two methods to do that:

In your package.json add the following item:
```json
"summon-middleware": "version"
```
then digit:
```console
npm install
```
**Example**:
```json
"summon-middleware": "*" for the latest version
"summon-middleware": "1.0.0" for the version 1.0.0
```

**OR**

launch this command:
```console
npm install summon-middleware --save
```
#### Use
```javascript
summonMiddleware(<Your Express or Connect Middleware>, <predicate>);
```

```javascript
var summonMiddleware = require('summon-middleware');

// Import some other required modules
var express = require('express');
var app = express();
var responsePoweredBy = require('response-powered-by');
var POWERED_BY = "@NIckNaso";
// Some other configuration for the express app and session

// predicate as function
app.use(summonMiddleware(
  responsePoweredBy(POWERED_BY),
  function () {
    // some other instructions ...
    return true;
  }
));
```
The first parameter for summon-middleware is an express or connect middleware, while the
second is a function that return a boolean value. The predicate function represents the condition by the middleware has to be used or not.

If the parameter's type do not match with those required an error will be thrown. In pariticular the error will be an
instance of **SummonMiddlewareError**.