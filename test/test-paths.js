var getPaths = require('../lib/paths')

describe('getPaths', function () {
  it('should return / in absence of path', function () {
    expect(getPaths('/')).to.eql([null, '/'])
    expect(getPaths('')).to.eql([null, '/'])
  })

  it('should return a permutation of path parts', function () {
    expect(getPaths('/to/enlightenment')).to.eql([
      null,
      '/',
      '/to',
      '/to/enlightenment'
    ])
  })
})
