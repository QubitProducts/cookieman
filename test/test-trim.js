/* global describe it expect */
var trim = require('../lib/trim')

describe('trim', function () {
  it('should remove whitespace from start', function () {
    expect(trim('  a')).to.eql('a')
  })

  it('should remove whitespace from end', function () {
    expect(trim('a  ')).to.eql('a')
  })
})
