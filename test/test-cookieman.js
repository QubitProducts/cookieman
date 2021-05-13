var cookieman = require('../lib/cookieman')

describe('cookieman', function () {
  beforeEach(function () {
    var cookies = cookieman.cookies()
    var l = cookies.length
    while (l--) cookieman.clearAll(cookies.pop().name)
  })
  describe('cookies ', function () {
    describe('when page has no cookies', function () {
      it('should be an array', function () {
        expect(cookieman.cookies()).to.be.an('array')
      })

      it('should be an empty if there are no cookies', function () {
        expect(cookieman.cookies()).to.have.length(0)
      })
    })

    describe('when page has cookies', function () {
      beforeEach(function () {
        document.cookie = 'foo=bar'
      })

      afterEach(function () {
        document.cookie = 'foo=bar; expires=' + new Date(1).toUTCString()
        document.cookie = 'blah; expires=' + new Date(1).toUTCString()
      })

      it('should map cookie values', function () {
        expect(cookieman.cookies()).to.have.length(1)
        expect(cookieman.cookies()).to.eql([
          {
            name: 'foo',
            value: 'bar'
          }
        ])
      })

      it('should handle cookies with no equals sign', function () {
        document.cookie = 'blah'
        expect(cookieman.cookies()).to.have.length(2)
        expect(cookieman.get('blah')[0]).to.eql({
          name: 'blah',
          value: ''
        })
      })
    })
  })

  describe('get', function () {
    beforeEach(function () {
      document.cookie = 'sweety=darling;'
      document.cookie = 'flippy=magoo; path=/cookie'
      document.cookie = 'flippy=magoo1;'
      document.cookie = 'foo1=ba=r;'
      document.cookie = 'foo2=barn=;'
      document.cookie = 'foo3==barn=;'
      document.cookie = 'empty=;'
    })

    afterEach(function () {
      document.cookie = 'sweety=darling; expires=' + new Date(1).toUTCString()
      document.cookie =
        'flippy=magoo; path=/cookie; expires=' + new Date(1).toUTCString()
      document.cookie = 'flippy=magoo1; expires=' + new Date(1).toUTCString()
      document.cookie = 'foo1=ba=r; expires=' + new Date(1).toUTCString()
      document.cookie = 'foo2=barn=; expires=' + new Date(1).toUTCString()
      document.cookie = 'foo3==barn=; expires=' + new Date(1).toUTCString()
      document.cookie = 'empty=; expires=' + new Date(1).toUTCString()
    })

    it('should return the cookies that match name', function () {
      expect(cookieman.get('flippy')).to.have.length(2)
      expect(cookieman.get('sweety')).to.have.length(1)
    })

    it('should work when the value has an equals', function () {
      expect(cookieman.get('foo1')).to.eql([
        {
          name: 'foo1',
          value: 'ba=r'
        }
      ])
      expect(cookieman.get('foo2')).to.eql([
        {
          name: 'foo2',
          value: 'barn='
        }
      ])
      expect(cookieman.get('foo3')).to.eql([
        {
          name: 'foo3',
          value: '=barn='
        }
      ])
    })

    it('should get an empty string when no cookie value', function () {
      expect(cookieman.get('empty')).to.eql([
        {
          name: 'empty',
          value: ''
        }
      ])
    })

    it('setting after getting should keep the cookie value as is', function () {
      var arr = ['sweety', 'flippy', 'foo1', 'foo2', 'foo3', 'empty']
      var l = arr.length
      var c
      while (l--) {
        c = arr[l]
        var before = cookieman.get(c)[0]
        cookieman.set(before.name, before.value)
        var after = cookieman.get(c)[0]
        expect(after).to.eql(before)
      }
    })
  })

  describe('set', function () {
    afterEach(function () {
      document.cookie = 'sweety=darling; expires=' + new Date(1).toUTCString()
      document.cookie = 'flippy=magoo; expires=' + new Date(1).toUTCString()
      document.cookie =
        'flippy=magoo; path=/cookie; expires=' + new Date(1).toUTCString()
    })

    it('should set cookies', function () {
      expect(cookieman.get('flippy')).to.have.length(0)
      expect(cookieman.get('sweety')).to.have.length(0)

      cookieman.set('sweety', 'darling')
      cookieman.set('flippy', 'magoo')
      cookieman.set('flippy', 'magoo', { path: '/cookie' })

      expect(cookieman.get('flippy')).to.have.length(2)
      expect(cookieman.get('sweety')).to.have.length(1)
    })

    describe('with expiry as date object', function () {
      var delay
      beforeEach(function () {
        delay = 1200
        cookieman.set('flippy', 'magoo', {
          expires: new Date(new Date().valueOf() + delay)
        })
      })

      it('should set the cookie', function () {
        expect(cookieman.get('flippy')).to.have.length(1)
      })

      it('should expire', function (done) {
        this.timeout(4000)
        waitFor(function () {
          return !!cookieman.get('flippy').length
        }, done)
      })

      function waitFor (test, cb) {
        if (test()) return cb()
        setTimeout(function () {
          waitFor(test, cb)
        }, 10)
      }
    })

    describe('with expiry as timestamp', function () {
      var delay
      beforeEach(function () {
        delay = 1200
        cookieman.set('flippy', 'magoo', {
          expires: new Date().valueOf() + delay
        })
      })

      it('should set the cookie', function () {
        expect(cookieman.get('flippy')).to.have.length(1)
      })

      it('should expire', function (done) {
        this.timeout(4000)
        waitFor(function () {
          return !!cookieman.get('flippy').length
        }, done)
      })

      function waitFor (test, cb) {
        if (test()) return cb()
        setTimeout(function () {
          waitFor(test, cb)
        }, 10)
      }
    })
  })

  describe('clear', function () {
    afterEach(function () {
      document.cookie = 'sweety=darling; expires=' + new Date(1).toUTCString()
      document.cookie = 'flippy=magoo; expires=' + new Date(1).toUTCString()
      document.cookie =
        'flippy=magoo; path=/cookie; expires=' + new Date(1).toUTCString()
    })

    it('should clear cookies on the specified path and domain', function () {
      cookieman.set('sweety', 'darling')
      expect(cookieman.get('sweety')).to.have.length(1)
      expect(cookieman.clear('sweety')).to.be(true)
      expect(cookieman.get('sweety')).to.have.length(0)
    })

    it('should return false if no cookie was cleard', function () {
      cookieman.set('flippy', 'magoo', { path: '/cookie' })
      expect(cookieman.get('flippy')).to.have.length(1)
      expect(cookieman.clear('flippy')).to.be(false)
      expect(cookieman.get('flippy')).to.have.length(1)
      expect(cookieman.clear('flippy', { path: '/cookie' })).to.be(true)
      expect(cookieman.get('flippy')).to.have.length(0)
    })
  })

  describe('clearAll', function () {
    afterEach(function () {
      document.cookie = 'sweety=darling; expires=' + new Date(1).toUTCString()
      document.cookie = 'flippy=magoo; expires=' + new Date(1).toUTCString()
      document.cookie =
        'flippy=magoo; path=/cookie; expires=' + new Date(1).toUTCString()
    })

    it("should clear cookies no matter what path/domain they're on", function () {
      cookieman.set('flippy', 'magoo', { path: '/cookie' })
      cookieman.clearAll('sweety')
      expect(cookieman.get('sweety')).to.have.length(0)
    })

    it('should return null metadata about the path and domain if the cookie was cleared immediately', function () {
      cookieman.set('flippy', 'magoo')
      expect(cookieman.clearAll('flippy')).to.eql([
        {
          path: null,
          domain: null
        }
      ])
    })

    it('should return metadata about the path and domain of the cleared cookie', function () {
      cookieman.set('flippy', 'magoo', {
        path: '/cookie'
      })

      const cleared = cookieman.clearAll('flippy')

      expect(cleared.length).to.eql(1)
      expect(cleared[0].path).to.eql('/cookie')
    })
  })
  describe('val', function () {
    it('should return null if no cookie with that name has been set', function () {
      expect(cookieman.val('sweety')).to.eql(null)
    })
    it('should return the value of the cookie if the cookie exists', function () {
      cookieman.set('sweety', 'darling', { path: '/cookie' })
      expect(cookieman.val('sweety')).to.eql('darling')
    })
    it('should return the value of the first cookie if multiple cookies with the same name exists', function () {
      cookieman.set('sweety', 'darling', { path: '/cookie' })
      cookieman.set('sweety', 'pie', { path: '/' })
      expect(cookieman.val('sweety')).to.eql('darling')
    })
    it('should return an empty string if that is the value of the cookie', function () {
      cookieman.set('sweety', '', { path: '/cookie' })
      expect(cookieman.val('sweety')).to.eql('')
    })
    it('should return null if the cookie had no value set', function () {
      document.cookie =
        'sweety=; path=/cookie; expires=' + new Date(1).toUTCString()
      expect(cookieman.val('sweety')).to.eql(null)
    })
  })
})
