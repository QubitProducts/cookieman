module.exports = function (str) {
  return str.replace(/(^\s+|\s+$)/gi, '')
}
