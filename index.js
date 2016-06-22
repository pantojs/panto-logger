/**
 * Copyright (C) 2016 pantojs.xyz
 * index.js
 *
 * changelog
 * 2016-06-22[16:23:45]:revised
 *
 * @author yanni4night@gmail.com
 * @version 1.0.0
 * @since 1.0.0
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

setLevel(process.env.PANTO_LOG_LEVEL);

exports.setOutStream = stream => {
    currentOutStream = stream;
};

functions.forEach(func => {
    exports[func] = (...args) => {
        return new Promise((resolve, reject) => {
            if (functions.indexOf(func) >= functions.indexOf(currentLevel)) {
                currentOutStream.write((stopColor ? noop : colors[func])(
                    `[${new Date().toISOString()}][${func[0].toUpperCase()}]`) + args.map((
                    stopColor ? noop : colors[func])).join(
                    ' ') + '\n', 'utf-8', () => {
                    resolve();
                });
            } else {
                reject(new Error(`${func} < ${currentLevel}`));
            }
        });
    };
});