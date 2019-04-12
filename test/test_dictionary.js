const {WanderingDescriber} = require('english-io')

const d = require('../src/dictionary')

let entities = d.quickDeclare(
  'the output is routed to the input',
  'the input is an input of the unit',
  'the output is an output of another unit'
)

let describer = new WanderingDescriber(...entities)
let next
while((next = describer.next()))
  console.log(next.str())
