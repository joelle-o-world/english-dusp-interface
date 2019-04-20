const HTMLPlayer = require('../src/HTMLPlayer')

window.onload = function() {
  let player1 = new HTMLPlayer('a 200Hz sine wave')
  console.log(player1)

  document.body.appendChild(player1.div)
}
