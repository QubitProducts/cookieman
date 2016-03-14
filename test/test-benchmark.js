/* global describe after it */
var cm = require('../lib/cookieman')

describe('benchmark', function () {
  after(function () {
    cm.clearAll('Speedy')
  })
  benchmark('set', function () {
    cm.set('Speedy', 'Gonzales')
  })
  benchmark('get', function () {
    cm.get('Speedy')
  })
})

function benchmark (name, fn) {
  it(name + time(fn), noop)
}

function time (fn) {
  var times = 2000
  var i = times
  var start = (window.performance || Date).now()
  while (i--) fn()
  return ' executes in ' + (((window.performance || Date).now() - start) / times).toFixed(3) + 'ms'
}

function noop () {}
