# panto-logger
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

Logger for panto.

```js
const logger = require('panto-logger');

logger.setLevel('log');

logger.setOutStream(fs.createWriteStream('/log.log', {flags: 'a'});)

data('record data message');
help('record help message');
debug('record debug message');
info('record info message');
warn('record warn message');
error('record error message').then(()=>{
    // record complete
});

```

[npm-url]: https://npmjs.org/package/panto-logger
[downloads-image]: http://img.shields.io/npm/dm/panto-logger.svg
[npm-image]: http://img.shields.io/npm/v/panto-logger.svg
[david-dm-url]:https://david-dm.org/pantojs/panto-logger
[david-dm-image]:https://david-dm.org/pantojs/panto-logger.svg
[david-dm-dev-url]:https://david-dm.org/pantojs/panto-logger#info=devDependencies
[david-dm-dev-image]:https://david-dm.org/pantojs/panto-logger/dev-status.svg