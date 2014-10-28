(function() {
  var getDomains = require("./get_domains");
  var getPaths = require("./get_paths");

  function get (name) {
    return cookies().filter(function(val) {
      return val.name === name;
    });
  }
  
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

  function clear(name, options) {
    var length = cookies().length;
    options = options || {};
    options.expires = new Date(1);
    set(name, "", options);
    return cookies().length !== length;
  }

  function clearAll(name) {
    var d, p, cleared = [];
    var paths = getPaths(window.location.pathname);
    var domains = getDomains(window.location.hostname);

    // try deleting on all paths and domains, return the combination that actually works
    for (d = 0; d < domains.length; d++) {
      for (p = 0; p < paths.length; p++) {
        // track deleted cookies
        if (clear(name, {
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
    clear: clear,
    clearAll: clearAll
  };

})();