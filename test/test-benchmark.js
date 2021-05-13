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
  var start = now()
  while (i--) fn()
  return ' executes in ' + ((now() - start) / times).toFixed(3) + 'ms'
}

function noop () {}

function now () {
  return window.performance && window.performance.now
    ? window.performance.now()
    : new Date().valueOf()
}
