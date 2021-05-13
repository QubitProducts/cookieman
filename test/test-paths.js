var getPaths = require('../lib/paths')

describe('getPaths', function () {
  it('should return / in absence of path', function () {
    expect(getPaths('/')).to.eql(['/'])
    expect(getPaths('')).to.eql(['/'])
  })

  it('should return a permutation of path parts', function () {
    expect(getPaths('/to/enlightenment')).to.eql([
      '/',
      '/to',
      '/to/enlightenment'
    ])
  })
})
