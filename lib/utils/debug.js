
function debug() {
  if(debug.active) {
    console.log.apply(console.log, arguments);
  }
}
debug.active = false;

module.exports = debug;
