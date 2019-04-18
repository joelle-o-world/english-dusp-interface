const declareCircuit = require('../src/declareCircuit')
const {dusp} = require('dusp')

let sentences = [
  'a sine wave is routed to a multiplying unit',
  'a decay envelope is routed to a multiplying unit',
  'the duration of the decay envelope is set to 10'
]
//  'the oscillator is the rendering outlet',]
let circuit = declareCircuit( ...sentences )

console.log(sentences.map(s=>'\t- '+s).join('\n'))
console.log(dusp(circuit))
