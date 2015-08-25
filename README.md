# torus

[![npm version](https://badge.fury.io/js/torus.svg)](http://badge.fury.io/js/torus)

Operate CircleCI REST API by CLI

It is **experimental** module.


## Installation

```
npm install -g torus
```


## Usage

### Set API Token

At first, you should get [API Token from account dashboard](https://circleci.com/account/api).

Then set this token by:

```
--token, -t

torus -t 0000000000000000000000000000000000000000 project username project_name
```

Or

```bash
export TORUS_CIRCLECI_API_TOKEN=0000000000000000000000000000000000000000
```

### "project" command

Get recently builds from single project.

```bash
torus project USER_NAME PROJECT_NAME
```

```
--limit, -l

  Build count, default is 30, max is 100

--offset, -o

  Default is 0

--verbose, -v

  Show all information
```


## Examples

### Basic usage

```
torus -t 0000000000000000000000000000000000000000 project kjirou my-repo-name -l 10
success 2015-08-25T09:44:09.747Z https://circleci.com/gh/kjirou/my-repo-name/87 master 42
success 2015-08-25T09:12:46.239Z https://circleci.com/gh/kjirou/my-repo-name/86 master 40
success 2015-08-25T05:02:48.911Z https://circleci.com/gh/kjirou/my-repo-name/85 master 41
success 2015-08-24T19:28:23.703Z https://circleci.com/gh/kjirou/my-repo-name/84 master 62
success 2015-08-24T19:27:04.981Z https://circleci.com/gh/kjirou/my-repo-name/83 add-foo 38
success 2015-08-24T19:16:23.453Z https://circleci.com/gh/kjirou/my-repo-name/82 add-foo 61
success 2015-08-24T19:13:35.785Z https://circleci.com/gh/kjirou/my-repo-name/81 master 132
success 2015-08-24T19:06:05.692Z https://circleci.com/gh/kjirou/my-repo-name/80 master 42
success 2015-08-24T19:02:19.946Z https://circleci.com/gh/kjirou/my-repo-name/79 master 40
success 2015-08-24T18:57:48.235Z https://circleci.com/gh/kjirou/my-repo-name/78 master 56

[status] [start_time] [build_url] [branch] [execution_time_by_seconds]
```

### Get "Failed" builds only

```bash
torus project USER_NAME PROJECT_NAME | grep 'failed '
```


## Refs
- https://github.com/jpstevens/circleci
- [CircleCI REST API](https://circleci.com/docs/api)
