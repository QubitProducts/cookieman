var getDomains = require('./domains')
var getPaths = require('./paths')
var trim = require('./trim')

/**
 * Get a cookie
 *
 * @public
 * @param {String} name The cookie name
 * @returns {Array} Returns an array of matching cookies
 */
function getCookie (name) {
  return getCookies(name)
}

/**
 * Set a cookie
 *
 * @public
 * @param {String} name The cookie name
 * @param {String} value The cookie value
 * @param {Object} options Optionally set expires, path or cookie domain
 */
function setCookie (name, value, options) {
  var cookie = name + '=' + value + ';'
  var path = options.path ? options.path : '/'
  options = options || {}
  if (options.expires) cookie += 'Expires=' + new Date(options.expires).toUTCString() + ';'
  cookie += 'Path=' + path + ';'
  if (options.domain) cookie += 'Domain=' + options.domain + ';'
  document.cookie = cookie
}

function splitCookie (cookie) {
  var i = cookie.indexOf('=')
  if (i < 0) return [cookie, '']
  return [cookie.substring(0, i), cookie.substring(i + 1)]
}

/**
 * Get all cookies
 *
 * @public
 * @returns {Array} Returns the name and value of all available cookies
 */
function getCookies (name) {
  var documentCookie = document.cookie
  var allCookies = []
  if (!documentCookie) return allCookies
  var cookie
  var cookies = documentCookie.split(';')
  for (var i = 0; i < cookies.length; i++) {
    cookie = splitCookie(cookies[i])
    var cookieName = trim(cookie[0])
    if (!name || cookieName === name) {
      allCookies.push({
        name: cookieName,
        value: trim(cookie[1])
      })
    }
  }
  return allCookies
}

/**
 * clear first instance of cookie
 *
 * @public
 * @param {String} name The cookie name
 * @param {Object} options Optionally set path or domain of cookie to be cleard
 * @returns {Boolean} Returns a boolean indicating whether the cookie was successfully cleard
 */
function clearCookie (name, options) {
  var length = getCookies().length
  options = options || {}
  options.expires = new Date(1)
  setCookie(name, '', options)
  return getCookies().length !== length
}

/**
 * clear all instances of cookie
 *
 * @public
 * @param {String} name The cookie name
 * @returns {Boolean} Returns an array of objects containing the domain and path of any cleard cookies
 */
function clearAll (name) {
  var cleared = []
  var paths = getPaths(window.location.pathname)
  var domains = getDomains(window.location.hostname)

  if (clearCookie(name)) {
    return [{
      path: null,
      domain: null
    }]
  }

  // try deleting on all paths and domains, return the combination that actually works
  for (var d = 0; d < domains.length; d++) {
    for (var p = 0; p < paths.length; p++) {
      // track cleared cookies
      if (clearCookie(name, {
        path: paths[p],
        domain: domains[d]
      })) {
        cleared.push({
          domain: domains[d],
          path: paths[p]
        })
      }
    }
  }
  return cleared
}

/**
 * gets the value of a cookie, or returns null
 *
 * @public
 * @param {String} name The cookie name
 * @returns {Null} or {Boolean} Returns null if the cookie is not found or the cookie's value
 */
function cookieValue (name) {
  var cookies = getCookie(name)
  return cookies.length ? cookies[0].value : null
}

module.exports = {
  'get': getCookie,
  'set': setCookie,
  'cookies': getCookies,
  'clear': clearCookie,
  'clearAll': clearAll,
  'val': cookieValue
}
