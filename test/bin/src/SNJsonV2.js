"use strict";
const Debug = require("debug");
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
            }
        };
        return request(options).then((value) => {
            debug('Request returned successfully');
            debug('%O', value);
            return value;
        })
            .catch((reason) => {
            debug('Error in get request');
            debug('%O', reason);
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