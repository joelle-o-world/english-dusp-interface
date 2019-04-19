const declareCircuit = require('../src/declareCircuit')
const {dusp} = require('dusp')
const {WanderingDescriber, DescriptionContext, sentencify} = require('english-io')

let sentences = [
  'a 200Hz sine wave multiplied by a 1Hz triangle wave',
  'the output of the sine wave is disconnected from the multiplying unit'
  //'a 500Hz square wave is routed to the multiplying unit'
  //'a sawtooth wave is routed to the sine wave',
//  'the noise generator',

]
//  'the oscillator is the rendering outlet',]
let circuit = declareCircuit( ...sentences )

console.log('Propositions:')
console.log(sentences.map(s=>'\t- '+s).join('\n'))

console.log('\nDescription')
let ctx = new DescriptionContext
let describer = new WanderingDescriber(circuit.englishIO_entity)
let fact
while(fact = describer.next())
  console.log('\t\t',sentencify(fact.str('simple_present', ctx)))

console.log("\nDUSP:")
console.log(dusp(circuit))
