module.exports = function getDomains(domain) {
  var domains = [], fragments = domain.split(".");
  var i = 0, l = fragments.length, fragment;
  for (i; i < l - 1; i++) {
    fragment = fragments.slice(i, fragments.length).join(".");
    domains.push(fragment, "." + fragment);
  }
  domains.push(null);
  return domains;
};
