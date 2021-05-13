module.exports = function getPaths (path) {
  path = path.replace(/\/$/, '').split('/')
  var paths = [null]
  for (var i = 0; i < path.length; i++) {
    paths.push(path.slice(0, i + 1).join('/') || '/')
  }
  return paths
}
