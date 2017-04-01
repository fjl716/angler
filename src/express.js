export async function init(system) {
  system.express = require('express')();
  return function () {
    system.express.listen(8080)
  };
}
