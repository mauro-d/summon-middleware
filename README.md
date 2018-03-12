# summon-middleware

## Dynamically enable or disable express middlewares

This wrapper allows you to dynamically enable or disable an express or connect
middleware or an array of them.
In some circumstances you would use one or more middlewares only if some
conditions are met.


<br/>

<div align="center">
    
[![Build Status](https://travis-ci.org/mauro-d/summon-middleware.svg?branch=master)](https://travis-ci.org/mauro-d/summon-middleware)
[![Build status](https://ci.appveyor.com/api/projects/status/0iouq0pjolq75ye4?svg=true)](https://ci.appveyor.com/project/NickNaso/summon-middleware)
[![NPM version](https://img.shields.io/npm/v/summon-middleware.svg?style=flat)](https://www.npmjs.com/package/summon-middleware)
[![NPM downloads](https://img.shields.io/npm/dm/summon-middleware.svg?style=flat)](https://www.npmjs.com/package/summon-middleware)

</div>  

## Installation

If you want to use summon-middleware you have to install it.
There are two methods to do that:

### First method

In your package.json add the following item for the latest version:

```json
"summon-middleware": "*"
```

or, if you want a specific version, just add an item like the following,
specifying the version number:

```json
"summon-middleware": "2.0.2"
```

then launch this command:

```console
npm install
```

### Second method

Just launch this command:

```console
npm install summon-middleware --save
```

## Use

```javascript
summonMiddleware(middleware, predicate)
```

- `middleware` {Function|Function[]} an express or connect middleware or an
array of them.
- `predicate` {Function} a function that returns a boolean value
and that represents the condition for which the provided middlewares
have to be used or not.
- **returns**: a single middleware or an array of middlewares.

If the parameters' type does not match with those required, an error will be
thrown. In pariticular, the error will be an
instance of **SummonMiddlewareError**.

### Examples

#### Providing a single middleware

```javascript
var summonMiddleware = require('summon-middleware')

var express = require('express')
var app = express()

var responsePoweredBy = require('response-powered-by')
var POWERED_BY = "@NickNaso"

app.use(summonMiddleware(responsePoweredBy(POWERED_BY), function () {
  // some instructions...
  if (<your condition>) {
    return true
  }
  return false
}))
```

#### Providing an array of middlewares

```javascript
var summonMiddleware = require('summon-middleware')

var express = require('express')
var app = express()

var responsePoweredBy = require('response-powered-by')
var POWERED_BY = "@NickNaso"
var responseTime = require('response-time')

var myMiddlewares = [
  responsePoweredBy(POWERED_BY),
  responseTime()
]

app.use(summonMiddleware(myMiddlewares, function () {
  // some instructions...
  if (<your condition>) {
    return true
  }
  return false
}))
```