const declareCircuit = require('../src/declareCircuit')
const {dusp} = require('dusp')

let sentences = [
  'a 200Hz sine wave multiplied by a 1Hz sine wave',
  //'a sawtooth wave is routed to the sine wave',
//  'the noise generator',
  'the sine wave is set to 5'
]
//  'the oscillator is the rendering outlet',]
let circuit = declareCircuit( ...sentences )

console.log(sentences.map(s=>'\t- '+s).join('\n'))
console.log(dusp(circuit))
