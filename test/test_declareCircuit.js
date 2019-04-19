console.clear()

const declareCircuit = require('../src/declareCircuit')
const {dusp} = require('dusp')
const {
  WanderingDescriber,
  DescriptionContext,
  sentencify} = require('english-io')
const entify = require('../src/entify')

let sentences = [
  'a 2 second decay envelope',
  'the decay envelope is modulated by a sine wave',
  'the decay envelope is multiplied by a 75Hz square wave'
]
//  'the oscillator is the rendering outlet',]
let circuit = declareCircuit( ...sentences )

console.log('Propositions:')
console.log(sentences.map(s=>'\t- '+s).join('\n'))


let e = entify(circuit)
if(e) {
  console.log('\nDescription:')
  let ctx = new DescriptionContext
  let describer = new WanderingDescriber(e)
  let fact
  while(fact = describer.next())
    console.log('\t\t',sentencify(fact.str('simple_present', ctx, 2)))
}

console.log("\nDUSP:")
console.log(dusp(circuit))
