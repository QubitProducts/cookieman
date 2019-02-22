module.exports = function getDomains (domain) {
  var domains = []
  var fragment
  var fragments = domain.split('.')
  for (var i = 0; i < fragments.length; i++) {
    fragment = fragments.slice(i, fragments.length).join('.')
    domains.push(fragment, '.' + fragment)
  }
  domains.push(null)
  return domains
}
