var circleci = require('circleci');
var _ = require('lodash');
var minimist = require('minimist');


var COMMANDS = {
  project: require('./lib/project-command')
};


function parseCommandAndToken(args, apiToken) {
  var options = minimist(args, {
    alias: {
      token: ['token', 't']
    }
  });

  var apiToken = options.token || apiToken;
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

function execute(args, callback) {
  var commander = parseCommandAndToken(
    args,
    process.env.TORUS_CIRCLECI_API_TOKEN || null
  );
  commander
    .execute(commander.apiToken, args)
    .then(function onFulfilled() {
      callback();
    })
    .catch(function onRejected(err) {
      callback(err);
    })
  ;
};
