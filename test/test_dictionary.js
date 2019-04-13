const {WanderingDescriber} = require('english-io')
const {dusp} = require('dusp')

const d = require('../src/dictionary')

let entities = d.quickDeclare(
  'an oscillator',
  'the frequency of the oscillator is set to 200',
  'a summing unit',
  'a noise generator',
  'the output of the oscillator is routed to the first input of the summing unit',
  'the output of the noise generator is routed to the second input of the summing unit'
)


let describer = new WanderingDescriber(...entities)
let next
while((next = describer.next()))
  console.log(next.str())

for(let e of entities) {
  if(e.unit) {
    console.log(dusp(e.unit))

  }
}
