const declareCircuit = require('../src/declareCircuit')
const {dusp} = require('dusp')

let sentences = [
  'a sine wave modulates another sine wave',
  'the output of the sine wave is the rendering outlet'
]
//  'the oscillator is the rendering outlet',]
let circuit = declareCircuit( ...sentences )

console.log(sentences.map(s=>'\t- '+s).join('\n'))
console.log(dusp(circuit))
