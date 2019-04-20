console.clear()

const declareCircuit = require('../src/declareCircuit')
const {dusp} = require('dusp')
const {
  WanderingDescriber,
  DescriptionContext,
  sentencify} = require('english-io')
const entify = require('../src/entify')

let sentences = [
  //'connect a sine wave to a square wave',
  //'set the sine wave to 100Hz',
  //'disconnect the sine wave from the square wave'
  'a 10s decay envelope triggers'
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
    console.log('\t\t',sentencify(fact.str('simple_present', ctx, 0)))
}

console.log("\nDUSP:")
console.log(dusp(circuit))
