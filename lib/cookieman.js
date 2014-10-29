(function() {
  var getDomains = require("./get_domains");
  var getPaths = require("./get_paths");
  var trim = require("./trim");

  /**
   * Get a cookie
   *
   * @public
   * @param {String} name The cookie name
   * @returns {Array} Returns an array of matching cookies
   */
  function getCookie (name) {
    var cookie = [];
    var cookies = getCookies();
    var i = 0, l = cookies.length;
    for (i; i < l; i++) {
      if (cookies[i].name === name) {
        cookie.push(cookies[i]);
      }
    }
    return cookie;
  }
  
  /**
   * Set a cookie
   *
   * @public
   * @param {String} name The cookie name
   * @param {String} value The cookie value
   * @param {Object} options Optionally set expires, path or cookie domain
   */
  function setCookie(name, value, options) {
    var cookie = name + "=" + value + ";";
    options = options || {};
    if (options.expires) {
      cookie += "Expires=" + new Date(1).toUTCString() + ";";
    }
    if (options.path) {
      cookie += "Path=" + options.path + ";";
    }
    if (options.domain) {
      cookie += "Domain=" + options.domain + ";";
    }
    document.cookie = cookie;
  }

  /**
   * Get all cookies
   *
   * @public
   * @returns {Array} Returns the name and value of all available cookies
   */
  function getCookies() {
    if (!document.cookie) {
      return [];
    }
    var allCookies = [], cookie;
    var cookies = document.cookie.split(";");
    var i = 0, l = cookies.length;
    for (i;i < l; i++) {
      cookie = cookies[i].split("=");
      allCookies.push({
        name: trim(cookie[0]),
        value: (cookie[1] && cookie[1] && trim(cookie[1])) || null
      });
    }
    return allCookies;
  }

  /**
   * Delete first instance of cookie
   *
   * @public
   * @param {String} name The cookie name
   * @param {Object} options Optionally set path or domain of cookie to be deleted
   * @returns {Boolean} Returns a boolean indicating whether the cookie was successfully deleted
   */
  function deleteCookie(name, options) {
    var length = getCookies().length;
    options = options || {};
    options.expires = new Date(1);
    setCookie(name, "", options);
    return getCookies().length !== length;
  }

  /**
   * Delete all instances of cookie
   *
   * @public
   * @param {String} name The cookie name
   * @returns {Boolean} Returns an array of objects containing the domain and path of any deleted cookies
   */
  function deleteAll(name) {
    var d, p, deleted = [];
    var paths = getPaths(window.location.pathname);
    var domains = getDomains(window.location.hostname);

    // try deleting on all paths and domains, return the combination that actually works
    for (d = 0; d < domains.length; d++) {
      for (p = 0; p < paths.length; p++) {
        // track deleted cookies
        if (deleteCookie(name, {
          path: paths[p],
          domain: domains[d]
        })) {
          deleted.push({
            domain: domains[d],
            path: paths[p]
          });
        }
      }
    }
    return deleted;
  }

  module.exports = {
    'get': getCookie,
    'set': setCookie,
    'cookies': getCookies,
    'delete': deleteCookie,
    'deleteAll': deleteAll
  };

})();
