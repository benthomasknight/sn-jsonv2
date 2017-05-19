import * as Debug from 'debug';
import { GetActions, PostActions } from "./SNQueryUtil";
import { ISNQueryOptions } from "./SNQuery";
import { ISNRecords } from "./SNRecords";
var debug = Debug('SNJsonV2');

import { SNQuery } from "./SNQuery";
import * as request from 'request-promise-native';

debug('booting SNJsonV2');

interface ISNJsonV2 {
  instance:string;

  run(query:SNQuery):Promise<ISNRecords>;
}

export class SNJsonV2 implements ISNJsonV2 {
  constructor(public readonly instance:string, private username:string, private password:string) {
    debug('Instance: %s, Username: %s', instance, username);
  }

  run(query:SNQuery | ISNQueryOptions):Promise<ISNRecords> {
    if(!(query instanceof SNQuery)) {
      query = new SNQuery(query);
    }

    var options = {
      uri:this.getUrl(query as SNQuery),
      json:true,
      auth:{
        username:this.username,
        password:this.password
      },
      method:((query.sysparm_action in GetActions) ? 'get' : 'post'),
      timeout:query.timeout || 20000
    } as request.Options;

    if([PostActions.insert, PostActions.insertMultiple, PostActions.update].indexOf(<PostActions>query.sysparm_action) != -1) {
      options.body = query.data;
    }

    return request(options).then((value:any) => {
      debug('Request returned successfully');
      debug('%O', value);
      return value;
    })
    .catch((err:any) => {
      debug('Error in get request');
      debug('%O', err);

      if(err.code === 'ETIMEDOUT') {
        throw err;
      }
      throw new Error('Query failed to complete. Reason: ' + err);
    });
  }

  private getUrl(query:SNQuery):string {
    var sb = 'https://';
    sb += this.instance;
    sb += '.service-now.com/';
    sb += query.getQueryUrl();
    return sb;
  }
}