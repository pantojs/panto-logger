/**
 * Copyright (C) 2016 pantojs.xyz
 * test.js
 *
 * changelog
 * 2016-06-16[13:20:09]:revised
 * 2016-07-05[22:00:00]:support Buffer
 *
 * @author yanni4night@gmail.com
 * @version 0.2.1
 * @since 0.1.0
 */
'use strict';
const logger = require('../');
const fs = require('fs');
const assert = require('assert');

describe('logger', () => {
    describe('message types', () => {
        it('should print data message', () => {
            logger.data('This is a data message', '=>', 'Hello, Artiaris');
        });
        it('should print help message', () => {
            logger.help('This is a help message', '=>', 'Hello, Artiaris');
        });
        it('should print debug message', () => {
            logger.debug('This is a debug message', '=>', 'Hello, Artiaris');
        });
        it('should print info message', () => {
            logger.info('This is a info message', '=>', 'Hello, Artiaris');
        });
        it('should print warn message', () => {
            logger.warn('This is a warn message', '=>', 'Hello, Artiaris');
        });
        it('should print error message', () => {
            logger.error('This is a error message', '=>', 'Hello, Artiaris');
        });
    });
    describe('log multiple types', () => {
        it('print null&undefined', () => {
            logger.info(null);
            logger.info(undefined);
        });
        it('print function&regexp', () => {
            logger.info(function fn() {});
            logger.info(/pantojs/);
        });
        it('print error', () => {
            logger.error(new TypeError('this is type error'));
        });
        it('print number&boolean', () => {
            logger.info(0x0810);
            logger.info(false);
        });
        it('print date', () => {
            logger.debug(new Date());
        });
        it('print array', () => {
            logger.data(['str', 0x0810, false, [1, 2], new Date()]);
        });
        it('print object', () => {
            logger.info({
                name: 'Jake',
                age: 29
            });
        });
        it('print Buffer', () => {
            logger.info(new Buffer('This is the buffer to be printed'));
        });
    });
    describe('#setLevel', () => {
        it('should hide "info" message if level="debug"', () => {
            logger.setLevel('debug');
            logger.data('This should not be printed');
            logger.debug('This should be printed');
            logger.info('This should be printed');
        });
    });
    describe('#setOutStream', () => {
        it('should output to file', done => {
            const logPath = __dirname + '/file.log';

            try {
                fs.unlinkSync(logPath);
            } catch (e) {}

            const writable = fs.createWriteStream(logPath, {
                flags: 'a'
            });
            const debugStr = 'This should be printed to file';

            logger.setOutStream(writable);

            logger.debug(debugStr).then(() => {
                const logContent = fs.readFileSync(logPath, 'utf-8');
                assert.ok(!!~logContent.indexOf(debugStr));
                done();
            });

        });
    });
});