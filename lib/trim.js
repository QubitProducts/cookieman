module.exports = ''.trim ? function (str) {
  return str.trim()
} : function (str) {
  return str.replace(/(^\s+|\s+$)/gi, '')
}
