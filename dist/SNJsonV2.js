"use strict";
const Debug = require("debug");
const SNQueryUtil_1 = require("./SNQueryUtil");
var debug = Debug('SNJsonV2');
const SNQuery_1 = require("./SNQuery");
const request = require("request-promise-native");
debug('booting SNJsonV2');
class SNJsonV2 {
    constructor(instance, username, password) {
        this.instance = instance;
        this.username = username;
        this.password = password;
        debug('Instance: %s, Username: %s', instance, username);
    }
    run(query) {
        if (!(query instanceof SNQuery_1.SNQuery)) {
            query = new SNQuery_1.SNQuery(query);
        }
        var options = {
            uri: this.getUrl(query),
            json: true,
            auth: {
                username: this.username,
                password: this.password
            },
            method: ((query.sysparm_action in SNQueryUtil_1.GetActions) ? 'get' : 'post'),
            timeout: query.timeout || 20000
        };
        if ([SNQueryUtil_1.PostActions.insert, SNQueryUtil_1.PostActions.insertMultiple, SNQueryUtil_1.PostActions.update].indexOf(query.sysparm_action) != -1) {
            options.body = query.data;
        }
        return request(options).then((value) => {
            debug('Request returned successfully');
            debug('%O', value);
            return value;
        })
            .catch((err) => {
            debug('Error in get request');
            debug('%O', err);
            if (err.code === 'ETIMEDOUT') {
                throw err;
            }
            throw new Error('Query failed to complete. Reason: ' + err);
        });
    }
    getUrl(query) {
        var sb = 'https://';
        sb += this.instance;
        sb += '.service-now.com/';
        sb += query.getQueryUrl();
        return sb;
    }
}
exports.SNJsonV2 = SNJsonV2;
//# sourceMappingURL=SNJsonV2.js.map