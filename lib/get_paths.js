module.exports = function getPaths(path) {
  path = path.replace(/\/$/, "").split("/");
  var paths = [], i = 0, l = path.length;
  for (i; i < l; i++) {
    paths.push(path.slice(0, i + 1).join("/") || "/")
  }
  return paths;
};