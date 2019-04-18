const declareCircuit = require('../src/declareCircuit')
const {dusp} = require('dusp')

let sentences = [
  'a square wave modulates a sine wave',
  'the sine wave is added to a triangle wave',
  'the sine wave is added to a triangle wave'
]
//  'the oscillator is the rendering outlet',]
let circuit = declareCircuit( ...sentences )

console.log(sentences.map(s=>'\t- '+s).join('\n'))
console.log(dusp(circuit))
