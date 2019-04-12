const {WanderingDescriber} = require('english-io')

const d = require('../src/dictionary')

let e = d.spawnSingle(
  'an oscillator'
)


let describer = new WanderingDescriber(e)
let next
while((next = describer.next()))
  console.log(next.str())
