/**
 * Copyright (C) 2016 pantojs.xyz
 * index.js
 *
 * changelog
 * 2016-06-22[16:23:45]:revised
 * 2016-06-26[18:58:58]:support multiple message types
 * 2016-07-05[22:00:42]:support Buffer
 * 2016-07-30[11:10:40]:default "error"
 *
 * @author yanni4night@gmail.com
 * @version 0.2.2
 * @since 0.1.0
 */
'use strict';
const colors = require('colors/safe');

const themes = {
    data: 'grey',
    help: 'cyan',
    debug: 'blue',
    info: 'green',
    warn: 'yellow',
    error: 'red'
};

const noop = n => n;

colors.setTheme(themes);

const functions = Object.keys(themes);

let currentLevel = functions[0];
let currentOutStream = process.stdout;
let stopColor = false;

const setLevel = exports.setLevel = level => {
    if (~functions.indexOf(level)) {
        currentLevel = level;
    }
    return currentLevel;
};

setLevel(process.env.PANTO_LOG_LEVEL || 'error');

exports.setOutStream = stream => {
    currentOutStream = stream;
};

const formatArg = arg => {
    let str = '';
    const typeOf = typeof arg;

    if (undefined === arg || null === arg) {
        arg = '';
    } else if ('string' === typeOf || (arg && arg.constructor === String)) {
        str = arg;
    } else if ('function' === typeOf || arg.constructor === RegExp) {
        str = arg.toString();
    } else if (Array.isArray(arg)) {
        str = '[' + arg.map(formatArg).join() + ']';
    } else if (arg instanceof Error) {
        str = arg.stack;
    } else if ('number' === typeOf || 'boolean' === typeOf || arg.constructor === Number || arg.constructor ===
        Boolean) {
        str = String(arg);
    } else if (arg.constructor === Date) {
        str = arg.toLocaleString();
    } else if (Buffer.isBuffer(arg)) {
        str += '<Buffer ' + Array.prototype.join.call(arg.slice(0,10), ' ') + (arg.length>10?'...':'') + '>';
    } else if ('object' === typeOf) {
        try {
            str = JSON.stringify(arg, null, 4);
        } catch (e) {
            str = String(arg);
        }
    }

    return str;
};

functions.forEach(func => {
    exports[func] = (...args) => {
        const printFn = stopColor ? noop : colors[func];
        const tag = func[0].toUpperCase();
        const time = new Date().toISOString();
        return new Promise((resolve, reject) => {
            if (functions.indexOf(func) >= functions.indexOf(currentLevel)) {
                currentOutStream.write(printFn(`[${time}][${tag}]` + args.map(formatArg).join(' ')) + '\n',
                    'utf-8', () => {
                        resolve();
                    });
            } else {
                reject(new Error(`${func} < ${currentLevel}`));
            }
        });
    };
});