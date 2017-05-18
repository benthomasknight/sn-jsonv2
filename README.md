# Module for the JsonV2 API in ServiceNow

Docs for the API available from the [ServiceNow Website](https://docs.servicenow.com/bundle/istanbul-servicenow-platform/page/integrate/inbound-other-web-services/concept/c_JSONv2WebService.html).

Current Support

- Encoded Queries
- Sys Id Queries

## Format of Data

Data returned as an object as specified in the [docs](https://docs.servicenow.com/bundle/istanbul-servicenow-platform/page/integrate/inbound-other-web-services/concept/c_JSONObjectFormat.html)

## Usage

For more information on the various parameters and what they do, go to the [docs here.](https://docs.servicenow.com/bundle/istanbul-servicenow-platform/page/integrate/inbound-other-web-services/concept/c_ActionParameters.html)

### Query design

There are two constructors for creating a query. You can pass an object containing the parameters or pass each parameter individually. The below two constructors will return the same result.

```#Javascript
var SNQuery = require('sn-jsonv2').SNQuery;
var GetActions = require('sn-jsonv2').GetActions;

var options = {
  table:'sys_user',
  sysparm_action:GetActions.getRecords,
  sysparm_view:null,
  sysparm_query:'active=true',
  sysparm_sys_id:null,
  sysparm_record_count:10,
  displayvalue:false,
  displayvariables:false
};
var query = new SNQuery(options);

var query2 = new SNQuery('sys_user', GetActions.getRecords, null, 'active=true', null, 10, false, false);
```

### Running a Query

To run a query you you need to have an SNJsonV2 object with instance information, then pass the query (options, or a query object as specified above) to its run function. It will return a promise of results.

```#Javascript
var SNJsonV2 = require('sn-jsonv2').SNJsonV2;

var instance = new SNJsonV2('instanceName', 'username', 'password');

var options = {
  table:'sys_user',
  sysparm_action:GetActions.getRecords,
  sysparm_view:null,
  sysparm_query:'active=true',
  sysparm_sys_id:null,
  sysparm_record_count:10,
  displayvalue:false,
  displayvariables:false
};

var results = instance.run(options);
```

## Bugs and/or Feature Requests

Create an issue [here]().

## Contributing

1. Fork it!
1. Create a feature branch (git checkout -b cool-new-feature)
1. Commit and push
1. Create new Pull Request
