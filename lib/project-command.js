var chalk = require('chalk');
var circleci = require('circleci');
var minimist = require('minimist');


module.exports = function execute(apiToken, args) {

  var options = minimist(args, {
    alias: {
      filter: ['filter', 'f'],
      limit: ['limit', 'l'],
      simple: ['simple', 's'],
      offset: ['offset', 'o']
    },
    default: {
      limit: 30,
      offset: 0,
      simple: false
    }
  });
  var username = options._.[1];
  var project = options._.[2];

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
  if (options.filter) {
    params.filter = options.filter;
  }

  return circleci
    .getBuilds(params)
    .then(function(builds) {
      if (!options.simple) {
        return builds;
      }
      return builds.map(function(build) {
        var line = [
          build.outcome,
          build.start_time,
          build.build_url,
          ~~(build_time_millis / 1000)
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
            line = chalk.silver(line);
            break;
        }
        return line;
      });
    })
  ;
};
