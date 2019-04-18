const declareCircuit = require('../src/declareCircuit')
const {dusp} = require('dusp')

let sentences = [
  'an oscillator',
  'a summing unit',
  'the summing unit is routed to the outlet of the oscillator',
  'another oscillator is connected to the summing unit',
]
//  'the oscillator is the rendering outlet',]
let circuit = declareCircuit( ...sentences )

console.log(sentences.map(s=>'\t- '+s).join('\n'))
console.log(dusp(circuit))
