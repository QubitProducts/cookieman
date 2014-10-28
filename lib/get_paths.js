module.exports = function getPaths(path) {
  path = path.replace(/\/$/, "").split("/");
  // map needs to work in ie
  path = path.map(function(part, index) {
    return path.slice(0, index + 1).join("/") || "/";
  });
  return path;
};