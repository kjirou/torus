var chalk = require('chalk');
var CircleCI = require('circleci');
var minimist = require('minimist');
var util = require('util');


module.exports = function execute(apiToken, args) {

  var options = minimist(args, {
    alias: {
      filter: ['f'],
      limit: ['l'],
      offset: ['o'],
      verbose: ['v']
    },
    default: {
      // Max 100
      limit: 30,
      offset: 0,
      simple: false
    }
  });
  var username = options._[1];
  var project = options._[2];

  if (!username) {
    throw new Error('username is required');
  } else if (!project) {
    throw new Error('project is required');
  }

  var params = {
    limit: options.limit,
    offset: options.offset,
    username: username,
    project: project
  };
  // TODO: npm circleci could not receive "filter"
  //if (options.filter) {
  //  params.filter = options.filter;
  //}

  var ci = new CircleCI({
    auth: apiToken
  });
  return ci
    .getBuilds(params)
    .then(function(builds) {
      return builds.map(function(build) {
        if (options.verbose) {
          return util.inspect(build, { depth: 5 });
        } else {
          var line = [
            build.outcome || 'unknown',
            build.start_time,
            build.build_url,
            ~~(build.build_time_millis / 1000)
          ].join(' ');
          switch (build.outcome) {
            case 'success':
              line = chalk.green(line);
              break;
            case 'failed':
              line = chalk.red(line);
              break;
            case 'fixed':
              line = chalk.green(line);
              break;
            case 'canceled':
              line = chalk.gray(line);
              break;
          }
          return line;
        }
      });
    })
  ;
};
