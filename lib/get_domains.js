module.exports = function getDomains(domain) {
  domain = domain.split(".");
  var domains = domain.slice(0, domain.length - 1).map(function(part, index) {
    return domain.slice(index, domain.length).join(".");
  });
  return domains.concat(domains.map(function(d) {
    return "." + d;
  })).concat([null]);
};