(function() {
  var getDomains = require("./get_domains");
  var getPaths = require("./get_paths");

  /**
   * Get a cookie
   *
   * @public
   * @param {String} name The cookie name
   * @returns {Array} Returns an array of matching cookies
   */
  function get (name) {
    return cookies().filter(function(val) {
      return val.name === name;
    });
  }
  
  /**
   * Set a cookie
   *
   * @public
   * @param {String} name The cookie name
   * @param {String} value The cookie value
   * @param {Object} options Optionally set expires, path or cookie domain
   */
  function set(name, value, options) {
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
  function cookies() {
    if (!document.cookie) {
      return [];
    }
    return document.cookie.split(";").map(function(cookie) {
      cookie = cookie.split("=");
      return {
        name: cookie[0].trim(),
        value: cookie[1] && cookie[1].trim()
      };
    });
  }

  /**
   * Clear first instance of cookie
   *
   * @public
   * @param {String} name The cookie name
   * @param {Object} options Optionally set path or domain of cookie to be deleted
   * @returns {Boolean} Returns a boolean indicating whether the cookie was successfully deleted
   */
  function clearCookie(name, options) {
    var length = cookies().length;
    options = options || {};
    options.expires = new Date(1);
    set(name, "", options);
    return cookies().length !== length;
  }

  /**
   * Clear all instances of cookie
   *
   * @public
   * @param {String} name The cookie name
   * @returns {Boolean} Returns an array of objects containing the domain and path of any deleted cookies
   */
  function clearAll(name) {
    var d, p, cleared = [];
    var paths = getPaths(window.location.pathname);
    var domains = getDomains(window.location.hostname);

    // try deleting on all paths and domains, return the combination that actually works
    for (d = 0; d < domains.length; d++) {
      for (p = 0; p < paths.length; p++) {
        // track deleted cookies
        if (clearCookie(name, {
          path: paths[p],
          domain: domains[d]
        })) {
          cleared.push({
            domain: domains[d],
            path: paths[p]
          });
        }
      }
    }
    return cleared.length ? cleared : false;
  }

  module.exports = {
    get: get,
    set: set,
    cookies: cookies,
    clear: clearCookie,
    clearAll: clearAll
  };

})();
