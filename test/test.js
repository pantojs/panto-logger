/**
 * Copyright (C) 2016 yanni4night.com
 * test.js
 *
 * changelog
 * 2016-06-16[13:20:09]:revised
 *
 * @author yanni4night@gmail.com
 * @version 1.0.0
 * @since 1.0.0
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