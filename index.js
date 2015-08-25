var circleci = require('circleci');
var _ = require('lodash');
var minimist = require('minimist');


var COMMANDS = {
  project: require('./lib/project-command')
};


function parseCommandAndToken(args, apiTokenFromEnv) {
  var options = minimist(args, {
    alias: {
      token: ['t']
    }
  });

  var apiToken = options.token || apiTokenFromEnv;
  if (!apiToken) {
    throw new Error('API Token is required');
  }

  var commandId = options._[0] || 'project';
  var command = COMMANDS[commandId];
  if (!command) {
    throw new Error('"' + commandId + '" is invalid command');
  }

  return {
    execute: command,
    apiToken: apiToken
  };
}

module.exports = function execute(args, apiTokenFromEnv, callback) {
  var commander = parseCommandAndToken(
    args,
    apiTokenFromEnv
  );
  commander
    .execute(commander.apiToken, args)
    .then(
      function onFulfilled(lines) {
        callback(null, lines);
      },
      function onRejected(err) {
        callback(err);
      }
    )
  ;
};
